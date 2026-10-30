# Independent review #6520748183 — remediation and hosting-base contract

**Source review:** [PR #5 second-pass comment](https://github.com/ruslanudintsev-ai/opalubka/pull/5#issuecomment-6520748183) submitted against source HEAD `2fa813d08850ceca1bd2ebf2067b7fc7bedba56b`, verdict **CHANGES_REQUESTED**. The review is an independent ChatGPT code pass through the owner's account, **not** a formal GitHub review submission. Screenshot ZIP, manual screen-reader, real devices and public hosting were not independently inspected.

## Finding 1 — Windows path bug (P2, confirmed)

**Before:** `scripts/check-built.mjs` compared `asset.startsWith(dist + '/')`, which mismatches `C:\\...\\dist\\favicon.svg` on Windows.

**After:** `scripts/asset-paths.mjs` uses `path.relative(root, candidate)` plus `.. + sep` and `isAbsolute` to check containment for either POSIX or win32. It also validates the selected static base and URL decoding to reject traversal and out-of-base asset links.

**Regression:** `tests/asset-paths.test.mjs` covers `path.win32` genuine in-root paths, a different drive, sibling `dist-fake`, traversal and `/opalubka/` URL mapping. The **Windows-latest GitHub Actions job** repeats `npm test`, then actual root and subpath `npm run build && npm run check:artifact` using Node 24 and the committed lockfile. This is not only a simulated Windows path check.

## Finding 2 — static project-subpath hosting

No public hosting provider or custom domain has been selected. Two **build modes** are now supported as a technical fixture, not a deployment decision:

| Scenario | Build-time variable | Resulting URL and asset paths |
| --- | --- | --- |
| Static site at domain root | unset `DEMO_BASE_PATH` (default `/`) | HTML at `/`; CSS/JS/favicon under `/_astro/` and `/favicon.svg` |
| Example GitHub Pages *project* location | `DEMO_BASE_PATH=/opalubka/` | HTML at `/opalubka/`; asset paths must be `/opalubka/_astro/` and `/opalubka/favicon.svg` |

The Astro config validates the base during **build time**, and the layout derives the favicon from `import.meta.env.BASE_URL`. The generated-output guard checks **all** script/style/image links against the base and actual files beneath `dist/`.

**Integration QA** is separate from the root production artifact. The CI browser workflow first verifies **root build** and uploads root `dist/` as a candidate **without deploying it**, then rebuilds with `DEMO_BASE_PATH=/opalubka/` and serves compiled files under a genuine local `http://127.0.0.1:8766/opalubka/` directory using plain HTTP. A dedicated Playwright config checks page loads, no escaped requests, 200 JS/CSS/favicon, anchor navigation, filters, keyboard selection, local quote and .txt download. It also runs the new Windows build checks on `windows-latest`.

**Release caveat:** if/when the owner selects another hosting path, **rebuild with that actual base and repeat the same tests** before hosting. `site`/canonical production origin, 404 handling, domain, cache/CSP/security headers, field CWV and rollout/rollback remain decisions and evidence gaps. **Do not treat this localhost scenario as a GitHub Pages deployment.** No GitHub Pages, DNS or Cloudflare settings are changed.

## Independent evidence and limitations

- Latest run must match **exact PR HEAD** after these fixes. Stale green CI does not count.
- Test count now includes additional win32/POSIX unit cases, 2 dedicated subpath Playwright tests, and separate Windows-latest job.
- Existing Chromium/Firefox/WebKit tests and Lighthouse/npm audit checks remain enforced (no skips to avoid regressions).
- Manual VoiceOver/NVDA, physical-device QA, screenshot review by the second-pass reviewer and external GitHub review approval remain open.
- PR #5 stays Draft, `main/index.html` stays legacy, P1a PR #4 remains an alternative implementation. Owner must explicitly approve eventual integration, source licensing, hosting and rollback.

**NO_MERGE / NO_DEPLOY / NO_BILLING / NO_SECRETS / NO_PII_COLLECTION / NO_PROFILE_UPDATE.**
