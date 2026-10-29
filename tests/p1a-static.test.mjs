import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { Script, createContext } from 'node:vm';

// Dependency-free, offline tests for the P1a static demo.
// They do NOT replace real Playwright/axe/viewport/assistive-tech QA.
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const scriptMatches = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
const script = scriptMatches[0]?.[1] ?? '';

function fakeElement(id, { tagName = 'DIV', value = '', dataset = {} } = {}) {
  const handlers = {};
  const attributes = {};
  const classes = new Set();
  return {
    id, value, tagName, dataset, handlers, attributes, classes,
    hidden: false, textContent: '', focused: false, scrolled: false,
    classList: {
      add(name) { classes.add(name); },
      toggle(name, force) {
        const on = force === undefined ? !classes.has(name) : force;
        if (on) classes.add(name);
        else classes.delete(name);
        return on;
      }
    },
    addEventListener(event, handler) { handlers[event] = handler; },
    setAttribute(name, value) { attributes[name] = String(value); },
    getAttribute(name) { return attributes[name] ?? null; },
    focus() { this.focused = true; },
    scrollIntoView() { this.scrolled = true; },
    querySelectorAll() { return []; }
  };
}

function harness() {
  const ids = {};
  for (const id of [
    'navbar', 'scrollTop', 'burger', 'navLinks', 'calcType', 'calcArea',
    'calcMonths', 'calcTotal', 'calcBreakdown', 'calcError',
    'catalogCount', 'calculator'
  ]) ids[id] = fakeElement(id);
  ids.calcType = fakeElement('calcType', { tagName: 'SELECT', value: 'wall' });
  ids.calcArea = fakeElement('calcArea', { tagName: 'INPUT', value: '500' });
  ids.calcMonths = fakeElement('calcMonths', { tagName: 'INPUT', value: '3' });
  const filters = ['all', 'wall', 'column', 'slab', 'large', 'volume'].map(type =>
    fakeElement('filter-' + type, { dataset: { filter: type } })
  );
  const cards = ['wall', 'column', 'slab', 'large', 'volume'].map(type =>
    fakeElement('card-' + type, { dataset: { type } })
  );
  const buttons = cards.map(card => fakeElement('button-' + card.dataset.type, {
    dataset: { quoteType: card.dataset.type }
  }));
  ids.navLinks.querySelectorAll = () => [fakeElement('nav1'), fakeElement('nav2')];
  const documentHandlers = {};
  const document = {
    getElementById(id) { assert.ok(ids[id], 'missing mock ID: ' + id); return ids[id]; },
    querySelectorAll(selector) {
      if (selector === '.catalog-tab') return filters;
      if (selector === '.product-card') return cards;
      if (selector === '[data-quote-type]') return buttons;
      if (selector === '.reveal') return [];
      throw new Error('Unexpected selector: ' + selector);
    },
    addEventListener(event, callback) { documentHandlers[event] = callback; }
  };
  let outgoing = 0;
  const window = {
    matchMedia() { return { matches: false, addEventListener() {} }; },
    addEventListener() {},
    scrollY: 0,
    scrollTo() {},
    fetch() { outgoing++; throw new Error('Remote request forbidden'); }
  };
  const context = createContext({ document, window, console, Intl });
  new Script(script, { filename: 'index-inline.js' }).runInContext(context, { timeout: 1000 });
  const input = (id, value) => {
    ids[id].value = value;
    ids[id].handlers.input();
  };
  return { ids, cards, filters, buttons, documentHandlers, input, get outgoing() { return outgoing; } };
}

function numericResult(text) {
  // Russian NBSP/narrow NBSP/group separators should not affect integer assertion.
  return Number(text.split('₽')[0].replace(/[^0-9]/g, ''));
}

