# Rights and asset provenance audit — 2026-10-30

**Purpose:** review the **actual tracked integration Draft PR #6 tree** before applying the owner's explicitly approved MIT license. The copyright notice uses **Ruslan Udintsev**, the project owner using GitHub account `ruslanudintsev-ai`, and year **2026**. This is a source/provenance review, **not legal certification** of originality or copyright ownership in every jurisdiction.

## Evidence reviewed

- The complete recursive Git tree of `release/astro-integration-draft-20261030` **as reviewed on 2026-10-30 before licensing**. The historical legacy root `index.html` was absent in that snapshot; at audit time, `main@28c1fe9...` still contained it. The audit makes **no claim about the current branch or live hosting state**.
- The app code and client entrypoints in `modern/src/`, project-specific `modern/scripts/` and tests, `modern/src/data/illustrations.ts`, the inline hero SVG in `modern/src/pages/index.astro`, `modern/src/components/EquipmentCard.astro`, and `modern/public/favicon.svg`.
- CSS `modern/src/styles/main.css` uses a system-font stack with no `@import`, remote `url(...)` background, `@font-face`, or external font stylesheet. Static generated HTML/media tests separately check resolved local CSS, JS, favicon and prohibit unapproved third-party media.
- `modern/docs/PRIVACY_AND_DATA.md`, original Astro/TypeScript documentation, copied historical P0 audit/ADR from Draft PR #3 (exact blob SHAs confirmed), the root/English READMEs and QA/release records.
- `modern/package.json` and integrity-pinned `modern/package-lock.json`: open-source **third-party npm packages**, not source code authored by this repository's owner. `node_modules/` is ignored and not committed. Dependencies retain their own notices and licenses.

| Material | Finding / provenance basis | MIT decision |
| --- | --- | --- |
| `modern/src/`, `modern/scripts/`, `modern/tests/` | Repository-specific AI-assisted code written for this demo under owner's product direction; no third-party code or package source vendored in tracked tree. No copy of unrelated sites detected in files inspected; provenance is not a legal guarantee. | Covered to the extent of owner-held rights |
| Product diagrams in `modern/src/data/illustrations.ts` | Five distinct inline SVG **path definitions** created for this specific demo; no manufacturer images or imported photos; concept-only, not technical specifications. | Covered to the extent of owner-held rights |
| Hero SVG, equipment-card SVG markup, `modern/public/favicon.svg` | Original schematic shapes encoded in project source, with no `<image>`, remote `href`, `<use>` reference or image fetch. SVG `http://www.w3.org/2000/svg` is an **XML namespace**, not a network request. | Covered to the extent of owner-held rights |
| Project-specific English/Russian READMEs, docs and historical P0 records | Project-authored AI-assisted technical writing; P0 texts include **references to** previous source, external URLs and risk evidence, rather than vendor image files. Historical records must not be represented as current deployment claims. | Covered to the extent of owner-held rights; external quoted works not relicensed |
| `modern/public/` tracked assets | Contains only the original `favicon.svg`. No `.jpg`, `.jpeg`, `.png`, `.webp`, `.woff*`, video, vendor photo, or external logo present in the tracked static-asset folder. | No discovered unauthorized embedded media |
| Historical root `index.html` (`main@28c1fe9...`) | Previous mockup included `image.qwenlm.ai` hotlinks, misleading marketing and fake request UI. The integration PR #6 removes it from the intended source tree. | **Excluded from new licensing scope**; never republish historical root as the new web app |
| Dependencies `astro`, `@astrojs/check`, `typescript`, `@playwright/test`, `@axe-core/playwright`, `lighthouse`, transitive packages | Third-party software brought in by npm and lockfile. No bundled `node_modules` in Git; use the license files/attribution shipped by each installed package. | **NOT relicensed** by the project's MIT notice |
| GitHub links, GitHub names and project links | URLs and references only; no third-party GitHub logos, stock imagery or brand marks imported as reusable assets. | Third-party trademarks remain their owners' property |

## Risk/limitations and mitigation

1. **No unauthorized third-party binary assets identified in the tracked Astro candidate** by inventory and content checks. This does not conclusively prove human originality of every AI-assisted line or exclude undiscovered code similarity. Avoid absolute copyright guarantees.
2. The copyright notice identifies the owner as `Copyright (c) 2026 Ruslan Udintsev`. The owner expressly chose MIT in the current conversation. It applies only to material the owner can legally license; third-party packages, logos, trademarks and external links stay with their rightsholders.
3. AI agents performed substantial implementation and writing. The README remains transparent; an MIT `LICENSE` must **not** be read as an assertion that the owner hand-coded every module.
4. The site is a fictional demo without actual customers, supplier images, real specifications or market rates. The **historic** `main@28c1fe9.../index.html` was not safe to publish; check actual integration state and do not restore it.
5. For later new images/fonts/snippets, require source URL, original author, license, permission and local attribution in this ledger **before committing**. If rights cannot be established, exclude them. Tests now enforce a small static-asset allowlist to catch additions.

## Reproducible guard

The integration workflow runs `node ../scripts/check-license-boundary.mjs` to assert the exact MIT notice, scope documentation, deleted legacy root, original SVG-only static asset allowlist, and absence of `@import`/remote CSS media or external SVG references. This automated check is **only a measurable repository boundary**, not a legal title search or a comprehensive scan of all npm packages.

**Audit provenance:** this material/source scan was performed for PR #6's 2026-10-30 Draft snapshot. It is **not** a live assertion about present-day `main`, merge state, Pages configuration, or GitHub profile. Any new third-party media requires renewed review.
