# Privacy, data, image provenance and security boundary

## Status and scope

This is a **fictional portfolio demonstration**, not a functioning equipment-rental business, invoice generator or customer-contact system. All five equipment fixtures and all daily rates/discounts are fabricated examples; never use the result for engineering, contracting, purchasing or invoicing.

### Data flow

```text
Static Astro HTML + bundled TypeScript + local fictional catalog
    -> browser-only input (equipment type, area, 30-day demo periods)
    -> pure calculateQuote() (no fetch, no storage)
    -> DOM quote + optional client-side Blob (.txt DEMO estimate)
```

No `<form>`, name, phone number, e-mail, login, order, account, payment, analytics, external images/fonts, backend endpoint, session storage, cookies or database are used by this implementation. Downloaded `opalubka-demo-smeta.txt` contains only selected fixture and numerical parameters and prominently disclaims commercial validity; the user controls the downloaded local file. This statement describes *the checked application code* and exercised local-browser flows, **not** unknown hosting infrastructure, ISP logs, browser extensions, external links or an official privacy audit.

### What leaves the browser?

During Playwright's local-HTTP preview tests, network monitoring forbids any request leaving `127.0.0.1:4321`; the approved GitHub repository/Issue links navigate only after a click. No form data is sent. Browser-generated download uses `Blob` + an object URL and revokes it. No user-identifying values belong in fixtures/tests/screenshots.

### Media and rights

All product/hero drawings in `src/data/illustrations.ts`, `src/components/EquipmentCard.astro` and `src/pages/index.astro` are original concept diagrams authored as code specifically for this demo; they are **not** manufacturer photos, real mounting diagrams or verified load-bearing calculations. No downloaded third-party photographs, logos or customer identities are incorporated. System font stack, CSS color tokens, and Unicode icons do not need remote font/CDN loading. Third-party open-source dependencies (Astro, TypeScript, Playwright, axe) keep their own upstream licenses; the owner has now approved **MIT** in the separate stacked integration Draft PR #6, for owner-controlled project source, docs and original SVG. See repository-root `LICENSE` and `docs/RIGHTS_AND_ASSET_AUDIT.md` (introduced in integration PR #6). This does not relicense third-party dependencies or guarantee copyright ownership of externally supplied material. Whether the changes are merged must be verified in current Git history, not assumed from this document.

### Security and QA limitations

- Automated checks validate generated assets/fragment links, explicit demo language, absence of legacy fake forms and external media, followed by browser smoke for external HTTP requests.
- This is a **static app**, not a substitute for a production security review, HTTP headers/CSP, hosting configuration, privacy notice, consent management or retention policy.
- `npm ci` loads dependency packages from the public npm ecosystem on developer machines and CI; this is build-time installation, **not** runtime requests by users visiting the static preview.
- CI screenshots and reports may be published in PR artifacts. Keep them fictional and never add real customers or secrets in tests or PR comments.
- There is no collection/retention interface to delete because the app does not collect user data. This does **not** guarantee a future hosting provider has no request logs.
- No deploy, DNS, secrets, cloud database or real PII collection without the owner's separate GO.

## Non-goals

No real pricing, business claims, contact funnel, third-party tracking, account registration, AI API, paid integration, customer reviews, certificates, warranty, legal offer, or unverified company details.
