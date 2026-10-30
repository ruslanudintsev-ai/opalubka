# Licensing decision — proposal for owner approval

**Proposed choice:** **MIT License** for project-owned `modern/` application code, docs authored for the project, and original source SVG diagrams. This is suitable for a public technical portfolio: attribution and license inclusion required; code remains readable and reusable; no claim of commercial warranty. It does **not** mean this repository already grants MIT permission. **The owner/rightsholder must explicitly approve the choice before adding a `LICENSE` file or merging it.**

## Why MIT is recommended

- Recognizable, permissive and easy for recruiters/developers to understand.
- Consistent with the project intent: an auditable source showcase of an Astro+TS demo, not a protected proprietary rental service or product data.
- No need to create a separate CC BY license for simple original SVG diagrams if the owner elects MIT to cover the entire new project. If the owner wants separate art rights, alternative is **MIT for code, CC BY 4.0 for original illustrations**, with a precise file-level boundary.

## What must not be unintentionally licensed

- **Legacy root `index.html`** contains unverified remote imagery and unsupported claims; in this integration branch it is **deleted**, not relicensed.
- Dependencies such as Astro, TypeScript, Playwright, axe, Lighthouse have upstream licenses; include their own notices and do not state they were authored by the repository owner.
- Third-party logos, content snippets, images, UI kits, proprietary data, Github branding, or other material not proven owned may **not** be covered by a project-level license merely because they appear in a repository.
- Significant AI-generated source contributions were used under human operator direction; the README describes that honestly. This is not legal proof of ownership or copyright originality.

## Approval checklist

- [ ] Owner explicitly accepts **MIT** (or names a different license).
- [ ] Verify any copied third-party source/assets, legal rights and attribution before publishing a root `LICENSE`.
- [ ] Ensure scope is clearly marked and no deleted legacy external assets are included in the distribution.
- [ ] Add `LICENSE` with a correct copyright holder/year only after the owner's choice; do not invent a company or legal identity.
- [ ] Re-run source/build/tests and reviewer approval at the new SHA.

Until then, the public repository being readable does not by itself grant blanket reuse rights. This document **is not** a legal opinion.

**Status: OWNER_LICENSE_DECISION_REQUIRED; NO LICENSE FILE CREATED.**
