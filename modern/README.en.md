# Opalubka / LAB — honest, tested formwork demo

[Русская документация](./README.md) | [Product brief / issue](https://github.com/ruslanudintsev-ai/opalubka/issues/2)

**Implementation:** maintained Astro/TypeScript source lives in `modern/` (see [PR #5](https://github.com/ruslanudintsev-ai/opalubka/pull/5) and [integration PR #6](https://github.com/ruslanudintsev-ai/opalubka/pull/6)). **Deployment is a separate, independently verified event:** do not infer a public GitHub Pages site from code being merged, green CI or an artifact. The historical 2026-10-29 `main@28c1fe9...` had an unsafe legacy root `index.html`; its removal is the purpose of PR #6, not a claim about the current `main` branch. This is not a real rental company: equipment/prices are fictional and no orders, personal information, payments or offers are processed.

## Why it exists

A concrete example of **human-directed AI-assisted development**: the owner specifies product intent, risk boundaries, QA criteria, reviews and release decisions; AI agents implement modules, tests, diagrams and documentation under those constraints. This distinction matters more than overstating programming authorship or claiming real users.

The site demonstrates a static Astro architecture with strict TypeScript domain models, original SVG/CSS design, three catalog filters/five equipment examples, a local deterministic estimate, invalid-input handling, and a downloadable DEMO-only text breakdown. No React, backend, analytics, third-party imagery or secret is necessary.

## Run and verify locally

Requires **Node.js 24** and npm.

```sh
cd modern
npm ci
npm run check
npm test
npm run build
npm run check:artifact
npx playwright install chromium firefox webkit
npm run test:e2e
npm run dev
```

Open `http://127.0.0.1:4321/` to explore the site locally; this is not a public preview URL. In CI, Playwright uses a health-checked `astro preview` server.

## Demo arithmetic

`rounded_RUB = area_m² × fictional_RUB_per_m²_per_day × (billing_periods × 30) × fictional_discount_factor`.

Supported area: 0.01–10,000 m², at most two decimals. Duration: 1–12 whole 30-day periods. Discounts: 0%, 5%, 10%, 12%, 15%, and 18% for 6+ periods. Delivery, taxes, deposit, engineering and installation are excluded. This is deliberately **not a commercial quote**.

## Verification evidence

- A read-only GitHub Actions workflow checks exact PR HEAD provenance, `npm ci`, Astro types, unit tests, static build, generated links/assets/privacy constraints, Chromium/Firefox/WebKit Playwright scenarios, and automated axe WCAG 2.1 A/AA scans.
- Genuine full-page Chromium screenshots at 320/360/390/768/1440 px are attached as workflow artifacts identified by candidate SHA.
- See [QA evidence](./docs/QA_EVIDENCE.md) and [safe integration/rollback plan](./docs/INTEGRATION_AND_RELEASE.md). Verify the **latest** run and SHA; do not rely on an old green badge after changes.
- Status of **each gate** must be checked against its SHA: source review, manual NVDA/VoiceOver and device QA, chosen hosting/security settings, and actual public URL/HTTP validation. Local Lighthouse CI reports exist but are not field data or a live-site benchmark. Do not infer current release status from this README.

## Privacy and provenance

See [Privacy and data boundaries](./docs/PRIVACY_AND_DATA.md). Illustrations are original code-based schematics, not construction instructions. Upstream open-source dependencies retain their own licenses. The owner approved **MIT** for project-controlled source, documentation and original SVG; the root `LICENSE` and `docs/RIGHTS_AND_ASSET_AUDIT.md` document rights and exclusions. Third-party packages retain upstream licenses. PR #5 (Astro), PR #6 (integration) and live GitHub Pages are separate checkpoints; inspect GitHub to determine which, if any, has actually completed.

**NO_MERGE / NO_DEPLOY / NO_BILLING / NO_SECRETS / NO_PII_COLLECTION / NO_PROFILE_UPDATE without the owner's separate authorization.**
