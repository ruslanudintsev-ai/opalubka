# Licensing decision — MIT approved (2026)

**Decision: APPROVED by repository owner on 2026-10-30.** The approved license is **MIT**, with standard full text in [../LICENSE](../LICENSE) and `Copyright (c) 2026 Ruslan Udintsev` (GitHub account `ruslanudintsev-ai`). This owner decision was first recorded in integration PR #6; MIT approval **did not itself authorize source merging or public hosting**.

The project is a fictional formwork-rental demo and professional example of AI-assisted engineering. MIT permits reading, copying, modifying, distributing and commercial reuse **subject to preserving the license and copyright notice**. It includes an explicit warranty disclaimer.

## Licensed content / scope

MIT is intended to cover the **owner-controlled project source and associated documentation**, including the Astro/TypeScript application, custom CSS and original schematic SVG paths (five equipment illustrations, hero drawing, favicon). Project-authored test code, workflows and the historical P0 audit documents are included **to the extent the owner holds the necessary rights**.

See [RIGHTS_AND_ASSET_AUDIT.md](./RIGHTS_AND_ASSET_AUDIT.md) for the file inventory, media provenance, and limitations of this check.

## Materials not relicensed by our MIT notice

- **Installed npm dependencies** (Astro, TypeScript, Playwright, axe, Lighthouse and transitive packages) retain their respective third-party license terms, notices and rights. The repo commits `package-lock.json` as a dependency manifest, not `node_modules/` or copies of third-party package sources.
- Trademarks, external web URLs and referenced third-party pages do not become project-owned merely by being referenced in README or historical docs.
- The **historical** `main@28c1fe9...` root `index.html` contained unverified external image hotlinks. It is excluded from the new release by integration PR #6. Whether that deletion has reached current `main` must be checked in Git history; do not distribute the old HTML as an MIT-licensed asset.
- Any later photo, font, vendor schematic, logo, code snippet or other external material with unknown permissions must be excluded until independently licensed/attributed.

## What was verified, and what was not

**Checked:** recursive tracked repository tree, original SVG paths and inline drawings, sole favicon in `modern/public/`, CSS and page references, README/docs provenance, and the separate npm lockfile dependency boundary. No vendor photos, remote font packages, stock imagery or binary source assets were found in the new Astro candidate. This finding is reinforced by a read-only CI rights/asset guard.

**Not a legal determination:** AI-assisted code and documentation may have copyright uncertainty under applicable law. GitHub repository ownership, tool-generated content and this source audit alone cannot prove exclusive copyright or eliminate all third-party code similarity. The owner authorizes MIT distribution **only over rights they control**.

**Version boundary:** MIT and source/asset provenance were initially committed in stacked integration PR #6 on 2026-10-30. Treat its Git SHA as historical evidence; **current merge state must be checked live**, and actual Pages publication separately verified from deployed SHA/URL.

**Status:** `OWNER_MIT_LICENSE_APPROVED / SOURCE_RIGHTS_BOUNDARY_CHECKED / NO_MERGE / NO_DEPLOY`.
