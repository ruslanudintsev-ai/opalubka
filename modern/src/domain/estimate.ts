import { equipment } from '../data/catalog.ts';
import type { DemoQuote } from './quote.ts';

/**
 * UTF-8 plain text only; deterministic and deliberately contains no PII.
 * Not an invoice, quotation from a real supplier, engineering calculation or offer.
 */
export function formatDemoEstimate(quote: DemoQuote): string {
  const fixture = equipment.find(item => item.id === quote.equipmentId);
  if (!fixture) throw new Error('Неизвестный учебный тип оборудования.');
  const fmt = (value: number) => value.toLocaleString('ru-RU', { maximumFractionDigits: 2 });
  return [
    'ОПАЛУБКА / LAB',
    'DEMO / ДЕМОНСТРАЦИОННЫЙ РАСЧЁТ',
    'НЕ КОММЕРЧЕСКАЯ ОФЕРТА. НЕ СЧЁТ. НЕ ДОГОВОР.',
    '',
    'Тип: ' + fixture.name + ' (вымышленный пример)',
    'Площадь: ' + fmt(quote.areaM2) + ' м²',
    'Тариф: ' + fmt(quote.dailyRateRubPerM2) + ' ₽ / м² / сутки (демо)',
    'Периоды: ' + quote.billingPeriods + ' × 30 дней = ' + quote.days + ' дней',
    'Условная скидка: ' + fmt(Math.round((1 - quote.discountFactor) * 100)) + '%',
    'Формула: площадь × тариф × дни × коэффициент скидки',
    'Итого: ' + fmt(quote.totalRub) + ' ₽ (DEMO)',
    '',
    'Тарифы и характеристики вымышлены. Не включены НДС,',
    'доставка, залог, монтаж и комплектующие.',
    'Никакие персональные данные не собирались и не отправлялись.',
    'Источник: github.com/ruslanudintsev-ai/opalubka',
    '',
  ].join('\n');
}
