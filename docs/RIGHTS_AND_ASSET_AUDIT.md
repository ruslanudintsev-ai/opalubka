# Rights and asset provenance audit — 2026-10-30

**Purpose:** review the **actual tracked integration Draft PR #6 tree** before applying the owner's explicitly approved MIT license. The copyright notice uses **Ruslan Udintsev**, the project owner using GitHub account `ruslanudintsev-ai`, and year **2026**. This is a source/provenance review, **not legal certification** of originality or copyright ownership in every jurisdiction.

## Evidence reviewed

- The complete recursive Git tree for `release/astro-integration-draft-20261030` immediately before licensing. **No repository-root legacy `index.html` remains in this Draft branch**. The live `main` branch remains unchanged and still contains the older root file; no claim of removal from `main`.
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
| Root legacy `index.html` on `main` | Previous mockup included `image.qwenlm.ai` hotlinks, misleading marketing and fake request UI. It is **removed only in this integration Draft branch**. | **Excluded from new licensing scope by deletion**; must not serve/publish the old `main` root |
| Dependencies `astro`, `@astrojs/check`, `typescript`, `@playwright/test`, `@axe-core/playwright`, `lighthouse`, transitive packages | Third-party software brought in by npm and lockfile. No bundled `node_modules` in Git; use the license files/attribution shipped by each installed package. | **NOT relicensed** by the project's MIT notice |
| GitHub links, GitHub names and project links | URLs and references only; no third-party GitHub logos, stock imagery or brand marks imported as reusable assets. | Third-party trademarks remain their owners' property |

## Risk/limitations and mitigation

1. **No unauthorized third-party binary assets identified in the tracked Astro candidate** by inventory and content checks. This does not conclusively prove human originality of every AI-assisted line or exclude undiscovered code similarity. Avoid absolute copyright guarantees.
2. The copyright notice identifies the owner as `Copyright (c) 2026 Ruslan Udintsev`. The owner expressly chose MIT in the current conversation. It applies only to material the owner can legally license; third-party packages, logos, trademarks and external links stay with their rightsholders.
3. AI agents performed substantial implementation and writing. The README remains transparent; an MIT `LICENSE` must **not** be read as an assertion that the owner hand-coded every module.
4. The site is a fictional demo without actual customer information, supplier images, real specifications or market rates. Existing `main/index.html` is **not** safe to publish and will only be retired after integration approval.
5. For later new images/fonts/snippets, require source URL, original author, license, permission and local attribution in this ledger **before committing**. If rights cannot be established, exclude them. Tests now enforce a small static-asset allowlist to catch additions.

## Reproducible guard

The integration workflow runs `node ../scripts/check-license-boundary.mjs` to assert the exact MIT notice, scope documentation, deleted legacy root, original SVG-only static asset allowlist, and absence of `@import`/remote CSS media or external SVG references. This automated check is **only a measurable repository boundary**, not a legal title search or a comprehensive scan of all npm packages.

**Branch scope:** Draft PR #6 only. `main` is unchanged. No merge, deployment, GitHub Pages setup or profile edits are implied.
