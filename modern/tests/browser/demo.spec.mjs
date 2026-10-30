import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdirSync } from 'node:fs';
import path from 'node:path';

const WIDTHS = [320, 360, 390, 768, 1440];
const expectedOrigin = 'http://127.0.0.1:4321';

function collectFailures(page) {
  const issues = [];
  page.on('pageerror', error => issues.push('Page JS error: ' + error.message));
  page.on('console', message => {
    if (message.type() === 'error') issues.push('Console error: ' + message.text());
  });
  page.on('request', request => {
    if (new URL(request.url()).origin !== expectedOrigin) issues.push('Unexpected remote request: ' + request.url());
  });
  return issues;
}

test('responsive: 320/360/390/768/1440, real screenshots and no horizontal overflow', async ({ page, browserName }) => {
  test.skip(browserName !== 'chromium', 'Five-viewpoint screenshot evidence is captured on Chromium; other engines get smoke checks.');
  const issues = collectFailures(page);
  const dir = path.join('test-results', 'screenshots');
  mkdirSync(dir, { recursive: true });
  for (const width of WIDTHS) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await expect(page.locator('#total')).toContainText('3');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    const overflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      viewportWidth: document.documentElement.clientWidth,
    }));
    expect(overflow.scrollWidth, 'horizontal overflow at ' + width).toBeLessThanOrEqual(overflow.viewportWidth + 1);
    const sha = (process.env.SOURCE_SHA ?? process.env.GITHUB_SHA ?? 'local').slice(0, 12);
    await page.screenshot({ path: path.join(dir, sha + '-chromium-' + width + '.png'), fullPage: true, animations: 'disabled' });
  }
  expect(issues).toEqual([]);
});

test('catalog keyboard activation, filters and quote selection', async ({ page }) => {
  const issues = collectFailures(page);
  await page.goto('/');
  const cards = page.locator('.equipment-card:visible');
  await expect(cards).toHaveCount(5);
  await page.getByRole('button', { name: 'Перекрытия' }).click();
  await expect(cards).toHaveCount(1);
  await expect(page.getByRole('button', { name: 'Перекрытия' })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Все решения' }).click();
  await expect(cards).toHaveCount(5);
  const choose = page.getByRole('button', { name: 'Выбрать Колонная для демо-расчёта' });
  await choose.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#equipment')).toHaveValue('column');
  await expect(page.locator('#total')).toContainText('4');
  await expect(page.locator('#equipment')).toBeFocused();
  expect(issues).toEqual([]);
});

test('calculation validity, no mock success and offline DEMO estimate download', async ({ page }) => {
  const issues = collectFailures(page);
  await page.goto('/');
  const total = page.locator('#total');
  const area = page.locator('#area');
  const periods = page.locator('#periods');
  const downloadButton = page.locator('#download-estimate');
  await expect(total).toContainText('3');
  await expect(downloadButton).toBeEnabled();
  await area.fill('0');
  await expect(total).toHaveText('—');
  await expect(area).toHaveAttribute('aria-invalid', 'true');
  await expect(downloadButton).toBeDisabled();
  await area.fill('1.234');
  await expect(total).toHaveText('—');
  await area.fill('20.5');
  await expect(area).toHaveAttribute('aria-invalid', 'false');
  await periods.fill('1.5');
  await expect(total).toHaveText('—');
  await expect(periods).toHaveAttribute('aria-invalid', 'true');
  await periods.fill('3');
  await expect(downloadButton).toBeEnabled();
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    downloadButton.click(),
  ]);
  expect(download.suggestedFilename()).toBe('opalubka-demo-smeta.txt');
  const stream = await download.createReadStream();
  const chunks = [];
  for await (const chunk of stream) chunks.push(chunk);
  const data = Buffer.concat(chunks).toString('utf8');
  expect(data).toContain('DEMO / ДЕМОНСТРАЦИОННЫЙ РАСЧЁТ');
  expect(data).toContain('НЕ КОММЕРЧЕСКАЯ ОФЕРТА');
  expect(data).toContain('20,5 м²');
  expect(data).toContain('Никакие персональные данные не собирались');
  expect(data).not.toMatch(/Заявка отправлена|Иван Иванов|info@opalubka|\+7 \(\d{3}\)/);
  expect(await page.locator('form').count()).toBe(0);
  expect(issues).toEqual([]);
});

test('axe WCAG 2.1 A/AA and semantic names on real rendered page', async ({ page }) => {
  const issues = collectFailures(page);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'К основному содержимому' })).toHaveCount(1);
  await expect(page.getByLabel('Площадь, м²')).toHaveCount(1);
  await expect(page.getByLabel('Срок, 30-дневных периодов')).toHaveCount(1);
  const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
  expect(result.violations, JSON.stringify(result.violations.map(v => ({
    id: v.id, impact: v.impact, description: v.description,
    nodes: v.nodes.map(n => n.target).slice(0, 7),
  })), null, 2)).toEqual([]);
  expect(issues).toEqual([]);
});

test('reduced motion and no third-party network writes', async ({ page }) => {
  const issues = collectFailures(page);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const behavior = await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior);
  expect(behavior).toBe('auto');
  await page.getByRole('button', { name: 'Специальные' }).click();
  await expect(page.locator('.equipment-card:visible')).toHaveCount(2);
  expect(issues).toEqual([]);
});

test('each fixture has its own original schematic and mobile labels stay readable', async ({ page }) => {
  const issues = collectFailures(page);
  for (const width of [320, 360, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const diagrams = await page.locator('svg.tech-drawing').evaluateAll(nodes =>
      nodes.map(node => ({
        kind: node.getAttribute('data-illustration'),
        paths: [...node.querySelectorAll('path')].map(p => p.getAttribute('d')).join(' / '),
        hidden: node.getAttribute('aria-hidden'),
      }))
    );
    expect(diagrams).toHaveLength(5);
    expect(new Set(diagrams.map(d => d.kind)).size).toBe(5);
    expect(new Set(diagrams.map(d => d.paths)).size, 'repeated product drawings').toBe(5);
    expect(diagrams.every(d => d.hidden === 'true')).toBe(true);
    for (const selector of ['.hero-proof', '.equipment-kicker', '.equipment-rate span', '.visual-label', '.filter-button', '.policy']) {
      const pixels = await page.locator(selector).first().evaluate(el => parseFloat(getComputedStyle(el).fontSize));
      expect(pixels, selector + ' font-size at ' + width).toBeGreaterThanOrEqual(12);
    }
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, 'horizontal overflow at ' + width).toBeLessThanOrEqual(1);
  }
  expect(issues).toEqual([]);
});
