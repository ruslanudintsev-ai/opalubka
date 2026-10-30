# P1c on the existing P1b Draft (integration policy)

**Why no new overlapping PR yet:** P1b [Draft PR #5](https://github.com/ruslanudintsev-ai/opalubka/pull/5) is still unmerged and independently reviewable only under `modern/`. A separate P1c branch against `main` would duplicate all of `modern/`, while a stacked PR targeting P1b would violate Issue #2's `base=main` acceptance rule. Therefore P1c's browser-QA and export **proof-of-concept changes will be confined to the same unmerged Draft PR #5**, with explicit commit/SHA and full review required. This does not approve P1b/P1c or replace the root site. Future standalone P1c PRs can be split from an accepted foundation when integration is authorized.

**Scope:** deterministic no-PII text estimate (clearly DEMO), real local browser run on Chromium at 320, 360, 390, 768, 1440; Firefox and WebKit smoke if CI can provide them; axe WCAG 2.1 A/AA; visible DOM/text/privacy and download checks; SHA-named genuine screenshots. All external network calls forbidden in browser, except local HTTP preview. No production, no deploy, no paid API.

**Acceptance:** tests, typecheck, build, `npm ci` with tracked lock, exact workflow run URL and head SHA. Do not claim screen-reader manual inspection, Lighthouse, real-world business operation or SEO traffic from CI. Failure remains a failed test, not a hidden skip.
