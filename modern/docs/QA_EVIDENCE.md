# P1c — browser QA evidence (recorded, not marketing claims)

**Scope:** isolated Astro preview under `modern/`. Existing root `index.html` on `main` is **not** tested, deployed or replaced by this work. Public GitHub tests alone do not prove production, business operations, revenue, real tariffs or site uptime.

## Actual check results (2026-10-30)

| Evidence | Exact code SHA | Result | Reference |
| --- | --- | --- | --- |
| Earlier working-browser run | `ce7c4475ccc9676043022483e19afef6e683cfa2` | **FAIL**: 10 passed, 3 axe failed, 2 screenshot-test skips | [Run #41005874431](https://github.com/ruslanudintsev-ai/opalubka/actions/runs/41005874431) |
| Focused follow-up after WCAG fix | `796e9e7df658580bbb20f453e69993ea96f5df68` | **PASS**: 13 browser tests passed; 2 intentional viewport duplicates skipped on Firefox/WebKit; 8/8 unit tests; Astro check 0 errors/0 warnings; build PASS | [Run #41006096342](https://github.com/ruslanudintsev-ai/opalubka/actions/runs/41006096342) |
| Provenance correction | See latest Draft PR #5 run | Next source candidate must explicitly checkout the PR head and name artifacts using `SOURCE_SHA` rather than GitHub's synthetic PR merge SHA. Use latest PR evidence, not old run label, for final assessment. | [Draft PR #5](https://github.com/ruslanudintsev-ai/opalubka/pull/5) |

**What failed and was fixed:** axe `label-content-name-mismatch` (WCAG 2.5.3) detected a decorative brand link and five product buttons whose `aria-label` did not include their visible text. Removed the conflicting brand label; button names now start with the visible word “Выбрать”. Do not suppress the axe rule.

## Browser coverage (run #41006096342)

- **Chromium:** five viewport sizes **320, 360, 390, 768, 1440 px** checked for no horizontal overflow, actual real screenshots, initial quote, console/network errors; category filter, keyboard Enter, quote changing, zero/negative/decimal invalid states, download, axe WCAG 2.1 A/AA and reduced motion.
- **Firefox and WebKit:** interactive filtering/keyboard, input validation, no-PII text download, axe WCAG 2.1 A/AA and reduced motion checked on desktop project settings; duplicate five-viewport screenshot test is deliberately skipped for these engines, **not** treated as a PASS.
- **Saved artifacts:** genuine Playwright screenshots, traces on failures and HTML report attached to successful [run #41006096342](https://github.com/ruslanudintsev-ai/opalubka/actions/runs/41006096342), artifact ID **12955453217**. This earlier run used PR-merge SHA in artifact name; exact source SHA above is confirmed by workflow run head and later corrected in workflow.
- **Math/unit tests:** `node --experimental-strip-types --test tests/*.test.mjs` runs eight positive and negative test cases; source-only tests are not substituted for browser UX checks.
- **Node 24**, pinned `@playwright/test@1.64.1`, `@axe-core/playwright@4.14.0`, Astro 7.4.4, `npm ci` from tracked lockfile. GitHub Actions runner environment is Ubuntu-hosted.
- **No new paid API, secret, hosted database, production URL, analytics or third-party image/font** required.

## Limitations / manual QA still needed

- Human visual inspection of the full-page screenshots is **not yet performed**, although actual screenshots exist. An automated “no overflow” assertion is not sufficient to judge typography or visual hierarchy.
- Axe is not a full accessibility audit: manual keyboard-only navigation, focus visibility, screen-reader testing (NVDA/VoiceOver), zoom at 200%/400%, and color contrast under various conditions still need testing.
- Lighthouse, real Core Web Vitals, loading-time metrics, server logs/uptime and commercial/SEO results **not measured**.
- Browser assertions prove network calls stayed on `127.0.0.1:4321` in exercised scenarios; they do not prove unrelated hosting never collects data.
- Artifact retention is limited; links may expire. No artificial screenshots are used as QA evidence.

## Reproduce

```sh
cd modern
npm ci
npm run check
npm test
npm run build
npx playwright install --with-deps chromium firefox webkit
npm run test:e2e
```

Local `playwright.config.mjs` automatically starts a preview server; CI starts it explicitly and checks HTTP readiness. Revalidate against the **latest exact PR HEAD** before independent reviewer signoff. PR remains Draft; **NO_MERGE / NO_DEPLOY / NO_BILLING / NO_PII_COLLECTION**.
