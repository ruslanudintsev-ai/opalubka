# GitHub Pages integration / cutover — owner-gated release procedure

## Decision and dependency

The owner selected **Astro from PR #5** rather than alternative HTML PR #4. [Integration PR #6](https://github.com/ruslanudintsev-ai/opalubka/pull/6) was prepared as a stacked, focused diff against PR #5. **This is a plan, not a record that a deployment happened**. To establish current source/hosting state, check GitHub merge history and the separately validated public Pages URL, response resources and deployed SHA.

**Integration scope in PR #6:** delete the **historical** root `index.html` (fake submission UI, unverified external image calls, unsupported business claims), keep the truthful root README, preserve P0 historical audit and ADR from PR #3, and retain a read-only `/opalubka/` build/browser preflight. Astro source is still located under `modern/`. The static site root for GitHub Pages is always the **compiled contents of `modern/dist/`**, never the repository root.

## Verified integration and Pages incident (dated snapshot)

- **2026-10-30:** owner-approved Astro PR #5 merged into `main` as **`028208deaabf73e31dba5d396ca76593edba0c8f`**; application code now exists in `modern/` on `main`. This is historical evidence at that SHA, **not proof of a live Astro website**.
- GitHub-managed [Pages run #41084201737](https://github.com/ruslanudintsev-ai/opalubka/actions/runs/41084201737) **FAILED**: Jekyll attempted to parse raw `modern/src/components/EquipmentCard.astro` and `modern/src/pages/index.astro` as YAML front matter. Its **deploy job was SKIPPED**, so the new `main` SHA was not deployed by that run.
- An older successful [Pages run #38036437849](https://github.com/ruslanudintsev-ai/opalubka/actions/runs/38036437849) used `main@28c1fe9fc8d1aa4817a089dff18a00941fdb39e8`. Do **not** assume the old site is still live without checking actual HTTP; failed Jekyll run is not evidence of current public response.
- **2026-10-30:** integration Draft PR #6 retargeted from the former PR #5 branch to merged `main`. This is a staged source integration, **not** a Pages configuration change or approval to merge.
- **Target:** build only `modern/dist/` with `DEMO_BASE_PATH=/opalubka/` and deploy via a separately approved GitHub Actions workflow. Never ask Jekyll to compile `.astro` source or point Pages at the repository root.

## Owner-authorized manually triggered release — source vs live status

**Authorization recorded on 2026-10-30:** owner separately approved switching GitHub Pages away from Jekyll and publishing the reviewed Astro build. [Activation PR #7](https://github.com/ruslanudintsev-ai/opalubka/pull/7) prepares `.github/workflows/pages-astro-manual-release.yml` from the read-only [reference template](./templates/pages-astro-manual-release.yml). The template is retained for diff/guard verification.

**The file's presence alone does not deploy the site.** The workflow has **only `workflow_dispatch`**, no `push` or PR release trigger. A maintainer must first select **Settings → Pages → Build and deployment → Source → GitHub Actions**, then explicitly run the workflow on `main` with its exact `expected_sha` matching the current commit and `release_confirmation=AUTHORIZE_ASTRO_PUBLISH`. The build checks removal of legacy `index.html`, MIT/rights/docs guards, Astro/TypeScript/unit tests, compiled `/opalubka/` paths and local Chromium functionality; it uploads **only compiled `modern/dist/`**. The separate `deploy` job is the **only** job with `pages: write` and `id-token: write`, using the `github-pages` environment.

**Important status distinction:** GitHub repository source, workflow activation, Pages publishing-source configuration, successful deployment and the actual publicly served URL are **five separate states**. Verify each from GitHub settings, Actions logs and real HTTP responses. **Do not claim a completed or healthy public deployment solely because this workflow appears in `main`**. No deployment execution or Pages source setting change is recorded in this source document.

The prior Jekyll failure [#41094511224](https://github.com/ruslanudintsev-ai/opalubka/actions/runs/41094511224) at integrated `main@f27c350fd20841929dc691e63fa7bcc4a130fa92` likewise failed before `deploy`; until custom Actions publishing is selected, branch-triggered Jekyll rebuilds may continue to fail. Do not bypass quality gates or re-enable publishing raw source.

## Separate owner-approved publication sequence

1. Finish review and **separate explicit merge authorization for PR #6** (read-only CI and source integration only). Retargeted PR #6 should have no unintended raw Astro/Jekyll source publication behavior. If Pages is still configured for Jekyll/branch publishing, merging any source change may cause another **failed automatic Jekyll build**. Do **not** quietly change Pages settings to avoid that.
2. Separately approve Pages cutover: inspect its actual Settings → Pages → source and any custom domain, verify last actually deployed version, select **GitHub Actions** as publishing source, and install the reviewed manual-release workflow template **only after that GO**. Do not assume the public site is available.
3. Verify the exact reviewed `main` SHA, set repository environment `github-pages` protection to approved source branch, check Actions permissions and run the manual deployment with the exact SHA. Never automatically deploy on arbitrary `push` from `main`.
4. Confirm the real `https://ruslanudintsev-ai.github.io/opalubka/` response and any existing custom domain; check index/assets (200), 8 internal anchors, favicon CSS/JS, quote/download, no unapproved external requests, 320/390/1440 responsive, keyboard/a11y, security headers and link behavior. Log actual deployed SHA/URL from the workflow output and keep the rollback version.
5. Roll back via a **known previously tested artifact and the same manual process**, not by guessing live server settings or depending on the old Jekyll content; if uncertain, block rollout and report the gap.

GitHub reference: [Custom workflows for Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages). Astro reference: [Deploy Astro to GitHub Pages](https://docs.astro.build/en/guides/deploy/github/). The template is subject to code review when activated and can require adaptation to repo settings.

## Proposed GitHub Pages project path — confirm actual availability separately

Proposed default project URL: `https://ruslanudintsev-ai.github.io/opalubka/`. This is a **candidate URL pattern**, not an assertion that it is currently online. Configure `DEMO_BASE_PATH=/opalubka/` when building. The inherited Astro page already derives favicon and bundled asset paths from `BASE_URL`, and local `/opalubka/` Playwright tests pass. The site remains a fictional demo, not an equipment-rental company.

```sh
cd modern
npm ci
npm run check
npm test
DEMO_BASE_PATH=/opalubka/ npm run build
DEMO_BASE_PATH=/opalubka/ npm run check:artifact
```

The **P1d integration preflight** reproduces these commands at exact source SHA in GitHub Actions, serves the built files at `127.0.0.1:8766/opalubka/`, executes the actual Playwright subpath tests, and uploads a **non-deployed** compiled artifact with source provenance. It has only `contents: read`, no `pages: write`, no `id-token: write`, no `deploy-pages`, and no `push` publication trigger.

## Safe step ordering after separate owner GO

1. **Historical steps completed on 2026-10-30:** PR #5 was merged as `028208deaabf73e31dba5d396ca76593edba0c8f`, and PR #6 was retargeted to `main`. Verify current merge history before relying on these dated statements.
2. **Next owner gate:** recheck PR #6 diff against current `main`, preserve real screenshots and P0 sources, and after separate approval merge PR #6 to retire legacy root HTML. **Never blindly merge PR #4**. PR #3 can be closed without merge **after** its exact P0 documents reach `main`.
3. **Owner's separate Pages publication GO was given on 2026-10-30:** review and integrate activation PR #7, then select **Settings → Pages → Source → GitHub Actions**. Trigger **`pages-astro-manual-release.yml`** explicitly via Actions on `main`, using the current exact SHA and affirmative release confirmation. Its `actions/configure-pages`, `actions/upload-pages-artifact`, `actions/deploy-pages` use `pages: write` and `id-token: write` only in the protected deploy job. It builds/releases only the checked `modern/dist/`. Do not treat this owner GO as evidence that the settings or workflow dispatch already happened.
4. Record current GitHub Pages configuration, permission boundaries, any existing deployed version, build artifact SHA and rollback procedure **before** publishing. Configure an environment rule to restrict publication to reviewed `main` as appropriate. No custom domain or DNS changes implied.
5. After an authorized deployment, verify the real published URL, root/anchor navigation, 200 on CSS/JS/favicon, demo labels, keyboard/click/quote/download, 320/390/1440 responsive layout, no external tracking, and any practical HTTP security controls. Publish actual field or Lighthouse measurements only after they exist. Archive live audit + rollback.
6. Only after live QA, ask for a separate owner authorization to update the public GitHub profile/portfolio presentation.

**Risk of reversing integration order:** combining Astro code and root cleanup out of order can leave the historical misleading root exposed or cause 404s; always verify exact current `main` and Pages build root. Keep the stacked dependency intact.

## Docs and portfolio impact

- [Historical risks and SHA-specific baseline](./AUDIT_BASELINE.md) and [P0 architectural decision](./ARCHITECTURE_DECISION.md) are preserved verbatim from Draft PR #3. They describe **2026-10-29 legacy baseline**, not current Astro source status.
- [Current implemented architecture](../modern/docs/ARCHITECTURE.md), [actual QA evidence](../modern/docs/QA_EVIDENCE.md), [manual/reviewer gaps](../modern/docs/RELEASE_READINESS.md) retain their own scope.
- **MIT is now approved** by the owner for project-controlled code/docs/original SVG, with [standard LICENSE](../LICENSE) and [rights/asset audit](./RIGHTS_AND_ASSET_AUDIT.md). Third-party dependencies retain their licenses. Publication still requires a separate owner GO.

## References

Official GitHub Docs: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

Official Astro GitHub Pages guide: https://docs.astro.build/en/guides/deploy/github/

**NO_MERGE / NO_DEPLOY / NO_BILLING / NO_SECRETS / NO_PII_COLLECTION / NO_PROFILE_UPDATE without explicit owner GO.**
