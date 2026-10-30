# Architecture — Opalubka / LAB portfolio demo

**Implementation location:** `modern/` in [Draft PR #5](https://github.com/ruslanudintsev-ai/opalubka/pull/5). This file documents *code that exists*, not an imaginary production architecture. Baseline `main` still has an unrelated legacy root `index.html`; no server cutover has taken place.

## System boundaries

```mermaid
flowchart TB
  User["Visitor (browser)"] --> Static["Local static Astro build (HTML/CSS/JS + favicon)"]
  Static --> Page["Astro page/layout/components"]
  Page --> Fixtures["Typed fictional catalog (5 equipment samples)"]
  User --> UI["DOM enhancements (filters, quote inputs)"]
  UI --> Quote["Pure calculateQuote (validation + math)"]
  Quote --> Export["Pure estimate formatter"]
  Export --> Download["Client-only Blob -> DEMO .txt"]
  CI["Read-only GitHub Actions"] --> Unit["Node built-in unit tests"]
  CI --> Build["Astro check/build + built-asset integrity"]
  CI --> E2E["Playwright Chromium/Firefox/WebKit + axe"]
  CI --> Lab["Local Lighthouse mobile/desktop"]
  CI --> Advisory["npm audit --omit=dev"]
  Build --> Artifact["Static dist artifact (NOT deployed)"]
```

### Component and module map

| Path | Responsibility |
| --- | --- |
| `src/pages/index.astro` / `layouts/BaseLayout.astro` | Static Russian-language page, SEO metadata, semantic landmarks, explicit fictional-demo copy |
| `src/components/EquipmentCard.astro` | Accessible native selection controls and reusable card |
| `src/data/catalog.ts` | TypeScript fixture ID/category/rate contracts; no network inventory |
| `src/data/illustrations.ts` | Five original conceptual, **not engineering**, SVG drawings |
| `src/domain/quote.ts` | Pure input validation: area 0.01–10,000 m² (<=2 decimals), 1–12 whole 30-day periods; synthetic rates and discounts |
| `src/domain/estimate.ts` | Deterministic UTF-8 marked DEMO text estimate, no identifying fields |
| `src/scripts/demo.ts` | Browser filter state, calculator events and Blob download, with no remote writes |
| `src/styles/main.css` | Theme tokens, responsive layout, reduced-motion and print-only estimate |
| `scripts/check-built.mjs` | Fail-closed validation of produced HTML, internal anchors, local assets, visible DEMO and no legacy forms |
| `scripts/check-audit.mjs`, `scripts/check-lighthouse.mjs` | Numeric report integrity and advisory gate; always distinguish simulated lab from field performance |

No React hydration, backend, database, authentication, customer PII or fake order form exists in this candidate. Introducing them without a real user requirement would increase complexity and privacy/security surface.

## Reproducible commands

Requires Node.js 24 and npm. From `modern/`:

```sh
npm ci
npm run check
npm test
npm run build
npm run check:artifact
npx playwright install --with-deps chromium firefox webkit
npm run test:e2e
npm run preview
```

GitHub Actions runs exactly these gates (and local Lighthouse + production npm advisory check) on the exact source SHA of the pull request; original screenshots and quality reports are attached as short-lived artifacts. Built `dist/` is **the static site root**, not `modern/` source files or the repository root. Full compiled site is available as an ephemeral CI artifact, not a hosted URL.

## Deployment decision and rollback (not executed)

The owner must choose a target and approve a **separate GO** before any hosting/DNS/merge action. After review, serve only the compiled `modern/dist/` contents as the static website root. Do **not** publicly serve `main/index.html` (legacy marketing content) or the raw `modern/src` files as a substitute. Before any release, record the current hosting config, publish target, baseline checksum and tested artifact SHA. Recheck live responses from a real URL after deployment. For rollback, restore the recorded previous artifact/config; do not guess at deployment credentials or IP addresses. See [INTEGRATION_AND_RELEASE.md](./INTEGRATION_AND_RELEASE.md).

## Security and claim boundaries

- No user data collection: no contact forms, backend fetches, analytics or cookies in the described source. Third-party hosting may still log access; that is **not verified**.
- Catalog prices are entirely illustrative, not market data or a legal offer.
- The exact point-in-time test result is in GitHub workflow runs; local Lighthouse is not field Core Web Vitals and automated axe is not a full screen-reader acceptance.
- All drawings were created as project-owned source rather than copied from vendors. Other open-source packages retain upstream licenses; project licensing needs an owner decision.
- Implementing agent self-checks must never be described as independent reviewer approval.

**Source of truth:** [Issue #2](https://github.com/ruslanudintsev-ai/opalubka/issues/2). **No merge, deploy, billing, PII collection or profile update without owner-approved scope.**
