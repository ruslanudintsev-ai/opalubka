import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { normalizeBasePath, isWithinDirectory, resolveBuiltAsset } from '../scripts/asset-paths.mjs';

test('root and project-style URL bases validate correctly', () => {
  assert.equal(normalizeBasePath('/'), '/');
  assert.equal(normalizeBasePath('/opalubka/'), '/opalubka/');
  assert.equal(normalizeBasePath('/portfolio/projects/'), '/portfolio/projects/');
  for (const bad of ['', 'opalubka/', '//site/', '/opalubka', '/a/../', '/./', '/%2e%2e/', '/a b/']) {
    assert.throws(() => normalizeBasePath(bad), { message: /DEMO_BASE_PATH/ });
  }
});

test('POSIX built assets stay beneath dist', () => {
  const root = path.posix.resolve('/workspace/modern/dist');
  assert.equal(resolveBuiltAsset(root, '/favicon.svg', '/', path.posix), '/workspace/modern/dist/favicon.svg');
  assert.equal(resolveBuiltAsset(root, '/opalubka/_astro/app.css?v=1', '/opalubka/', path.posix), '/workspace/modern/dist/_astro/app.css');
  for (const bad of ['/favicon.svg', '/_astro/app.js', '/opalubka/../escape.js', '/opalubka/%2e%2e/escape.js', '/opalubka/%5csecret']) {
    assert.throws(() => resolveBuiltAsset(root, bad, '/opalubka/', path.posix));
  }
});

test('Windows path separator regression: valid assets MUST pass', () => {
  const root = path.win32.resolve('C:\\project\\modern\\dist');
  const asset = path.win32.resolve(root, 'favicon.svg');
  assert.equal(root, 'C:\\project\\modern\\dist');
  assert.equal(isWithinDirectory(root, asset, path.win32), true);
  assert.equal(resolveBuiltAsset(root, '/favicon.svg', '/', path.win32), asset);
  assert.equal(resolveBuiltAsset(root, '/opalubka/_astro/main.js', '/opalubka/', path.win32),
    path.win32.resolve(root, '_astro', 'main.js'));
  // This was the confirmed review bug: native Windows path is NOT prefixed by dist + '/'.
  assert.equal(asset.startsWith(root + '/'), false);
});

test('Windows traversal, sibling and other drive escape attempts fail closed', () => {
  const root = path.win32.resolve('C:\\project\\modern\\dist');
  assert.equal(isWithinDirectory(root, path.win32.resolve(root, '..', 'dist-fake', 'app.js'), path.win32), false);
  assert.equal(isWithinDirectory(root, path.win32.resolve('D:\\project\\modern\\dist\\app.js'), path.win32), false);
  assert.equal(isWithinDirectory(root, root, path.win32), false);
  for (const bad of ['/opalubka/%2e%2e/outside.css', '/opalubka/../outside.css', '/opalubka/%5cWindows', '/opalubka//wrong.js']) {
    assert.throws(() => resolveBuiltAsset(root, bad, '/opalubka/', path.win32));
  }
});

test('URL origin/incorrect-prefix inputs are rejected', () => {
  const root = path.posix.resolve('/workspace/modern/dist');
  for (const bad of ['https://example.com/evil.js', '//evil.test/x.js', '/not-opalubka/app.js', '/opalubka-extra/app.js', '/opalubka/']) {
    assert.throws(() => resolveBuiltAsset(root, bad, '/opalubka/', path.posix));
  }
});
