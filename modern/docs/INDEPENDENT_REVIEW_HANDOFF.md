# Independent review handoff — Opalubka release candidate

**Review target:** [Draft PR #5](https://github.com/ruslanudintsev-ai/opalubka/pull/5), **latest exact HEAD SHA** (read GitHub immediately before reviewing). This document is a request for a **different reviewer/agent**; it does **not** itself constitute independent approval.

## Copy/paste reviewer task (Russian)

> Проведи **независимый** security, architecture, UX, a11y, QA и release-readiness аудит публичного `ruslanudintsev-ai/opalubka`, Draft PR #5, только по **актуальному SHA его HEAD**. Не доверяй статусным комментариям разработчика: заново прочитай дерево, PR diff, `modern/`, workflow и их реальные логи. Подтверди отдельно реальные `npm ci`, `astro check`, Node-тесты, `check:artifact`, Playwright Chromium/Firefox/WebKit, axe, npm audit, Lighthouse mobile/desktop и **actual static dist artifact** на одном точном SHA. Проверь фиктивность данных/тарифов, отсутствие заявок/PII/секретов и внешних медиа/запросов, происхождение изображений и лицензии, отзывчивость 320/360/390/768/1440, UX калькулятора, доступные имена/фокус/валидацию и корректность `README.md` в корне. Укажи ссылку на **реально просмотренные** скриншоты, если открывал их. Оцени, что произойдёт при слиянии: будет ли `main/index.html` продолжать показывать старый сайт и что точно является статическим корнем публикации? Не выполняй merge/deploy, не меняй DNS, GitHub Pages, Cloudflare, секреты, API, платежи и профиль. Запиши замечания в GitHub PR #5 с **точными файлами/строками/SHA**, степенью риска, воспроизведением и предложенным исправлением. Явно раздели PASS, FAIL, NOT VERIFIED и владельческие решения; не объявляй выпуск одобренным, если остаются blocking gaps.

## Checklist for independent reviewer

- [ ] Source HEAD matches latest PR branch and all cited CI checks/preview artifact SHA, not GitHub synthetic merge SHA.
- [ ] Source and root README facts do not mistake old root index or static artifact for published website.
- [ ] Built `dist/index.html` contains no false submission, form, fake customer contacts/testimonials, third-party tracking, unapproved remote images, or implied real rental offer.
- [ ] Calculator and text estimate produce identical predictable results and handle 0, negative, fractional, empty, huge and 12-period extremes.
- [ ] Unit/static and browser/axe/Lighthouse reports read from actual CI logs and artifacts. Distinguish 2 intentional screenshot skips on Firefox/WebKit.
- [ ] Actual Chromium screenshots on five widths reviewed by a **different** agent/human where possible; capture findings, not just “looks good”.
- [ ] Manual keyboard-only and screen-reader UX audited if possible; if unavailable, explicitly mark EVIDENCE_GAP rather than claim compliance.
- [ ] Dependencies and use of npm advisory feed reviewed; licenses for project source and original drawings require owner choice.
- [ ] Static release asset paths tested against intended hosting base, no accidental root legacy HTML. Check no production deployment target was modified.
- [ ] Alternate P1a PR #4 and P0 PR #3 reconciled without blindly merging competing implementations.
- [ ] Verdict: **APPROVE_CANDIDATE**, **CHANGES_REQUESTED**, or **BLOCKED_BY_EVIDENCE** with date, exact head SHA and reviewer identity.

## Handoff/status template (post to GitHub PR #5)

```text
INDEPENDENT_REVIEW: APPROVE_CANDIDATE | CHANGES_REQUESTED | BLOCKED_BY_EVIDENCE
PR #5 HEAD: <full SHA>
Checked workflows: <run IDs and source SHA match>
Actual artifact checked: <link, type; mark NOT_VIEWED if not inspected>
Findings:
- [severity] path:line — evidence — reproduction — corrective action
Not verified: <exact evidence gaps>
Merge/deploy permission: NOT GRANTED by review itself
Reviewer: <real account / agent identity>
```

## Owner decision remains separate

After all objective blockers are resolved and an external reviewer signs off, owner must explicitly choose whether to merge and where/when to serve **only the compiled Astro dist**. Until that decision, Draft PR #5, root legacy page, hosting and public profile remain unchanged. An implementer's own assessment is a **self-review**, not an independent review.
