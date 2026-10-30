import { test, expect } from '@playwright/test';

const root = 'http://127.0.0.1:8766';
const prefix = '/opalubka/';

test('subpath smoke: HTML, CSS, JS and favicon all resolve under /opalubka/', async ({ page, request }) => {
  const problems = [];
  const requestUrls = [];
  page.on('pageerror', error => problems.push('JS: ' + error.message));
  page.on('console', entry => { if (entry.type() === 'error') problems.push('Console: ' + entry.text()); });
  page.on('response', response => {
    requestUrls.push(response.url());
    if (response.status() >= 400) problems.push('HTTP ' + response.status() + ' ' + response.url());
  });
  page.on('request', req => {
    if (!req.url().startsWith(root + prefix)) problems.push('Escaped host/base: ' + req.url());
  });
  const response = await page.goto('./');
  expect(response?.status()).toBe(200);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.locator('#total')).toContainText('3');
  const href = await page.locator('link[rel="icon"]').getAttribute('href');
  expect(href).toBe('/opalubka/favicon.svg');
  const icon = await request.get(root + href);
  expect(icon.status()).toBe(200);
  expect(await icon.text()).toContain('<svg');
  const resources = await page.locator('link[rel="stylesheet"],script[src]').evaluateAll(nodes =>
    nodes.map(node => node.getAttribute('href') || node.getAttribute('src')));
  expect(resources.some(link => link.endsWith('.css'))).toBe(true);
  expect(resources.some(link => link.endsWith('.js'))).toBe(true);
  expect(resources.every(link => link.startsWith(prefix))).toBe(true);
  expect(requestUrls.some(url => url.includes('/opalubka/_astro/') && url.endsWith('.css'))).toBe(true);
  expect(requestUrls.some(url => url.includes('/opalubka/_astro/') && url.endsWith('.js'))).toBe(true);
  expect(problems).toEqual([]);
});

test('subpath navigation, filters, quote and download retain full functionality', async ({ page }) => {
  await page.goto('./');
  const catalog = page.getByRole('link', { name: 'Каталог', exact: true });
  await catalog.click();
  await expect(page).toHaveURL(/\/opalubka\/#catalog$/);
  await page.getByRole('button', { name: 'Перекрытия' }).click();
  await expect(page.locator('.equipment-card:visible')).toHaveCount(1);
  await page.getByRole('button', { name: 'Все решения' }).click();
  await expect(page.locator('.equipment-card:visible')).toHaveCount(5);
  await page.getByRole('button', { name: 'Выбрать Колонная для демо-расчёта' }).click();
  await expect(page.locator('#equipment')).toHaveValue('column');
  const download = page.waitForEvent('download');
  await page.locator('#download-estimate').click();
  const file = await download;
  expect(file.suggestedFilename()).toBe('opalubka-demo-smeta.txt');
  const stream = await file.createReadStream();
  const chunks = [];
  for await (const item of stream) chunks.push(item);
  expect(Buffer.concat(chunks).toString('utf8')).toContain('НЕ КОММЕРЧЕСКАЯ ОФЕРТА');
});
