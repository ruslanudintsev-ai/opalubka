# Release integration plan — NOT permission to deploy

**Status:** plan only; Draft PR #5. Exact SHAs, CI and browser evidence must be refreshed after every change. All links target public GitHub; none is a deployment.

## Why this is not publication-ready just because CI is green

- `main` still serves a legacy single-file website with fabricated business claims, fake “request sent” UI, unverified external images and a mislabelled quote.
- [P0 Draft #3](https://github.com/ruslanudintsev-ai/opalubka/pull/3) adds audit and architecture documents only. It can be reconciled separately after source line references are checked.
- [P1a Draft #4](https://github.com/ruslanudintsev-ai/opalubka/pull/4) is a **different, vanilla-HTML remediation of that legacy root**. It is a valid alternative/contingency, not a prerequisite to the Astro migration.
- [P1b/P1c Draft #5](https://github.com/ruslanudintsev-ai/opalubka/pull/5) builds a separate, tested Astro candidate under `modern/` **without altering root `index.html`**. Simply merging it would leave the public root unchanged and could leave legacy misleading content accessible.
- **Do not merge #4 and #5 blindly:** they solve the same product problem in different ways. Owner and independent reviewer must select the intended public root strategy.

## Suggested decision sequence (no step is automatically authorized)

1. **Independent code/UX/security review** of exact PR #5 SHA and GitHub Actions artifact. Examine five Chromium full-page screenshots, quote/accessibility tests, no network writes, fixtures, SPDX/licensing and dependency vulnerabilities. Obtain the reviewer verdict in PR #5 with exact SHA.
2. **Owner selects destination**: preferred candidate Astro static site after review, or P1a single-file demo as fallback. Record the decision in Issue #2. Do not silently claim the legacy website has already been replaced.
3. **Create a new, focused `base=main` integration Draft PR** after approved candidates are reconciled. Its job is to make the chosen build the intentional root artifact and remove/retire misleading legacy content. Do not resolve collisions by merging all implementation PRs.
4. For Astro: choose and document static-file delivery (e.g., deploy only `modern/dist` as root). Existing root `index.html` should **not** be served or indexed as an alternative. Verify generated asset paths, base URL and fragment links on a local preview. No Cloudflare/GitHub Pages/DNS changes in this plan.
5. Integrate only *non-conflicting* P0 documentation that is still accurate after migration. Keep an evidence trail of decisions, source SHA and exact changed paths. Close/supersede unused alternative PR only with owner acknowledgement.
6. Require gates: locked `npm ci`; typecheck; unit/domain tests; built asset/anchor/privacy validation; Chromium/Firefox/WebKit Playwright+axe, screenshots 320/360/390/768/1440; independent visual review; manual keyboard and screen-reader test when possible; security and asset provenance review. Document skipped tests and gap ownership.
7. **Separate explicit owner GO** required for any merge or public preview/domain/deploy/analytics/API/token/account/PII action. Pre-deploy rollback requires known baseline and full snapshot, never assume current hosting.
8. After GO and successful release, re-check public URL, origin requests, accessibility and real delivery. Only then propose a public GitHub profile case-study update; **separate owner approval** is still required.

## Why not add an API or React now?

The use case is a fictional catalog and **client-only** calculation/download; an API or React would add moving parts, hosting costs/risk and privacy concerns without measurable user benefit. Architecture intentionally maximizes *appropriate* skill demonstrations, not badge count.

## Reviewer deliverable

Approve or reject **candidate suitability**, not deployment. Cite specific file and line, SHA, test/screenshot and any unclosed issue. Distinguish confirmed defects, possible risks and evidence gaps. An implementing agent's self-check is not independent approval.

**Never** present a green CI badge as proof of a real company, real sales, a safe public endpoint, accessibility certification or measured Lighthouse scores.

**NO_MERGE / NO_DEPLOY / NO_BILLING / NO_SECRETS / NO_PII_COLLECTION / NO_PROFILE_UPDATE.**
