# QA Evidence ledger — Opalubka / LAB

**Scope:** Astro candidate under `modern/`, **not** the legacy `main/index.html`, public domain or commercial business. Current candidate SHA and final status must be taken from [Draft PR #5](https://github.com/ruslanudintsev-ai/opalubka/pull/5) and **latest runs**, not copied from earlier successful PR comments.

## Historical actual results (30 October 2026)

| Provenance | Real results | Important limitation |
| --- | --- | --- |
| [P1c browser CI #41005874431](https://github.com/ruslanudintsev-ai/opalubka/actions/runs/41005874431), SHA `ce7c4475ccc9676043022483e19afef6e683cfa2` | 10 passed; 3 axe failed; 2 screenshot tests intentionally skipped | Caught `label-content-name-mismatch`, then corrected; **this run FAILED** |
| [P1c browser CI #41006096342](https://github.com/ruslanudintsev-ai/opalubka/actions/runs/41006096342), SHA `796e9e7df658580bbb20f453e69993ea96f5df68` | 13 PASS, 2 intentional SKIP; 8/8 Node unit; Astro check 0 errors/0 warnings | Only Chromium records 5-viewport screenshots; Firefox/WebKit run other smoke and axe tests |
| [P2 browser CI #41007730094](https://github.com/ruslanudintsev-ai/opalubka/actions/runs/41007730094), SHA `0e3bab30170cf41ccc3f648a87e0d9818c874e0a` | 16 PASS, 2 intentional SKIP; 8/8 unit; generated HTML contract PASS; exact SHA screenshots at 320/360/390/768/1440 | Screenshot bundle was downloaded and *visually self-reviewed by implementer*. This is **not** independent acceptance |
| [P2 browser CI #41028297092](https://github.com/ruslanudintsev-ai/opalubka/actions/runs/41028297092), SHA `feead6d45aedb6d4ad39a68924c1bb3c26ca2d41` | 16 PASS, 2 intentional SKIP; 8/8 unit; Astro 0 errors; 8 fragment links / 3 local assets PASS | No proof of real-host browser behavior or screen reader compliance |
| [P2 quality CI #41028297089](https://github.com/ruslanudintsev-ai/opalubka/actions/runs/41028297089), **same SHA** | Real **Lighthouse 13.6 local CI** mobile Performance **94**, Accessibility **100**, Best Practices **100**, SEO **100**; desktop **100/100/100/100**; local FCP/LCP 951ms mobile, 263ms desktop; CLS 0. `npm audit --omit=dev`: **0 production advisories** (point-in-time). | One-off *lab simulation*, not field Core Web Vitals, PageSpeed Insights for a public website or complete security certification |

All artifact attachments are temporary. Check GitHub Actions artifact retention before relying on a link. Source SHAs above are immutable historical records; **any later code change requires a new matching-SHA full CI run** before approval.

## Release candidate artifact

In addition to actual Playwright screenshots, the GitHub Actions preview workflow now packages the **built and validated** `modern/dist/` tree as a separate short-lived artifact `opalubka-static-candidate-<SOURCE_SHA>`. It stamps `RELEASE_PROVENANCE.txt` with the same source SHA and warns **NOT_PUBLISHED**. This workflow **never deploys or updates a hosted site**; the artifact is meant for inspection and future owner-approved release only.

## What is automated

- Node 24 + committed `package-lock.json` + `npm ci`.
- TypeScript/Astro strict diagnostics, pure domain quote + DEMO text formatter unit tests.
- `npm run build` and `npm run check:artifact` for generated HTML, fragments, local CSS/JS/media and no false form/claims.
- Playwright on **Chromium, Firefox, WebKit**: keyboard activation of the equipment picker, category filters, valid/invalid numeric boundary, PII-free DEMO estimate download, reduced motion, no unintended remote fetch; axe WCAG 2.1 A/AA.
- Chromium viewport snapshots at **320/360/390/768/1440**, no horizontal overflow; additional unique SVG/mobile secondary font-size checks at 320/360/390. Firefox and WebKit deliberately **skip only the duplicate five-size screenshot test** (2 SKIP); no blanket browser skips.
- Lighthouse **local** mobile and desktop, uploaded HTML+JSON and validator checking valid metrics/origin; `npm audit --omit=dev` point-in-time report and explicit failure for high/critical production advisories.

## Implementation self-review versus independent acceptance

The implementing agent visually inspected historical screenshots from the exact Chromium run `0e3bab30170cf41ccc3f648a87e0d9818c874e0a`. Mobile layout appeared coherent with no obvious clipping; earlier observations about repeated SVGs and small labels led to fixes and extra tests. This **does not** replace actual physical-device and human/manual accessibility checks, or a different independent reviewer verifying the final SHA. Do **not** mark the reviewer as approved without a real submission.

## Remaining release-blocking and non-blocking gaps

**BLOCKED:**
- Independent review of **current** PR #5 head, with source-backed GitHub review comment and decision. [Reviewer task template](./INDEPENDENT_REVIEW_HANDOFF.md).
- Owner's explicit choice to use the Astro build instead of conflicting P1a Draft PR #4, and separate GO for merging/public hosting/cutover.
- If publishing: verify host/root path really serves **only compiled `dist`**, not the old root `index.html`; record rollback and live QA.

**EVIDENCE_GAP (manual or separate environment):** VoiceOver/NVDA, real-device keyboard/zoom/screen-reader testing, field Core Web Vitals, deployed security headers and PII handling of the future hosting platform, complete historical secret/license audit, legal source license selection. Automated axe and Lighthouse cannot establish these on their own.

**Non-goal:** no real leads, prices, payments, customers, false organization/ratings, paid API, secret-backed services, domain/DNS modifications or changes to the owner's GitHub profile.

## Reproduction

```sh
cd modern
npm ci
npm run check
npm test
npm run build
npm run check:artifact
npx playwright install --with-deps chromium firefox webkit
npm run test:e2e
```

To reproduce Lighthouse use the pinned `lighthouse` CLI against a **locally started** `npm run preview` on port 4321; capture real JSON and keep its specific environment and source SHA. The [P2 workflow](../../.github/workflows/p2-local-quality.yml) shows the exact CI invocations.

**Do not merge, deploy, use paid APIs or collect PII without explicit owner approval.**
