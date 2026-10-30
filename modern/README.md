# Opalubka — Astro + TypeScript experimental preview

[English documentation](./README.en.md)

**Исходный код:** Astro/TypeScript находится в `modern/`; это основной выбранный вариант проекта. Исторический корневой `index.html` был в `main@28c1fe9...` 29.10.2026; его удаление подготовлено в интеграционном PR #6. **Наличие кода в `main` не означает работающий публичный сайт:** GitHub Pages требует отдельной публикации и проверки живого URL. Это вымышленная демонстрация, не компания; без заявок, PII, платежей, реальных тарифов или backend.

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

**Последние автоматические проверки:** точные значения и URL нужно смотреть в [GitHub Actions у текущего SHA](https://github.com/ruslanudintsev-ai/opalubka/pull/5/checks). В исходных запусках на 30.10.2026 успешно выполнялись Node unit, Astro strict check/build, Playwright в Chromium/Firefox/WebKit, axe, реальные скриншоты пяти разрешений и Lighthouse mobile/desktop на **локальном preview**. Обновление исходников требует **нового успешного прогона**. Проверки не означают готовность реального бизнеса или работу сайта на публичном адресе. **Не проверены вручную:** VoiceOver/NVDA, реальные мобильные устройства, field CWV/CrUX, настройки продакшен-хостинга. Второе независимое ChatGPT-ревью подтвердило два технических исправления, а третье проверило реальные скриншоты и MIT; это не формальное человеческое или screen-reader одобрение. CI сохраняет SHA-привязанные пакеты `modern/dist/` **без публикации**. Статусы merge, реального deploy и live URL необходимо смотреть отдельно. Решение о дальнейших действиях принимает владелец.

See the original [Issue #2](https://github.com/ruslanudintsev-ai/opalubka/issues/2), chosen Astro [PR #5](https://github.com/ruslanudintsev-ai/opalubka/pull/5) and separate [integration PR #6](https://github.com/ruslanudintsev-ai/opalubka/pull/6). Alternative legacy HTML [PR #4](https://github.com/ruslanudintsev-ai/opalubka/pull/4) was closed without merge; do not mix its implementation into Astro.

## Документация и решения перед выпуском

- [Архитектура и границы компонентов](./docs/ARCHITECTURE.md)
- [DEMO: пошаговая демонстрация для ревьюера](./docs/DEMO.md)
- [Реальные результаты проверок и ограничения](./docs/QA_EVIDENCE.md)
- [Границы приватности, схема данных и происхождение иллюстраций](./docs/PRIVACY_AND_DATA.md)
- [План интеграции с основным сайтом и контроль владельца](./docs/INTEGRATION_AND_RELEASE.md)
- [Финальный чеклист выпускной готовности](./docs/RELEASE_READINESS.md)
- [Задание независимому ревьюеру с шаблоном вердикта](./docs/INDEPENDENT_REVIEW_HANDOFF.md)
- [Инструкции для AI-агентов](./AGENTS.md)
- [English overview](./README.en.md)

**Роль владельца:** требования, приёмка, выпуск; **роль AI-агентов:** значительная часть кода, тестов, дизайна и документации. Авторство не подменяется. Публикацию подтверждают только реальный проверенный URL и запись о фактическом SHA/деплое. Каждая следующая операция (merge, deploy, аккаунты/API, GitHub-профиль) требует соответствующего отдельного разрешения.
