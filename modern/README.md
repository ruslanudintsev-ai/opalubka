# Opalubka — Astro + TypeScript experimental preview

[English documentation](./README.en.md)

**Status:** P1b candidate in `modern/`. Does **not** replace the root `index.html` or constitute deployment. This is a fictional product demonstration, not a rental business. Prices, equipment labels, categories and technical drawings are illustrative; no orders, contacts, personal data, paid services or backend.

## Architecture

- Astro static output: `src/pages/index.astro` + accessible components and CSS tokens.
- `src/data/catalog.ts`: typed fictional equipment data.
- `src/domain/quote.ts`: pure `calculateQuote()` input validation, arithmetic and exclusions.
- `src/scripts/demo.ts`: progressive browser enhancement for category filters and quotes; no network requests or storage.
- `src/styles/main.css`: responsive visuals with original CSS/SVG drawings, no remote image/font dependencies.
- Deterministic client-only `.txt` demo estimate via `src/domain/estimate.ts`; download is disabled for invalid quotes, does not use network or collect PII.
- Real-browser Playwright checks at 320/360/390/768/1440, axe WCAG 2.1 A/AA and UI/download smoke across Chromium, Firefox and WebKit. Screenshots/HTML report are GitHub Actions artifacts tied to the exact source SHA.
- Zero React hydration and no API/analytics by design.

## Local setup

Requires Node.js **24** and npm. Install the open-source toolchain:

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

Open `http://127.0.0.1:4321`. Use `npm run preview` to inspect `dist/`. No credentials required. **Do not claim any command ran until attached CI evidence confirms it.** The lockfile is required for reproducibility; `npm ci` must not be replaced with an unpinned install in final quality gates.

## Quote policy

`totalRub = Math.round(areaM2 × demoDailyRateRubPerM2 × (billingPeriods × 30) × demoDiscountFactor)`.

Area: 0.01–10,000 m², max two decimals. Billing periods: integer 1–12; 1 period = 30 fictional days. Discounts: 0%, 5%, 10%, 12%, 15%, then 18% for 6+. Does not account for delivery, VAT, deposit, installation or accessories. Not engineering advice, a legal offer, or market pricing.

## QA and integration caveats

A passing TypeScript/build/unit CI only proves the **isolated preview** builds and its pure module behaves as tested; it does not prove the legacy main page was migrated, nor verify real keyboard/screen reader, screenshots, WebKit/Firefox, 320/360/390/768/1440, Lighthouse, or licensed third-party assets. This directory includes only self-authored SVG/CSS illustration. Playwright automated axe checks do **not** replace manual screen-reader QA, human screenshot inspection, Lighthouse or high-fidelity cross-device performance testing. Successful browser tests do not imply a real business or live deployment. No deployment/merge without separate owner GO.

See the original specification [Issue #2](https://github.com/ruslanudintsev-ai/opalubka/issues/2) and independent P1a [Draft PR #4](https://github.com/ruslanudintsev-ai/opalubka/pull/4). Do not merge them automatically; the migration/integration decision belongs to the owner.

## Документация и решения перед выпуском

- [DEMO: пошаговая демонстрация для ревьюера](./docs/DEMO.md)
- [Реальные результаты проверок и ограничения](./docs/QA_EVIDENCE.md)
- [Границы приватности, схема данных и происхождение иллюстраций](./docs/PRIVACY_AND_DATA.md)
- [План интеграции с основным сайтом и контроль владельца](./docs/INTEGRATION_AND_RELEASE.md)
- [Инструкции для AI-агентов](./AGENTS.md)
- [English overview](./README.en.md)

**Роль владельца:** требования к продукту, запреты на рискованные действия, критерии приёмки, решение о публикации. **Роль AI-агентов:** существенная реализация кода, тестов, дизайна и документов. Авторство не подменяется. До отдельного GO никакого слияния, деплоя, новых аккаунтов, платных API и изменения GitHub-профиля.
