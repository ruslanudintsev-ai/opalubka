# Agent instructions — `modern/` only

This file documents permanent AI-assisted implementation and release boundaries for the **Astro project**, regardless of its current merge state. Owner remains responsible for product decisions, acceptance and release; AI agents contribute code, tests, docs and evidence. Never claim the owner personally wrote AI-generated implementation.

## Non-negotiable controls

- **No merge, deployment, new public preview, DNS, profile edit, GitHub Pages/Cloudflare change, paid service, API billing, secrets or real PII collection** without an explicit, separately recorded owner GO.
- Treat `modern/` as a fictional DEMO, not real procurement, renting or engineering advice. Never add fictitious reviews, offices, phone numbers, names, certificates, prices presented as real or fake success messages.
- Owner selected Astro, not legacy HTML PR #4. Preserve the PR #5 → integration PR #6 dependency; do not publish or restore historical root `index.html`. Check current merge state and [release plan](./docs/INTEGRATION_AND_RELEASE.md) before acting.
- Keep dependency changes and the npm lockfile synchronized. Never conceal broken CI by skipping tests or changing assertions to match a bug.
- Add only original or verified reusable images; record source/license. Existing schematics in `src/data/illustrations.ts` are original concept drawings. No hotlinked media.
- No AI model/API integration is necessary here. Do not consume paid frontier inference to perform routine changes.

## Mandatory workflow

1. Re-read current main HEAD, any applicable open PR HEAD, issue #2, review threads and exact-SHA CI; do not assume any PR is still Draft or unmerged.
2. Use focused commits to the relevant Draft branch; no destructive history rewrites or force push.
3. Keep fixtures in `src/data/catalog.ts`, pure math in `src/domain/`, DOM wiring in `src/scripts/`, accessible components in `src/components/`, styles in `src/styles/`.
4. Run in `modern/`: `npm ci`, `npm run check`, `npm test`, `npm run build`, `npm run check:artifact`, `npm run test:e2e` with installed browsers. Note explicitly which checks are unavailable.
5. Test invalid inputs, mobile 320/360/390/768/1440, keyboard access, unique accessible names, no external network writes, downloaded estimate content and axe.
6. Attach actual screenshots/test logs from the exact candidate SHA. Distinguish implementing-agent self-checks from independent reviewer acceptance.
7. Report exact SHA, paths, test count, PASS/FAIL/SKIP, run URL, current evidence gaps, conflicts and next step in the PR/issue.

Do not assert Lighthouse, Web Vitals, full security compliance, manual screen-reader access, real-world usage or production uptime unless those exact checks truly happened.