test('HTML carries an honest no-PII demo contract and no external media', () => {
  assert.equal(scriptMatches.length, 1, 'exactly one inline script');
  assert.equal((html.match(/<\/script>/g) ?? []).length, 1);
  assert.doesNotMatch(html, /<form\b|<input[^>]+type=["'](?:tel|email|text)["']/i);
  assert.doesNotMatch(html, /Заявка отправлена|Отправить заявку|мы перезвоним/i);
  assert.doesNotMatch(html, /image\.qwenlm\.ai|cdn\.jsdelivr\.net|fonts\.googleapis\.com/);
  assert.doesNotMatch(html, /<img\b|href=["']#["']/i);
  assert.doesNotMatch(html, /50\s?000|1200\+|Лидер рынка с 2010|Алексей Козлов|Марина Соколова|Дмитрий Волков/i);
  assert.match(html, /вымышленные данные/i);
  assert.match(html, /не коммерческая оферта/i);
  assert.match(html, /Не публикуйте там телефоны/i);
});

test('static structure and navigation targets are internally consistent', () => {
  const count = part => html.split(part).length - 1;
  assert.equal(count('<main '), 1);
  assert.equal(count('</main>'), 1);
  assert.equal(count('<section '), count('</section>'));
  assert.equal(count('<header>'), count('</header>'));
  assert.equal(count('<footer '), count('</footer>'));
  assert.match(html, /aria-expanded="false"/);
  assert.match(html, /aria-controls="navLinks"/);
  assert.match(html, /prefers-reduced-motion:\s*reduce/);
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]));
  for (const match of html.matchAll(/href="#([^"]+)"/g)) {
    assert.ok(ids.has(match[1]), 'broken fragment: #' + match[1]);
  }
  const labels = [...html.matchAll(/<label\s+for="([^"]+)"/g)].map(m => m[1]);
  assert.equal(labels.length, 3);
  for (const id of labels) assert.ok(ids.has(id), 'label without matching control: ' + id);
  assert.equal((html.match(/class="product-card reveal"/g) ?? []).length, 5);
  assert.equal((html.match(/data-quote-type="/g) ?? []).length, 5);
});

test('quotes: deterministic first render, periods, switches and discount boundary', () => {
  const h = harness();
  assert.equal(numericResult(h.ids.calcTotal.textContent), 3645000); // 500×90×90×0.9
  h.input('calcMonths', '1');
  assert.equal(numericResult(h.ids.calcTotal.textContent), 1350000);
  h.input('calcMonths', '6');
  assert.equal(numericResult(h.ids.calcTotal.textContent), 500 * 90 * 180 * 0.82);
  h.input('calcMonths', '7');
  assert.equal(numericResult(h.ids.calcTotal.textContent), 500 * 90 * 210 * 0.82);
  h.input('calcMonths', '3');
  h.ids.calcType.value = 'column';
  h.ids.calcType.handlers.change();
  assert.equal(numericResult(h.ids.calcTotal.textContent), 4860000);
  h.buttons[4].handlers.click();
  assert.equal(h.ids.calcType.value, 'volume');
  assert.equal(numericResult(h.ids.calcTotal.textContent), 4050000);
  assert.ok(h.ids.calculator.scrolled);
  assert.ok(h.ids.calcType.focused);
  assert.equal(h.outgoing, 0);
});

test('invalid quote inputs cannot produce a monetary result', () => {
  for (const badArea of ['', '0', '-1', '10000.01', '1.234', 'Infinity']) {
    const h = harness();
    h.input('calcArea', badArea);
    assert.equal(h.ids.calcTotal.textContent, '—', 'area: ' + badArea);
    assert.equal(h.ids.calcArea.attributes['aria-invalid'], 'true');
    assert.match(h.ids.calcError.textContent, /Проверьте площадь/);
  }
  for (const badMonths of ['', '0', '-3', '1.5', '13', '1000000000']) {
    const h = harness();
    h.input('calcMonths', badMonths);
    assert.equal(h.ids.calcTotal.textContent, '—', 'periods: ' + badMonths);
  }
  const valid = harness();
  valid.input('calcArea', '0.01');
  assert.equal(numericResult(valid.ids.calcTotal.textContent), 73); // 0.01×90×90×0.9=72.9 -> 73
  const decimal = harness();
  decimal.input('calcArea', '1.1');
  assert.equal(numericResult(decimal.ids.calcTotal.textContent), 8019);
  const unknown = harness();
  unknown.ids.calcType.value = 'unknown';
  unknown.ids.calcType.handlers.change();
  assert.equal(unknown.ids.calcTotal.textContent, '—');
});

test('filters, menu accessibility and Escape are actionable without network', () => {
  const h = harness();
  assert.equal(h.ids.burger.attributes['aria-expanded'], undefined);
  h.ids.burger.handlers.click();
  assert.equal(h.ids.burger.attributes['aria-expanded'], 'true');
  h.documentHandlers.keydown({ key: 'Escape' });
  assert.equal(h.ids.burger.attributes['aria-expanded'], 'false');
  assert.equal(h.ids.burger.focused, true);
  h.filters[3].handlers.click();
  assert.deepEqual(h.cards.map(c => c.hidden), [true, true, false, true, true]);
  assert.equal(h.filters[3].attributes['aria-pressed'], 'true');
  assert.equal(h.ids.catalogCount.textContent, 'Показано карточек: 1');
  h.filters[0].handlers.click();
  assert.equal(h.cards.filter(c => c.hidden).length, 0);
  assert.equal(h.outgoing, 0);
});
