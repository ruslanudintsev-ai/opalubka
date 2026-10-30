/**
 * Read-only gate for the staged GitHub Pages cutover. Intentional: must be
 * revised under separate owner approval when an actual deploy workflow is activated.
 */
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = relative => readFileSync(path.join(root, relative), 'utf8');
const template = 'docs/templates/pages-astro-manual-release.yml';
assert.ok(existsSync(path.join(root, template)), 'Release workflow template missing');
assert.ok(!existsSync(path.join(root, '.github/workflows/pages-astro-manual-release.yml')),
  'The review-only template was activated without updating this safety gate');
const yaml = read(template);

const mandatory = [
  /workflow_dispatch:/,
  /expected_sha:/,
  /release_confirmation:/,
  /AUTHORIZE_ASTRO_PUBLISH/,
  /github\.ref == 'refs\/heads\/main'/,
  /github\.sha/,
  /EXPECTED_SHA/,
  /test "!\?\$?\(git rev-parse HEAD\)"|git rev-parse HEAD/,
  /test ! -e \.\.\/index\.html/,
  /DEMO_BASE_PATH: \/opalubka\//,
  /npm ci/,
  /npm run check/,
  /npm test/,
  /check-license-boundary/,
  /check-doc-status/,
  /playwright\.subpath\.config/,
  /LICENSE\.txt/,
  /actions\/upload-pages-artifact@v4/,
  /path: modern\/dist/,
  /needs: build/,
  /permissions:[\s\S]+pages: write/,
  /id-token: write/,
  /environment:/,
  /name: github-pages/,
  /actions\/deploy-pages@v4/,
];
for (const requirement of mandatory) {
  assert.match(yaml, requirement, 'Missing manual Pages release safety feature');
}
assert.doesNotMatch(yaml, /^\s*push:\s*$/m,
  'Release template must NOT deploy automatically on main push');
assert.doesNotMatch(yaml, /^\s*pull_request:\s*$/m,
  'Release template must NOT deploy on a pull request');

const workflows = readdirSync(path.join(root, '.github/workflows'))
  .filter(name => /\.ya?ml$/i.test(name));
for (const workflow of workflows) {
  const active = read('.github/workflows/' + workflow);
  assert.doesNotMatch(active, /^\s*uses:\s*actions\/deploy-pages@/m,
    'Unauthorized active GitHub Pages deploy action in ' + workflow);
  assert.doesNotMatch(active, /^\s*uses:\s*withastro\/action@/m,
    'Unauthorized active Astro deploy action in ' + workflow);
  assert.doesNotMatch(active, /^\s*pages:\s*write\s*$/m,
    'Unauthorized Pages write permission in active workflow ' + workflow);
}
assert.match(read('docs/PAGES_INTEGRATION_PLAN.md'), /41084201737/,
  'Missing historical Jekyll failure evidence');
assert.match(read('docs/PAGES_INTEGRATION_PLAN.md'), /separate owner GO|separately approved|отдель/i,
  'Missing separate owner authorization gate');
console.log('PAGES_DORMANT_TEMPLATE_PASS: validated manual SHA-locked dist-only release template outside active workflows; no Pages deployment permissions active');
