# P0 baseline audit — Opalubka

> **Status:** source audit complete; browser/performance/accessibility runtime QA **NOT performed** (EVIDENCE_GAP).
> **Date:** 2026-10-29. **Tracked source:** `main@28c1fe9fc8d1aa4817a089dff18a00941fdb39e8`.
> **Issue:** [#2](https://github.com/ruslanudintsev-ai/opalubka/issues/2).
> **Scope:** documentation-only Draft PR. No production, DNS, CI deployment, billing or real personal-data processing.

## Product truth and boundary

This is a **demonstration interface for an imaginary formwork-rental service**, not a verified company, customer acquisition funnel or operating business. The current page has UI filtering and a client-side price calculation. It **does not submit requests**, store them, provide genuine supplier prices, or substantiate any business activity. The project is an AI-assisted development portfolio case; the repository owner sets requirements, performs product review and authorizes releases, while AI agents may implement code. Nothing here establishes verified revenue, shipping operations, uptime, clients or production traffic.

**Immediate owner-facing warning:** until a later PR fixes the interface, `main` displays misleading claims and fake submission confirmations. Do not use it for real customer enquiries; never enter real names, phone numbers, email addresses or project-sensitive data.

## Source inventory and method

Full GitHub recursive tree was fetched for the actual baseline, with `truncated=false`. Exactly two tracked paths:

| Path | Blob SHA | Size | Finding |
| --- | --- | ---: | --- |
| `README.md` | `07f81f3b73b12b91bbaaf4961d7346dfcccba54f` | 1,150 bytes | Only minimal navigation / Projects HQ links; no build, architecture, demo caveats or QA instructions |
| `index.html` | `f4de153e17370be0ba9c60ffec70cfdf58363a62` | 61,533 bytes | 1,394 lines; HTML plus one embedded CSS block (lines 7–592), one JS block (1188–1390) |

No tracked `package.json`, lockfile, `.github/workflows`, tests, source components, local images, Dockerfile or deploy manifest **in this complete Git tree**. There are no open PRs at audit start. This inventory is about the repository, not assertions about hosting, untracked working copies, other branches or past commits.

**Static scan counts:** 2 `<form>`, 10 `<label>` with 0 `for` attributes, 7 `<img>` referencing external URLs, 6 `href="#"` placeholders, 1 CSS breakpoint (`max-width: 768px`). No `fetch`, `XMLHttpRequest` or `sendBeacon` calls in the inline JS. All non-placeholder anchor fragments discovered by the simple scan correspond to an element ID; this is **not a browser validation**.

Source references use permanent [baseline file links](https://github.com/ruslanudintsev-ai/opalubka/blob/28c1fe9fc8d1aa4817a089dff18a00941fdb39e8/index.html).

## Evidence matrix (fact → source → risk → change → acceptance)

| ID / priority | Confirmed fact and reference | Risk | Proposed repair | How to verify |
| --- | --- | --- | --- | --- |
| F01 · **P0** | `index.html:1065–1088,1339–1350` — contact form calls `preventDefault()`, then says the application was sent; no network/storage | Misleads visitors and solicits PII | Replace with explicitly disabled/non-collecting demo interaction; remove phone/name collection unless independently authorized | Submit/negative E2E asserts **no success claim and no outbound data request** |
| F02 · **P0** | `index.html:1144–1179,1351–1358` — modal similarly displays “sent” and 15-minute callback | False confirmation and fictitious SLA | Rebuild as a demo quote or explanatory dialog without real personal fields | Keyboard+submission tests; network interception should show no PII write |
| F03 · **P0** | `index.html:629–661,673–713,1104–1140` — “leader since 2010”, inventory, regions, fleet, guarantees, 24h shipping etc. without supporting records | Unsubstantiated commercial claims | Replace with “fictional demonstration” context and product capabilities, not performance promises | Static content assertion and manual copy review |
| F04 · **P0** | `index.html:945–1003` — named endorsements, organisations and 5-star layouts without evidence | Fabricated testimonials / trust cues | Remove testimonials; replace with demonstrated project decisions or clearly labeled feature examples | No real-looking Review / AggregateRating data or attributed endorsements |
| F05 · **P0** | `index.html:1033–1062` — example-looking phones, corporate email, addresses, hours | Accidental use of third-party contact info; misleading PII destination | Remove all phone/email/address/hours claims unless verified by owner; show GitHub issue link for software feedback (never collect PII there) | Inspect rendered text, links and network traffic |
| F06 · **P0** | `index.html:918–939,1293–1318` — `priceMap`, `discountMap`, 30-day fixed month, `parseInt` fallbacks, no bounds | Invalid negative, truncated, overflowed or silently coerced quotes | Pure typed quote engine, stated units and 30-day billing periods; explicit demo fixtures and validation | Unit: zero, negatives, huge, fractional, missing, unknown type, months, discount and limits |
| F07 · **P0** | `index.html:937` shows `135 000 ₽`, but default inputs `500 m² × 90 ₽/m²/day × 90 days × 0.9 = 3 645 000 ₽` in inline JS (`1300–1318`) | Initial HTML/JS-disabled mismatch; incorrect quotation | Compute consistently from valid fixtures; show placeholder until valid; explain formula and scope | Browser on first render with and without JS, snapshot of quote |
| F08 · **P1** | `index.html:598,1097,1131–1134` — 6 `href="#"`; handler at `1363–1371` passes `#` to `querySelector` | `SyntaxError` on placeholder link activation | Replace with real local destinations or remove links; safe fragment guards | E2E click all navigation targets and assert no console errors |
| F09 · **P1** | `index.html:918–934,1065–1083,1151–1168` — 10 labels but none has `for`; controls not nested in labels | Weak screen-reader / label click associations | Unique IDs, matching `for`, fieldset/legend where appropriate, inline error links | Axe plus manual screen-reader/keyboard inspection |
| F10 · **P1** | `index.html:616–619,1197–1222` — mobile menu toggles only CSS, no `aria-expanded` or active focus strategy | Menu state not conveyed, keyboard UX uncertain | Semantic nav toggle with `aria-controls`, `aria-expanded`, Esc/focus behaviour | Keyboard and 320/360/390 browser tests |
| F11 · **P1** | `index.html:1144–1181,1320–1336` — modal does close on Escape/overlay, but no `role="dialog"`, labelled dialog, focus movement/trap/restore | Focus can escape dialog, context unclear | Native `<dialog>` when practical or fully accessible dialog behaviour | Focus assertions, Tab cycle, Esc and opener restoration |
| F12 · **P1** | `index.html:518–536` — only `max-width: 768px` breakpoint; animations `1188–1272`, no reduced-motion media rule | Responsive and motion accessibility unknown | Mobile-first layout and reduced-motion styles | Screens 320/360/390/768/1440; prefers-reduced-motion test, overflow |
| F13 · **P1** | `index.html:624,739,762,785,807,829,851` — 7 external images across 4 unique `image.qwenlm.ai` URLs; CSS line 8 imports font via jsDelivr | Unverified reuse rights, asset availability, external requests | Do not copy without rights; replace with own SVG/neutral illustrations, local licensed assets and source attribution | License inventory; no third-party image/font request in browser when migration complete |
| F14 · **P1** | `index.html:729–733,737–866,1274–1291` — tab filter only toggles display; six product cards and three filter categories | Non-semantic filtering and possible inaccessible state announcements | Typed fixtures, accessible filter semantics, empty state and focus policy | All/three filters, keyboard, live region and zero-results tests |
| F15 · **P2** | `README.md:1–12` and complete tree — no documented local setup, test runner, CI or types | Not independently reproducible | P2 strict TS, Vitest, Playwright/axe, GitHub Actions; docs with versions and commands | Fresh clone `npm ci && npm run check && npm test && npm run build` and logged workflow |
| F16 · **P2** | `index.html:4–8` — charset, viewport and title; no meta description or structured content evidence in source | Weak metadata / SEO context; claims might be encoded as fake organization | Factual metadata for **demo**; canonical only for approved real URL; no fictitious ratings | Inspect built HTML/meta and automated assertions |

### Formula defect details

Current function effectively computes `round(parseInt(area) * priceMap[type] * (parseInt(months) * 30) * discountMap[months])` with silent fallbacks. Specific concerns: `0` months becomes `1` via `|| 1`; `-1` months can produce negative totals; `1.9` truncates to 1; unknown type silently becomes wall; discounts after month 6 silently default to 0.85. Business meaning of “month”, VAT, delivery, deposit, accessories, coverage and rounding are **not defined**. A later implementation must declare which of these are included/excluded and never treat demo tariffs as a binding price.

### Images, legal and privacy

- The source uses four distinct remote `image.qwenlm.ai` URLs in seven image positions and one remote font import via `cdn.jsdelivr.net`. **Copyright licenses, permitted redistribution, availability, CORS, tracking implications and accessibility at runtime are unverified.** Do not copy those images into the repository without proof of rights.
- Footer “Реквизиты / Договор / Сертификаты / Политика” are placeholders, not evidence that such documents exist.
- Source has plain-text contact-looking data and real-person-like testimonial names; authenticity is not established. Exclude all of them from future public demo examples rather than repeat them in screenshots or test data.
- No outbound app submission mechanism was found in the tracked inline JS. This does **not** prove data cannot be collected by hosting/CDN analytics, browser extensions, external media services or an uninspected deployment. No historical secret scan, network inspection or hosting audit was executed.
- Do not request new real contact details, store them locally, add analytics or backend calls in P0/P1. **Demo quote should be generated client-side without PII.**

## Verification ledger — P0

| Check | Method | Status |
| --- | --- | --- |
| Fresh HEAD and exact tracked inventory | GitHub branch metadata + recursive tree (`truncated=false`) | **PASS** — 2 files, baseline matches Issue #2 |
| Source sections, suspicious copy, form and calculator path | GitHub file content and line-by-line static inspection | **PASS for inspection**, defects F01–F16 logged |
| Simple anchor ID and external-host inventory | Read-only text-pattern scan of `index.html` | **PASS for static enumeration**, NOT runtime functionality |
| Unit / integration / build / lint | No test, package or workflow in baseline | **NOT RUN / NOT CONFIGURED** |
| 320 / 360 / 390 / 768 / 1440 responsive | No executable browser run against this SHA | **EVIDENCE_GAP** |
| WCAG/axe and keyboard/focus | Source observations only | **EVIDENCE_GAP** |
| Lighthouse / performance / network / asset HTTP status | Not run | **EVIDENCE_GAP** |
| Full image license and secret/history audit | Evidence not available in repository | **EVIDENCE_GAP** |
| CI result for Draft PR | To be checked after PR creation; no workflow in baseline | **NOT CONFIGURED** |

**Reproduction for independent reviewer (once network access/local checkout is available):**

```sh
git clone https://github.com/ruslanudintsev-ai/opalubka.git
cd opalubka
git show 28c1fe9fc8d1aa4817a089dff18a00941fdb39e8:index.html > /tmp/opalubka-p0-baseline.html
git ls-tree -r --name-only 28c1fe9fc8d1aa4817a089dff18a00941fdb39e8
# Baseline is static; serve the file for manual inspection:
python3 -m http.server 8000
```

No tests or CI gates exist in the baseline, so do not report them as green. Re-run the static inspection on PR head, then test actual app behaviour in implementation PRs.

## Implementation order / P0 exit

1. **P0 (this PR):** evidence inventory + ADR, no product-facing changes; independent review of exact commit.
2. **P1a:** clearly mark fictional demo, remove fake claims/contacts/testimonials, non-collecting forms, fix placeholders and basic a11y; preserve navigation.
3. **P1b:** migrate to small Astro/TS components, typed equipment fixtures and local-rights-cleared illustrative assets. Do not add React automatically.
4. **P1c:** transparent deterministic demo calculator, input validation, categorized catalog, print/export demo estimate, unit and browser coverage.
5. **P2:** CI/typecheck/build/lint/Vitest/Playwright/axe, accessibility and performance evidence, bilingual README + architecture/QA/privacy docs; match artifacts to commit SHA.
6. **P3 (optional, **no authorization implied**):** propose read-only fixture API or optional demo preview; separate owner GO before deployment/domains/storage/secrets.

**Review gate:** all PRs against `main`, Draft until independently reviewed; note exact SHA, changed files, check results, gaps and rollback. No merge, deploy, paid service or personal-data collection without specific owner permission.
