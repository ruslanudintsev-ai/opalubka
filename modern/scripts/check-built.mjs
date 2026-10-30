/**
 * Static output integrity contract — checks the built distribution, not just source.
 * Free, deterministic and offline. Not a substitute for Playwright or manual QA.
 */
import { existsSync, readFileSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { normalizeBasePath, resolveBuiltAsset } from './asset-paths.mjs';

const dist = resolve('dist');
const base = normalizeBasePath(process.env.DEMO_BASE_PATH || '/');
const file = join(dist, 'index.html');
if (!existsSync(file)) throw new Error('dist/index.html missing: run npm run build first');
const html = readFileSync(file, 'utf8');
const failures = [];

function requireCondition(condition, message) {
  if (!condition) failures.push(message);
}

requireCondition(/<html[^>]*\blang="ru"/i.test(html), 'missing Russian HTML lang');
requireCondition((html.match(/<h1(?:\s|>)/gi) ?? []).length === 1, 'exactly one H1 required');
requireCondition(/<title>[^<]{12,}<\/title>/i.test(html), 'missing useful title');
requireCondition(/<meta\s+name="description"/i.test(html), 'missing meta description');
requireCondition(html.includes('DEMO') && html.includes('НЕ КОММЕРЧЕСКИЙ'), 'missing visible fictional-demo notice');
requireCondition(!/<form(?:\s|>)/i.test(html), 'form found; no contact form is permitted');
requireCondition(!/Заявка отправлена|Подать заявку|Отправить заявку/i.test(html), 'false submission copy found');
requireCondition(!/image\.qwenlm\.ai|cdn\.jsdelivr\.net|fonts\.googleapis\.com|googletagmanager|google-analytics/i.test(html), 'external unapproved asset or tracking found');

const ids = [...html.matchAll(/\bid=["']([^"']+)["']/g)].map(match => match[1]);
const allIds = new Set(ids);
requireCondition(allIds.size === ids.length, 'duplicate IDs found');
let internalLinks = 0;
for (const match of html.matchAll(/\bhref=["']#([^"']*)["']/g)) {
  internalLinks++;
  requireCondition(!!match[1] && allIds.has(match[1]), 'broken anchor href="#' + match[1] + '"');
}
requireCondition(internalLinks >= 5, 'internal navigation missing');

const assets = [];
for (const match of html.matchAll(/<(?:script|link|img)\b[^>]*\b(?:src|href)=["']([^"']+)["']/gi)) {
  const source = match[1];
  if (source.startsWith('#')) continue;
  if (/^https?:\/\//.test(source) || source.startsWith('//')) {
    failures.push('remote script/style/image: ' + source);
    continue;
  }
  if (source.startsWith('data:')) {
    failures.push('unreviewed data asset: ' + source.slice(0, 24));
    continue;
  }
  try {
    const asset = resolveBuiltAsset(dist, source, base);
    requireCondition(existsSync(asset) && statSync(asset).isFile(),
      'built asset missing: ' + source);
    assets.push(source);
  } catch (error) {
    failures.push(error.message);
  }
}
requireCondition(assets.some(x => /\.js(?:[?#]|$)/.test(x)), 'JS bundle missing');
requireCondition(assets.some(x => /\.css(?:[?#]|$)/.test(x)), 'CSS bundle missing');

if (failures.length) {
  for (const failure of failures) console.error('FAIL: ' + failure);
  process.exitCode = 1;
} else {
  console.log('BUILD_INTEGRITY_PASS: single H1, semantic page, ' + internalLinks +
    ' valid hash links, ' + assets.length + ' existing local assets, base=' + base + ', DEMO/no forms/no remote media');
}
