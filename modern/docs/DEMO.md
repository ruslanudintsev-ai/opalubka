# DEMO walkthrough — 5-minute reproducible portfolio review

**This is a fictional showcase, not an actual formwork-rental service.** The running page is currently a local Astro preview under `modern/`; the repository's root `index.html` has not yet been replaced.

## Hands-on scenarios

1. Open the local preview and confirm the visible **DEMO / НЕ КОММЕРЧЕСКИЙ ПРОЕКТ** disclaimer above the catalog. Do not confuse mock rates or drawings with real equipment.
2. Under catalog, switch filters among **Все решения**, **Вертикальные**, **Перекрытия**, **Специальные**. Five cards should display initially, then 2/1/2 in the respective categories.
3. Focus the **Колонная** card's **Выбрать** button and press Enter; the calculator should select that fixture, scroll to the result and move keyboard focus to equipment type.
4. Enter 500 m² and 3 periods for **Стеновая**. The transparent example is **500 × 90 ₽/м²/day × 90 days × 0.9 = 3,645,000 DEMO ₽**. This is fictional arithmetic, not a price quote.
5. Try area 0, negative, 10,000.01 and 1.234; invalid input should show an error, mark the field invalid and **disable download**. Repeat for zero/fractional/13 periods. Correct it and download `opalubka-demo-smeta.txt`.
6. Open the text file: it must contain the DEMO / non-offer labels, chosen type, rate, units, formula, total, exclusions, and zero user contact fields. Print uses a similar warning.
7. On actual responsive widths **320, 360, 390, 768, 1440 px**, check navigation, readable text, unique drawings, card visibility, no horizontal overflow and keyboard focus. Automated screenshots are attached to the exact SHA's Playwright artifact, not generated mockups.
8. Check no form can be submitted and no third-party runtime fetch appears in the tested flows. The only external links point to this public repository and Issue #2.

## Architecture and QA evidence

- Static Astro components and a **typed fictional catalog**.
- `src/domain/quote.ts`: pure validation and math.
- `src/domain/estimate.ts`: deterministic output, no PII and no network.
- `src/scripts/demo.ts`: browser enhancements only.
- `tests/quote.test.mjs` and `tests/browser/demo.spec.mjs`: real positive/negative tests, Playwright/axe; `scripts/check-built.mjs`: generated HTML safety and internal-link guard.
- [Evidence ledger](./QA_EVIDENCE.md), [privacy](./PRIVACY_AND_DATA.md), [owner-gated integration plan](./INTEGRATION_AND_RELEASE.md).

**Important:** screenshot artefacts expire; do not misstate unmeasured Lighthouse, screen-reader conformance, production hosting or real market data. Reviewer signoff and owner GO remain outstanding.
