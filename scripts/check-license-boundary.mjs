/**
 * Repeatable *source boundary* check for the owner-approved MIT integration PR.
 * This is not legal proof of copyright ownership or a dependency license audit.
 */
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = (relative) => readFileSync(path.join(root, relative), 'utf8');

const license = source('LICENSE').replace(/\r\n/g, '\n');
const required = [
  'MIT License\n\nCopyright (c) 2026 Ruslan Udintsev\n',
  'Permission is hereby granted, free of charge, to any person obtaining a copy',
  'The above copyright notice and this permission notice shall be included in all',
  'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR',
  'OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.',
];
for (const clause of required) assert.ok(license.includes(clause), 'Missing/modified MIT clause: ' + clause);
assert.ok(!/\[(?:year|fullname)\]|<year>|<copyright holders>/i.test(license), 'MIT placeholder remains');
assert.ok(!existsSync(path.join(root, 'index.html')), 'Unsafe legacy index.html must not be included in integration PR');
assert.ok(existsSync(path.join(root, 'docs/RIGHTS_AND_ASSET_AUDIT.md')), 'Source/asset audit missing');
assert.ok(existsSync(path.join(root, 'docs/LICENSING_DECISION.md')), 'MIT owner approval record missing');

const publicDir = path.join(root, 'modern/public');
const media = readdirSync(publicDir).sort();
assert.deepEqual(media, ['favicon.svg'], 'Unreviewed public assets: update rights ledger before adding media');

const favicon = source('modern/public/favicon.svg');
assert.match(favicon, /<svg\b/);
assert.match(favicon, /xmlns="http:\/\/www\.w3\.org\/2000\/svg"/);
assert.doesNotMatch(favicon, /<(?:image|script|foreignObject|use)\b|\b(?:href|xlink:href|onload)\s*=|https?:\/\/(?!www\.w3\.org\/2000\/svg)/i);

const drawings = source('modern/src/data/illustrations.ts');
assert.match(drawings, /illustrationPaths/);
for (const id of ['wall', 'column', 'slab', 'large', 'volume']) {
  assert.match(drawings, new RegExp('(?:^|\\n)\\s*' + id + ':\\s*\\['));
}
assert.doesNotMatch(drawings, /https?:\/\/|<image\b|<script\b/i);

const css = source('modern/src/styles/main.css');
assert.doesNotMatch(css, /@import\b|@font-face\b|url\(\s*['"]?\s*(?:https?:|\/\/)/i, 'Unreviewed remote CSS/font asset');

const page = source('modern/src/pages/index.astro');
const card = source('modern/src/components/EquipmentCard.astro');
for (const [name, content] of [['Astro page', page], ['equipment card', card]]) {
  assert.doesNotMatch(content, /<(?:img|image|iframe|script)\b[^>]*\bsrc\s*=\s*['"]https?:\/\//i, name + ' loads unreviewed remote media');
  assert.doesNotMatch(content, /<image\b|\bxlink:href\s*=|<foreignObject\b/i, name + ' contains unreviewed SVG references');
}
assert.match(page, /NO COMMERCIAL SERVICES|НЕ КОММЕРЧЕСКИЙ/);
assert.match(source('modern/docs/PRIVACY_AND_DATA.md'), /original concept diagrams/);

console.log('MIT_RIGHTS_BOUNDARY_PASS: standard 2026 Ruslan Udintsev notice, legacy root absent, original-only SVG public assets, no third-party media embedded. This is not a legal title verification.');
