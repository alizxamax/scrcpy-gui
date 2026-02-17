#!/usr/bin/env node
const { spawn } = require('child_process');
const { webcrypto } = require('crypto');
const path = require('path');

if (!globalThis.crypto && webcrypto) {
  globalThis.crypto = webcrypto;
}

const vitePkg = require.resolve('vite/package.json');
const viteBin = path.join(path.dirname(vitePkg), 'bin', 'vite.js');
const args = process.argv.slice(2);

const child = spawn(process.execPath, [viteBin, ...args], {
  stdio: 'inherit',
  env: process.env,
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 1);
});
