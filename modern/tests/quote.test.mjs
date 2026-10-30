import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateQuote } from '../src/domain/quote.ts';
import { equipment, categories } from '../src/data/catalog.ts';
import { formatDemoEstimate } from '../src/domain/estimate.ts';

test('fixtures: unique IDs, 3+ actual categories, no external media', () => {
  assert.equal(equipment.length, 5);
  assert.equal(new Set(equipment.map(e => e.id)).size, 5);
  assert.ok(new Set(equipment.map(e => e.category)).size >= 3);
  assert.equal(categories[0].id, 'all');
  for (const item of equipment) {
    assert.ok(item.dailyRateRubPerM2 > 0);
    assert.ok(item.name.length > 2);
    assert.ok(!('imageUrl' in item));
  }
});

test('default wall quote agrees with formula and P1a', () => {
  const r = calculateQuote({ equipmentId: 'wall', areaM2: 500, billingPeriods: 3 });
  assert.equal(r.ok, true);
  if (r.ok) {
    assert.equal(r.quote.days, 90);
    assert.equal(r.quote.dailyRateRubPerM2, 90);
    assert.equal(r.quote.discountFactor, 0.90);
    assert.equal(r.quote.totalRub, 3645000);
  }
});

test('each equipment category has a calculated price', () => {
  for (const item of equipment) {
    const r = calculateQuote({ equipmentId: item.id, areaM2: 10, billingPeriods: 1 });
    assert.equal(r.ok, true, item.id);
    if (r.ok) assert.equal(r.quote.totalRub, 10 * item.dailyRateRubPerM2 * 30);
  }
});

test('discount boundaries and integer rounding', () => {
  const defaults = { equipmentId: 'slab', areaM2: 1.01 };
  const expected = new Map([[1,1],[2,.95],[3,.90],[4,.88],[5,.85],[6,.82],[7,.82],[12,.82]]);
  for (const [periods, discount] of expected) {
    const r = calculateQuote({ ...defaults, billingPeriods: periods });
    assert.equal(r.ok, true);
    if (r.ok) {
      assert.equal(r.quote.discountFactor, discount);
      assert.equal(r.quote.totalRub, Math.round(1.01 * 80 * periods * 30 * discount));
    }
  }
});

test('decimal area supports two digits and rejects precision overflow', () => {
  for (const area of ['0.01','1.1','9999.99',10000]) {
    assert.equal(calculateQuote({ equipmentId:'wall', areaM2:area, billingPeriods:1 }).ok,true,String(area));
  }
  for (const area of ['0',0,'-10',-1,'',' ','1.001','10000.01',Infinity,'NaN','1e20']) {
    assert.equal(calculateQuote({ equipmentId:'wall', areaM2:area, billingPeriods:1 }).ok,false,String(area));
  }
});

test('invalid periods and unknown ID cannot create a quote', () => {
  for (const periods of [0,-2,1.5,13,'',' ',Infinity,NaN,'foo']) {
    assert.equal(calculateQuote({equipmentId:'wall',areaM2:5,billingPeriods:periods}).ok,false,String(periods));
  }
  const invalid = calculateQuote({equipmentId:'unlisted',areaM2:5,billingPeriods:2});
  assert.equal(invalid.ok,false);
  if (!invalid.ok) assert.match(invalid.errors.join(' '),/оборудования/);
});

test('input object stays unchanged and there are no external effects', () => {
  const input = Object.freeze({ equipmentId:'volume', areaM2:'45.5', billingPeriods:'2' });
  const first = calculateQuote(input);
  const second = calculateQuote(input);
  assert.deepEqual(first,second);
  assert.equal(input.areaM2,'45.5');
});

test('demo estimate is deterministic, human-readable and PII-free', () => {
  const r = calculateQuote({ equipmentId: 'wall', areaM2: 500, billingPeriods: 3 });
  assert.equal(r.ok, true);
  if (!r.ok) return;
  const text = formatDemoEstimate(r.quote);
  assert.equal(text, formatDemoEstimate(r.quote));
  assert.match(text, /DEMO \/ ДЕМОНСТРАЦИОННЫЙ РАСЧЁТ/);
  assert.match(text, /НЕ КОММЕРЧЕСКАЯ ОФЕРТА/);
  assert.match(text, /3 645 000|3\u00a0645\u00a0000|3\u202f645\u202f000/);
  assert.match(text, /90 ₽ \/ м² \/ сутки/);
  assert.match(text, /Никакие персональные данные не собирались/);
  assert.doesNotMatch(text, /имя клиента|телефон|электронный адрес|к оплате/i);
  assert.doesNotMatch(text, /mailto:|tel:|@example/i);
  assert.equal(text.includes('2026-'), false, 'no volatile timestamp');
});
