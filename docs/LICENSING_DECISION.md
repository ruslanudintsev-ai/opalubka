# Licensing decision — MIT approved (2026)

**Decision: APPROVED by repository owner on 2026-10-30.** The approved license is **MIT**, with standard full text in [../LICENSE](../LICENSE) and `Copyright (c) 2026 Ruslan Udintsev` (GitHub account `ruslanudintsev-ai`). This is an owner decision for the **integration Draft PR #6**, **not** a merge or public-hosting authorization.

The project is a fictional formwork-rental demo and professional example of AI-assisted engineering. MIT permits reading, copying, modifying, distributing and commercial reuse **subject to preserving the license and copyright notice**. It includes an explicit warranty disclaimer.

## Licensed content / scope

MIT is intended to cover the **owner-controlled project source and associated documentation**, including the Astro/TypeScript application, custom CSS and original schematic SVG paths (five equipment illustrations, hero drawing, favicon). Project-authored test code, workflows and the historical P0 audit documents are included **to the extent the owner holds the necessary rights**.

See [RIGHTS_AND_ASSET_AUDIT.md](./RIGHTS_AND_ASSET_AUDIT.md) for the file inventory, media provenance, and limitations of this check.

## Materials not relicensed by our MIT notice

- **Installed npm dependencies** (Astro, TypeScript, Playwright, axe, Lighthouse and transitive packages) retain their respective third-party license terms, notices and rights. The repo commits `package-lock.json` as a dependency manifest, not `node_modules/` or copies of third-party package sources.
- Trademarks, external web URLs and referenced third-party pages do not become project-owned merely by being referenced in README or historical docs.
- Legacy `main/index.html`, which contains unverified external image hotlinks, is **deleted in this Draft PR #6 only**. Do not include or publish that file as part of the new MIT-licensed release. `main` stays unchanged until explicit merge authorization.
- Any later photo, font, vendor schematic, logo, code snippet or other external material with unknown permissions must be excluded until independently licensed/attributed.

## What was verified, and what was not

**Checked:** recursive tracked repository tree, original SVG paths and inline drawings, sole favicon in `modern/public/`, CSS and page references, README/docs provenance, and the separate npm lockfile dependency boundary. No vendor photos, remote font packages, stock imagery or binary source assets were found in the new Astro candidate. This finding is reinforced by a read-only CI rights/asset guard.

**Not a legal determination:** AI-assisted code and documentation may have copyright uncertainty under applicable law. GitHub repository ownership, tool-generated content and this source audit alone cannot prove exclusive copyright or eliminate all third-party code similarity. The owner authorizes MIT distribution **only over rights they control**.

**Version boundary:** the `LICENSE` is committed to stacked Draft PR #6, which remains based on unmerged Astro PR #5. Neither LICENSE nor root HTML deletion is currently in `main`; final review and the owner's separate merge/deploy GO are still required.

**Status:** `OWNER_MIT_LICENSE_APPROVED / SOURCE_RIGHTS_BOUNDARY_CHECKED / NO_MERGE / NO_DEPLOY`.
