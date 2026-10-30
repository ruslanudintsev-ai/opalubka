/**
 * Regression guard: portfolio-facing docs may outlive merge/release transitions.
 * Verify historical baseline is dated and live deployment is not inferred.
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = name => readFileSync(path.join(root,name), 'utf8');

const publicDocs = [
  'README.md',
  'modern/README.md',
  'modern/README.en.md',
  'modern/docs/ARCHITECTURE.md',
  'modern/docs/RELEASE_READINESS.md',
  'modern/docs/INTEGRATION_AND_RELEASE.md',
  'docs/PAGES_INTEGRATION_PLAN.md',
  'docs/LICENSING_DECISION.md',
  'modern/docs/QA_EVIDENCE.md',
];
const unsafe = [
  /main\s+still\s+(?:has|serves|contains)\s+(?:an?\s+)?legacy/i,
  /(?:PR\s*#5\s+and\s+)?main\s+(?:remains|is)\s+unmerged/i,
  /\bmain\s+is\s+unchanged\b/i,
  /\bnot\s+yet\s+merged\s+to\s+main\b/i,
  /\bВ\s+`?main`?\s+ничего\s+ещ[её]\s+не\s+слито\b/i,
  /\bна\s+неизмен[её]нной\s+ветке\s+`?main`?\s+пока\b/i,
  /\b(?:PR\s*#5|PR\s*#6)\b[^\n]{0,70}\b(?:remain[s]?\s+Draft|is\s+unmerged)\b/i,
];
for (const file of publicDocs) {
  const content = read(file);
  for (const pattern of unsafe) {
    assert.doesNotMatch(content, pattern, 'Future-stale merge assertion in ' + file);
  }
}
const rootReadme = read('README.md');
assert.match(rootReadme, /28c1fe9fc8d1aa4817a089dff18a00941fdb39e8/, 'Missing exact historical baseline SHA');
assert.match(rootReadme, /2026|29 октября/, 'Missing date to qualify historical claim');
assert.match(rootReadme, /modern\/dist\//, 'Missing static web-root contract');
assert.match(rootReadme, /публич|GitHub Pages/i, 'Missing distinction from publication');
assert.match(read('modern/README.en.md'), /deployment is a separate/i, 'English source/deploy separation missing');
assert.match(read('modern/docs/ARCHITECTURE.md'), /live URL|hosted URL|deployed SHA/i, 'Architecture lacks live-state qualifier');
assert.match(read('modern/docs/RELEASE_READINESS.md'), /actual public URL/i, 'Release ledger must require actual public URL');
assert.match(read('docs/PAGES_INTEGRATION_PLAN.md'), /owner/i, 'Owner release gate must remain');
console.log('DOC_STATUS_FUTURE_PROOF_PASS: historical SHA/date preserved, no unqualified main/merge assertions, source vs actual public deployment separated in portfolio docs');
