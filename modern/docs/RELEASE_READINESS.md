# Release readiness — decision record for the owner

**Status:** `CANDIDATE_READY_FOR_INDEPENDENT_REVIEW` only when **both** current-head GitHub Actions workflows are green and the static bundle artifact exists. This document is **not** independent approval, merge permission or deployment authorization.

## Finalization checklist

| Gate | Verification/owner action | State |
| --- | --- | --- |
| Honest fictional product | Static `dist` contains visible demo notice, no contact collection, no fake submission or real commercial claims | Automated in CI (reverify current SHA) |
| Accessible/mobile functionality | Browser filters, quote, export, invalid input, reduced motion, axe and 5 Chromium viewports | Automated in CI; two duplicate WebKit/Firefox screenshot tasks intentionally skipped |
| Reproducible source/build | Node 24 + `npm ci` pinned lock, Astro check, unit tests, static asset/fragment audit | Automated in CI |
| Standalone deployable static artifact | Plain `python3 -m http.server --directory dist` checks, source-SHA provenance, `dist` ZIP artifact (CI only) | Automated in CI, **never deployed** |
| Performance and dependency reports | Local simulated Lighthouse mobile/desktop + `npm audit --omit=dev` production advisories | Automated; lab and point-in-time only |
| Architecture, data/privacy and ownership docs | Russian root README, English/Russian modern overview, architecture, DEMO, privacy, QA evidence, safe deployment plan | Provided for review |
| Independent code/security/UX review | Second-pass ChatGPT technical recheck #6522995787 confirmed two fixes on PR #5 SHA 694f1e...; subsequent screenshot evidence was self-inspected at updated SHA | **PARTIAL — independent visual/manual a11y review still unverified; not formal GitHub approval** |
| Manual VoiceOver/NVDA and real phone verification | Real assistive technology and touch device (if available); record exact device/version and evidence | **EVIDENCE_GAP** |
| Choose Astro vs P1a HTML branch | Owner selected Astro PR #5; alternative PR #4 closed unmerged | **OWNER CHOICE RECORDED, integration/merge remains separate** |
| Root integration and publication | Must serve **compiled `modern/dist`** as web root, not old `index.html` or Astro source | **NOT EXECUTED — owner GO required** |
| Legal license choice | Owner approved MIT with 2026 Ruslan Udintsev notice; root LICENSE and rights/asset audit are in stacked Draft PR #6 | **APPROVED IN DRAFT — not merged into main** |
| Public portfolio/profile update | Only after accepted public result and separate owner permission | **NOT EXECUTED** |

## Artifact/release policy

- A PR workflow creates `opalubka-static-candidate-<PR_HEAD_SHA>` from **the same commit it checks out**; inside is the complete compiled static site and `RELEASE_PROVENANCE.txt` marking `NOT_PUBLISHED=YES`.
- This is a reproducible *candidate artifact*, not public GitHub Pages, Cloudflare Pages, domain, CDN or API. CI has **read-only** repository permissions and no deployment step.
- Download it from the green **P1b Astro preview quality** workflow; run a local static server against its contents to review. Do not unzip into production without a separate release plan and owner GO.
- The published root must be the contents of `dist/` (including assets and favicon). The older root `index.html` in the repository is **not** that build and remains misleading; protect against accidentally publishing the repository root.
- Before launch: identify real hosting target, take an authorized baseline backup, write rollback path, assess security headers and cache behavior, and require owner GO. No assumptions about real host/IP.
- After authorized launch only: verify actual URL (HTTP/2, mobile browsers, DNS where relevant), no bogus marketing, actual no-external-fetch, telemetry/consent, accessibility and performance. Record version/hash of what serves publicly.

## Explicit decision request for the owner (future)

> **Astro candidate at exact reviewed SHA** — approve or reject this as replacement for legacy root. If approved after independent review, authorize one specific integration/merge plan and one separately specified hosting deployment, with rollback. Never treat general encouragement to finish coding as permission to change DNS, hosting or a live service.

## Honest outcome

All substantive coding for a safe **static demo** may be finished while some sign-off and release steps remain open. It is incorrect to claim the whole original Issue #2 is DONE, that a real rental business exists, or that a public website has already been deployed. Independent review and owner-controlled deployment are explicit acceptance gates, not work the implementing agent can impersonate.

[Independent reviewer task](./INDEPENDENT_REVIEW_HANDOFF.md) · [Architecture](./ARCHITECTURE.md) · [QA evidence](./QA_EVIDENCE.md) · [Integration plan](./INTEGRATION_AND_RELEASE.md)
