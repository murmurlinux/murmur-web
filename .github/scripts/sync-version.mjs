#!/usr/bin/env node
// Updates the single source of truth for the Murmur app version on the
// website: src/lib/app-version.ts. Invoked by .github/workflows/version-sync.yml
// on repository_dispatch from murmurlinux/murmur (or by workflow_dispatch
// for manual testing).
//
// Usage: node .github/scripts/sync-version.mjs <semver>
// Example: node .github/scripts/sync-version.mjs 0.3.5
//
// Idempotent: exits 0 with a "no change" message if the file already
// matches the target version. Fails loud if the expected declaration
// pattern cannot be found (someone renamed APP_VERSION) rather than
// silently writing the wrong thing.

import { readFile, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..', '..');
const filePath = resolve(repoRoot, 'src/lib/app-version.ts');

const targetVersion = process.argv[2];
if (!targetVersion || !/^\d+\.\d+\.\d+$/.test(targetVersion)) {
  console.error('Usage: node .github/scripts/sync-version.mjs <semver>');
  console.error('Got:', targetVersion);
  process.exit(2);
}

const before = await readFile(filePath, 'utf8');
const pattern = /^(export const APP_VERSION = )"[^"]+";$/m;
const match = before.match(pattern);
if (!match) {
  console.error(`Could not find APP_VERSION declaration in ${filePath}.`);
  console.error('Expected a line like: export const APP_VERSION = "X.Y.Z";');
  process.exit(3);
}

const currentVersion = match[0].match(/"([^"]+)"/)[1];
if (currentVersion === targetVersion) {
  console.log(`app-version.ts already at ${targetVersion}; no change.`);
  process.exit(0);
}

const after = before.replace(pattern, `$1"${targetVersion}";`);
await writeFile(filePath, after);
console.log(`Updated APP_VERSION: ${currentVersion} -> ${targetVersion}`);
