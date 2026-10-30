# GitHub Pages integration / cutover — owner-gated release procedure

## Decision and dependency

The owner selected **Astro from PR #5** rather than alternative HTML PR #4. [Integration PR #6](https://github.com/ruslanudintsev-ai/opalubka/pull/6) was prepared as a stacked, focused diff against PR #5. **This is a plan, not a record that a deployment happened**. To establish current source/hosting state, check GitHub merge history and the separately validated public Pages URL, response resources and deployed SHA.

**Integration scope in PR #6:** delete the **historical** root `index.html` (fake submission UI, unverified external image calls, unsupported business claims), keep the truthful root README, preserve P0 historical audit and ADR from PR #3, and retain a read-only `/opalubka/` build/browser preflight. Astro source is still located under `modern/`. The static site root for GitHub Pages is always the **compiled contents of `modern/dist/`**, never the repository root.

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

1. Accept an independent review of the exact PR #5 SHA. Preserve real screenshot evidence and mark remaining manual screen-reader/real-device gaps honestly.
2. Merge PR #5 **only after owner authorization**; it adds Astro to `modern/` but leaves the legacy root `index.html` intact temporarily. **Do not configure Pages publishing from repository root during this interval.**
3. Retarget the stacked integration Draft PR to `main`, check the exact changed-file diff, re-run its CI, and **only after separate approval**, merge it to retire the legacy root index, preserving P0 history. **Never blindly merge PR #4**, the abandoned HTML alternative. PR #3 can be closed without merge **after** its exact historical documents have entered main.
4. After the owner separately authorizes public hosting: select **Settings → Pages → Build and deployment → Source → GitHub Actions**. Create the distinct deploy workflow with `actions/configure-pages`, `actions/upload-pages-artifact`, and an owner-approved `actions/deploy-pages` job using `pages: write`, `id-token: write` and the `github-pages` protected environment. The read-only integration preflight described here contains no deploy job; the presence/status of any later workflow must be verified in the current repository. Use the **checked, same-SHA `modern/dist/`** site.
5. Record current GitHub Pages configuration, permission boundaries, any existing deployed version, build artifact SHA and rollback procedure **before** publishing. Configure an environment rule to restrict publication to reviewed `main` as appropriate. No custom domain or DNS changes implied.
6. After an authorized deployment, verify the real published URL, root/anchor navigation, 200 on CSS/JS/favicon, demo labels, keyboard/click/quote/download, 320/390/1440 responsive layout, no external tracking, and any practical HTTP security controls. Publish actual field or Lighthouse measurements only after they exist. Archive live audit + rollback.
7. Only after live QA, ask for a separate owner authorization to update the public GitHub profile/portfolio presentation.

**Risk of reversing integration order:** combining Astro code and root cleanup out of order can leave the historical misleading root exposed or cause 404s; always verify exact current `main` and Pages build root. Keep the stacked dependency intact.

## Docs and portfolio impact

- [Historical risks and SHA-specific baseline](./AUDIT_BASELINE.md) and [P0 architectural decision](./ARCHITECTURE_DECISION.md) are preserved verbatim from Draft PR #3. They describe **2026-10-29 legacy baseline**, not current Astro source status.
- [Current implemented architecture](../modern/docs/ARCHITECTURE.md), [actual QA evidence](../modern/docs/QA_EVIDENCE.md), [manual/reviewer gaps](../modern/docs/RELEASE_READINESS.md) retain their own scope.
- **MIT is now approved** by the owner for project-controlled code/docs/original SVG, with [standard LICENSE](../LICENSE) and [rights/asset audit](./RIGHTS_AND_ASSET_AUDIT.md). Third-party dependencies retain their licenses. Publication still requires a separate owner GO.

## References

Official GitHub Docs: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

Official Astro GitHub Pages guide: https://docs.astro.build/en/guides/deploy/github/

**NO_MERGE / NO_DEPLOY / NO_BILLING / NO_SECRETS / NO_PII_COLLECTION / NO_PROFILE_UPDATE without explicit owner GO.**
