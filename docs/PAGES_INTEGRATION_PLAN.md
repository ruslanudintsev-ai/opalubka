# GitHub Pages integration / cutover — draft only

## Decision and dependency

The owner has selected **Astro in Draft PR #5** as the preferred portfolio site, rather than P1a legacy HTML Draft PR #4. This document accompanies a **stacked integration Draft PR based on the P1b/P2 feature branch**, intentionally making the final integration diff small and reviewable. It is **not yet merged to main**, and **does not publish or change GitHub Pages settings**.

**Current integration-draft changes:** delete the old root `index.html` (which contains fake submission UI, unlicensed external image calls, unsupported business claims), retain the truthful root README, carry forward the historical P0 audit and ADR from PR #3, and add a read-only `/opalubka/` build/browser preflight. Astro source is still located under `modern/`. The static site root for GitHub Pages is always the **compiled contents of `modern/dist/`**, never the repository root.

## Owner-selected publication target, not yet enabled

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

1. Accept an independent review of the exact PR #5 SHA. Preserve real screenshot evidence and mark remaining manual screen-reader/real-device gaps honestly.
2. Merge PR #5 **only after owner authorization**; it adds Astro to `modern/` but leaves the legacy root `index.html` intact temporarily. **Do not configure Pages publishing from repository root during this interval.**
3. Retarget the stacked integration Draft PR to `main`, check the exact changed-file diff, re-run its CI, and **only after separate approval**, merge it to retire the legacy root index, preserving P0 history. **Never blindly merge PR #4**, the abandoned HTML alternative. PR #3 can be closed without merge **after** its exact historical documents have entered main.
4. After the owner separately authorizes public hosting: select **Settings → Pages → Build and deployment → Source → GitHub Actions**. Create the distinct deploy workflow with `actions/configure-pages`, `actions/upload-pages-artifact`, and an owner-approved `actions/deploy-pages` job using `pages: write`, `id-token: write` and the `github-pages` protected environment. No deploy job is present in this Draft PR. Use the **checked, same-SHA `modern/dist/`** site.
5. Record current GitHub Pages configuration, permission boundaries, any existing deployed version, build artifact SHA and rollback procedure **before** publishing. Configure an environment rule to restrict publication to reviewed `main` as appropriate. No custom domain or DNS changes implied.
6. After an authorized deployment, verify the real published URL, root/anchor navigation, 200 on CSS/JS/favicon, demo labels, keyboard/click/quote/download, 320/390/1440 responsive layout, no external tracking, and any practical HTTP security controls. Publish actual field or Lighthouse measurements only after they exist. Archive live audit + rollback.
7. Only after live QA, ask for a separate owner authorization to update the public GitHub profile/portfolio presentation.

**Risk if sequence is reversed:** merging only PR #5 while serving repository root leaves the legacy misleading HTML publicly available; merging only the integration PR before the Astro application is in main risks a root 404. Keep the stacked dependency intact.

## Docs and portfolio impact

- [Historical risks and SHA-specific baseline](./AUDIT_BASELINE.md) and [P0 architectural decision](./ARCHITECTURE_DECISION.md) are preserved verbatim from Draft PR #3. They describe **2026-10-29 legacy baseline**, not current Astro source status.
- [Current implemented architecture](../modern/docs/ARCHITECTURE.md), [actual QA evidence](../modern/docs/QA_EVIDENCE.md), [manual/reviewer gaps](../modern/docs/RELEASE_READINESS.md) retain their own scope.
- [Licensing proposal](./LICENSING_DECISION.md) should be approved before merge/public distribution.

## References

Official GitHub Docs: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

Official Astro GitHub Pages guide: https://docs.astro.build/en/guides/deploy/github/

**NO_MERGE / NO_DEPLOY / NO_BILLING / NO_SECRETS / NO_PII_COLLECTION / NO_PROFILE_UPDATE without explicit owner GO.**
