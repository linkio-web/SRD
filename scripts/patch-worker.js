#!/usr/bin/env node
/**
 * Post-build patch for Cloudflare Pages.
 *
 * CF Pages does NOT support [assets] in wrangler.toml, so we cannot set
 * run_worker_first = true there. OpenNext bakes __ASSETS_RUN_WORKER_FIRST__
 * as `false` into the bundled _worker.js via esbuild define constants.
 *
 * This script flips that value to `true` so the Worker intercepts all
 * requests (including /_next/static/**) and serves them via env.ASSETS.
 */
const fs = require('fs');
const path = require('path');

const workerPath = path.join(__dirname, '../.open-next/_worker.js');

if (!fs.existsSync(workerPath)) {
  console.error('patch-worker.js: _worker.js not found at', workerPath);
  process.exit(1);
}

let content = fs.readFileSync(workerPath, 'utf8');

const before = content.length;
content = content.replace(/__ASSETS_RUN_WORKER_FIRST__\s*:\s*false/g, '__ASSETS_RUN_WORKER_FIRST__:true');

if (content.length === before && !content.includes('__ASSETS_RUN_WORKER_FIRST__:true')) {
  console.warn('patch-worker.js: pattern not found — worker may already be patched or format changed');
} else {
  console.log('patch-worker.js: __ASSETS_RUN_WORKER_FIRST__ set to true');
}

fs.writeFileSync(workerPath, content, 'utf8');
