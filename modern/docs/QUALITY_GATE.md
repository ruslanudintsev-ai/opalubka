# P2 local quality measurement — scope and boundaries

This document describes a proposed **automated** Lighthouse + npm audit workflow for the separate Astro DEMO candidate under `modern/`. It never checks a live public site or verifies real customer traffic.

## Lighthouse

- Lighthouse pinned as a development-only npm dependency in `modern/package.json` and exact integrity-pinned package lock; CI installs it through `npm ci`.
- Runs `lighthouse http://127.0.0.1:4321/` in headless Chrome against the locally built Astro `dist/` and `astro preview`, once in default simulated mobile mode and once in desktop mode. Reports remain downloadable as JSON/HTML GitHub Actions artifacts identified by actual **PR source HEAD SHA**.
- `node scripts/check-lighthouse.mjs` fails if the JSON lacks an actual numeric score for any of Performance, Accessibility, Best Practices, or SEO, if FCP/LCP/CLS metrics are absent, or if a non-local host was measured. Scores are logged **as measured**, not guessed.
- These lab metrics are environment-dependent (CI runner, throttling, browser version). A one-off Lighthouse result is **not** Google field data, CrUX, real Core Web Vitals, PageSpeed Insights, a real deployment, or a guarantee of ranking.
- No made-up or overly brittle absolute performance thresholds before a stable baseline and repeated runs. The report's validity and origin are enforced; regression thresholds can be decided separately from several representative measurements.

## Dependency audit

- `npm audit --omit=dev --json` checks installed production dependency graph using npm advisory service from **CI**, not a browser/client runtime call. `node scripts/check-audit.mjs` fails closed on missing report or npm service error, and blocks quality gate on high/critical production advisories; low/moderate are still disclosed as findings.
- **Important:** this is a point-in-time advisory feed, not proof of absence of vulnerabilities. Transitive build dependencies, dependency confusion, secret scanning, SAST and actual hosting security remain separate checks.
- Any high/critical finding stays a transparent FAIL until investigated, not suppressed with `--force`. No automatic dependency upgrades, secret access or billable service use.

## Release policy

The reviewer should inspect the real report ZIP + source-specific run before accepting this as evidence. `main/index.html` remains legacy; no deployment, merge or root cutover without explicit owner GO. Do not modify the owner's public GitHub profile from this workflow.
