#!/usr/bin/env node
/**
 * Post-build patch for Cloudflare Pages.
 *
 * CF Pages does NOT support [assets] run_worker_first in wrangler.toml for Pages projects.
 * OpenNext bakes __ASSETS_RUN_WORKER_FIRST__ as `false` into cloudflare/init.js.
 *
 * This script flips that value to `true` so the Worker intercepts all requests
 * (including /_next/static/**) and serves them via env.ASSETS.
 */
const fs = require('fs');
const path = require('path');

const initPath = path.join(__dirname, '../.open-next/cloudflare/init.js');

if (!fs.existsSync(initPath)) {
  console.error('patch-worker.js: init.js not found at', initPath);
  process.exit(1);
}

let content = fs.readFileSync(initPath, 'utf8');

if (content.includes('__ASSETS_RUN_WORKER_FIRST__: true')) {
  console.log('patch-worker.js: already patched, skipping');
  process.exit(0);
}

const patched = content.replace(/__ASSETS_RUN_WORKER_FIRST__:\s*false/g, '__ASSETS_RUN_WORKER_FIRST__: true');

if (patched === content) {
  console.warn('patch-worker.js: pattern not found — check OpenNext version');
  process.exit(1);
}

fs.writeFileSync(initPath, patched, 'utf8');
console.log('patch-worker.js: __ASSETS_RUN_WORKER_FIRST__ set to true in cloudflare/init.js');
