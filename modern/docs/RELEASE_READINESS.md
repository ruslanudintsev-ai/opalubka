# Release readiness — decision record for the owner

**Purpose:** an acceptance-gate checklist, **not an automatically updated release status**. Historical engineering evidence is linked by SHA. Verify the current branch, latest CI, independent review, release authorizations and **actual public URL** before marking gates complete. A merged repository, a candidate ZIP and a live deployed site are three different states.

## Finalization checklist

| Gate | Verification/owner action | State |
| --- | --- | --- |
| Honest fictional product | Static `dist` contains visible demo notice, no contact collection, no fake submission or real commercial claims | Automated in CI (reverify current SHA) |
| Accessible/mobile functionality | Browser filters, quote, export, invalid input, reduced motion, axe and 5 Chromium viewports | Automated in CI; two duplicate WebKit/Firefox screenshot tasks intentionally skipped |
| Reproducible source/build | Node 24 + `npm ci` pinned lock, Astro check, unit tests, static asset/fragment audit | Automated in CI |
| Standalone deployable static artifact | Plain `python3 -m http.server --directory dist` checks, source-SHA provenance, `dist` ZIP artifact (CI only) | Automated in CI, **never deployed** |
| Performance and dependency reports | Local simulated Lighthouse mobile/desktop + `npm audit --omit=dev` production advisories | Automated; lab and point-in-time only |
| Architecture, data/privacy and ownership docs | Russian root README, English/Russian modern overview, architecture, DEMO, privacy, QA evidence, safe deployment plan | Provided for review |
| Independent code/security/UX review | Technical recheck #6522995787 and third-pass #6525379823 reviewed source, CI and actual screenshot artifact at dated SHAs | **Historical PASS for examined scope; formal human review, manual screen-reader/real-device testing remain unverified** |
| Manual VoiceOver/NVDA and real phone verification | Real assistive technology and touch device (if available); record exact device/version and evidence | **EVIDENCE_GAP** |
| Choose Astro vs P1a HTML branch | Owner selected Astro PR #5; alternative PR #4 was closed without merge | **Architecture decision recorded; check merge state live in GitHub** |
| Root integration and publication | GitHub source integration and separately approved Pages deployment serve **compiled `modern/dist`** as site root | **Not certified by this document; requires checked merge, live URL, deployed SHA and HTTP QA** |
| Legal license choice | Owner approved MIT, `Copyright (c) 2026 Ruslan Udintsev`; scope and caveats in root `LICENSE` and `docs/RIGHTS_AND_ASSET_AUDIT.md` | **Owner choice recorded; independently verify exact files in current branch** |
| Public portfolio/profile update | Only after accepted public result and separate owner permission | **NOT EXECUTED** |

## Artifact/release policy

- A PR workflow creates `opalubka-static-candidate-<PR_HEAD_SHA>` from **the same commit it checks out**; inside is the complete compiled static site and `RELEASE_PROVENANCE.txt` marking `NOT_PUBLISHED=YES`.
- This is a reproducible *candidate artifact*, not public GitHub Pages, Cloudflare Pages, domain, CDN or API. CI has **read-only** repository permissions and no deployment step.
- Download it from the green **P1b Astro preview quality** workflow; run a local static server against its contents to review. Do not unzip into production without a separate release plan and owner GO.
- Serve the **contents of compiled `dist/`** (including assets and favicon), never the Git repository root. On the historic baseline SHA `28c1fe9...` the root `index.html` was misleading; PR #6 removes it. Its existence in *current* `main` must be checked, not presumed.
- Before launch: identify real hosting target, take an authorized baseline backup, write rollback path, assess security headers and cache behavior, and require owner GO. No assumptions about real host/IP.
- After authorized launch only: verify actual URL (HTTP/2, mobile browsers, DNS where relevant), no bogus marketing, actual no-external-fetch, telemetry/consent, accessibility and performance. Record version/hash of what serves publicly.

## Explicit decision request for the owner (future)

> **Astro candidate at exact reviewed SHA** — approve or reject this as replacement for legacy root. If approved after independent review, authorize one specific integration/merge plan and one separately specified hosting deployment, with rollback. Never treat general encouragement to finish coding as permission to change DNS, hosting or a live service.

## Honest outcome

Static-demo engineering and sign-off/public release are separate. This document alone cannot establish Issue #2 completion, an operating rental business, or a publicly deployed website. Independent review and owner-controlled deployment are explicit acceptance gates, not work the implementing agent can impersonate.

[Independent reviewer task](./INDEPENDENT_REVIEW_HANDOFF.md) · [Architecture](./ARCHITECTURE.md) · [QA evidence](./QA_EVIDENCE.md) · [Integration plan](./INTEGRATION_AND_RELEASE.md)
