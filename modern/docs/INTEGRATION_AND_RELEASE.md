# Release integration plan — NOT permission to deploy

**Scope:** reusable integration/release procedure, developed across [Astro PR #5](https://github.com/ruslanudintsev-ai/opalubka/pull/5) and [integration PR #6](https://github.com/ruslanudintsev-ai/opalubka/pull/6). This document does **not** attest to whether either PR is currently merged or a website is deployed. Check live GitHub PR status and verified hosted URL/SHA separately.

## Why this is not publication-ready just because CI is green

- **Historical baseline (2026-10-29, `main@28c1fe9...`):** the legacy root file contained unsupported business claims and fake submission UI. PR #6 proposes/implements removing that file in the integration change; this historical risk does not describe the current `main` automatically.
- [P0 PR #3](https://github.com/ruslanudintsev-ai/opalubka/pull/3) contains the dated baseline audit and architectural decision, copied exactly into integration PR #6; verify that the documents reached `main` before treating the source PR as superseded.
- [Alternative legacy-HTML PR #4](https://github.com/ruslanudintsev-ai/opalubka/pull/4) was closed unmerged following the owner's choice of Astro; it is not an Astro dependency.
- [Astro PR #5](https://github.com/ruslanudintsev-ai/opalubka/pull/5) implements the app under `modern/` but does not itself retire the legacy root. [Integration PR #6](https://github.com/ruslanudintsev-ai/opalubka/pull/6) handles that removal. Keep this dependency in release planning, irrespective of present merge status.
- **Architecture choice recorded:** owner chose Astro. Do not resurrect/merge the competing HTML alternative. Always serve compiled `modern/dist/` rather than repository-root files.

## Suggested decision sequence (no step is automatically authorized)

1. **Independent code/UX/security review** of exact PR #5 SHA and GitHub Actions artifact. Examine five Chromium full-page screenshots, quote/accessibility tests, no network writes, fixtures, SPDX/licensing and dependency vulnerabilities. Obtain the reviewer verdict in PR #5 with exact SHA.
2. **Owner's architecture choice (recorded):** Astro static site, not the standalone legacy HTML patch. Confirm exact SHA under review before any new release decision.
3. **Integrate in order:** PR #5 first; then retarget/re-review the stacked integration PR #6 against the resulting `main` and run fresh CI. It removes the historical root HTML and carries P0 docs. Check exact GitHub merge status rather than assuming any step happened.
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
