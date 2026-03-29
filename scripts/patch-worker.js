#!/usr/bin/env node
/**
 * Post-build patch for Cloudflare Pages.
 *
 * OpenNext's _worker.js routes all requests through the Next.js handler,
 * but static assets (/_next/static/, fonts, images) must be served directly
 * via env.ASSETS on Cloudflare Pages.
 *
 * This script prepends an asset-serving guard to the worker's fetch handler.
 */
const fs = require('fs');
const path = require('path');

const workerPath = path.join(__dirname, '../.open-next/_worker.js');

if (!fs.existsSync(workerPath)) {
  console.error('patch-worker.js: _worker.js not found at', workerPath);
  process.exit(1);
}

let content = fs.readFileSync(workerPath, 'utf8');

if (content.includes('/* patch: serve-assets */')) {
  console.log('patch-worker.js: already patched, skipping');
  process.exit(0);
}

const assetGuard = `/* patch: serve-assets */
const ASSET_EXTENSIONS = /\\.(?:css|js|woff2?|ttf|otf|eot|ico|png|jpg|jpeg|gif|svg|webp|avif|map|json|txt|xml)$/i;
const ASSET_PATHS = ['/_next/static/', '/_next/image', '/favicon.ico'];
function isStaticAsset(pathname) {
  return ASSET_PATHS.some(p => pathname.startsWith(p)) || ASSET_EXTENSIONS.test(pathname);
}
`;

// Inject asset guard + env.ASSETS delegation at the top of the fetch handler
const originalFetch = `    async fetch(request, env, ctx) {
        return runWithCloudflareRequestContext(request, env, ctx, async () => {`;

const patchedFetch = `    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        if (env.ASSETS && isStaticAsset(url.pathname)) {
          return env.ASSETS.fetch(request);
        }
        return runWithCloudflareRequestContext(request, env, ctx, async () => {`;

if (!content.includes(originalFetch)) {
  console.error('patch-worker.js: fetch handler pattern not found — cannot patch');
  process.exit(1);
}

content = assetGuard + content.replace(originalFetch, patchedFetch);

fs.writeFileSync(workerPath, content, 'utf8');
console.log('patch-worker.js: asset serving guard injected into _worker.js');
