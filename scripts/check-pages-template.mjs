/**
 * Read-only gate for the owner-authorized manual-only Pages workflow.
 * Verify that the ACTIVE workflow is identical to its reviewed template and
 * cannot be triggered by push, pull_request, schedule or other automation.
 */
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = relative => readFileSync(path.join(root, relative), 'utf8');
const template = 'docs/templates/pages-astro-manual-release.yml';
assert.ok(existsSync(path.join(root, template)), 'Release workflow template missing');
const activePath = '.github/workflows/pages-astro-manual-release.yml';
assert.ok(existsSync(path.join(root, activePath)),
  'Owner-approved manual-only Pages workflow must be present');
const activeYaml = read(activePath);
const reviewedBody = text => {
  const marker = '\nname: Opalubka / manually approved Astro Pages release\n';
  const start = text.indexOf(marker);
  assert.ok(start >= 0, 'Manual workflow name marker missing');
  return text.slice(start + 1).trim();
};
assert.equal(reviewedBody(activeYaml), reviewedBody(read(template)),
  'Active release workflow must exactly match reviewed SHA-locked manual template');
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
  if (workflow === 'pages-astro-manual-release.yml') continue; // strictly audited above
  const active = read('.github/workflows/' + workflow);
  assert.doesNotMatch(active, /^\s*uses:\s*actions\/deploy-pages@/m,
    'Unauthorized active GitHub Pages deploy action in ' + workflow);
  assert.doesNotMatch(active, /^\s*uses:\s*withastro\/action@/m,
    'Unauthorized active Astro deploy action in ' + workflow);
  assert.doesNotMatch(active, /^\s*pages:\s*write\s*$/m,
    'Unauthorized Pages write permission in active workflow ' + workflow);
}
for (const forbidden of ['push:', 'pull_request:', 'schedule:', 'repository_dispatch:', 'workflow_run:', 'issue_comment:']) {
  assert.doesNotMatch(activeYaml, new RegExp('^\\s{2}' + forbidden, 'm'),
    'Manual Pages workflow has unapproved automated trigger ' + forbidden);
}
assert.match(activeYaml, /workflow_dispatch:/);
assert.match(activeYaml, /release_confirmation == 'AUTHORIZE_ASTRO_PUBLISH'/);
assert.match(activeYaml, /github.ref == 'refs\/heads\/main'/);
assert.match(activeYaml, /test "\$SOURCE_SHA" = "\$EXPECTED_SHA"/);
assert.match(activeYaml, /test ! -e \.\.\/index\.html/);
assert.match(activeYaml, /path: modern\/dist/);
assert.match(read('docs/PAGES_INTEGRATION_PLAN.md'), /41084201737/,
  'Missing historical Jekyll failure evidence');
assert.match(read('docs/PAGES_INTEGRATION_PLAN.md'), /separate owner GO|separately approved|отдель/i,
  'Missing separate owner authorization gate');
console.log('PAGES_MANUAL_OWNER_GATED_PASS: active manual-only release is identical to reviewed template; only default-branch SHA-confirmed workflow_dispatch can publish compiled dist; no other Pages deploy workflows');
