import { equipment, type EquipmentId } from '../data/catalog.ts';

export interface QuoteInput {
  equipmentId: string;
  areaM2: string | number;
  billingPeriods: string | number;
}
export interface DemoQuote {
  equipmentId: EquipmentId;
  areaM2: number;
  billingPeriods: number;
  days: number;
  dailyRateRubPerM2: number;
  discountFactor: number;
  totalRub: number;
}
export type QuoteResult = { ok: true; quote: DemoQuote } | { ok: false; errors: readonly string[] };
const rates = new Map<string, number>(equipment.map(item => [item.id, item.dailyRateRubPerM2]));
const discounts = [1, 0.95, 0.9, 0.88, 0.85] as const;

/** Pure, bounded and deterministic demo quote; NOT real price or offer. */
export function calculateQuote(input: QuoteInput): QuoteResult {
  const errors: string[] = [];
  const id = input.equipmentId;
  const rate = rates.get(id);
  if (rate === undefined) errors.push('Выберите существующий пример оборудования.');
  const areaText = String(input.areaM2).trim();
  const periodText = String(input.billingPeriods).trim();
  const area = Number(areaText);
  const periods = Number(periodText);
  if (!areaText || !Number.isFinite(area) || area < 0.01 || area > 10000 ||
      Math.abs(Math.round(area * 100) - area * 100) > 1e-7) {
    errors.push('Площадь: от 0,01 до 10 000 м², не более двух знаков после запятой.');
  }
  if (!periodText || !Number.isSafeInteger(periods) || periods < 1 || periods > 12) {
    errors.push('Срок: целое число условных 30-дневных периодов от 1 до 12.');
  }
  if (errors.length || rate === undefined) return { ok: false, errors };
  const typedId = id as EquipmentId; // justified by lookup in typed fixtures above
  const days = periods * 30;
  const discountFactor = discounts[periods - 1] ?? 0.82;
  return {
    ok: true,
    quote: {
      equipmentId: typedId, areaM2: area, billingPeriods: periods,
      days, dailyRateRubPerM2: rate, discountFactor,
      totalRub: Math.round(area * rate * days * discountFactor),
    },
  };
}
