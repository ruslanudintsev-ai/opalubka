/**
 * Completely fictional portfolio demo fixtures.
 * Not an inventory, equipment spec, safety rating, availability or market rate.
 * No third-party media or real customer/contact records.
 */
export type EquipmentId = 'wall' | 'column' | 'slab' | 'large' | 'volume';
export type EquipmentCategory = 'vertical' | 'horizontal' | 'special';

export interface Equipment {
  readonly id: EquipmentId;
  readonly category: EquipmentCategory;
  readonly name: string;
  readonly subtitle: string;
  readonly dailyRateRubPerM2: number;
  readonly badge: string;
}

export const equipment = [
  { id: 'wall', category: 'vertical', name: 'Стеновая', subtitle: 'Иллюстрация стеновых щитов', dailyRateRubPerM2: 90, badge: 'Модульная' },
  { id: 'column', category: 'vertical', name: 'Колонная', subtitle: 'Иллюстрация колонных секций', dailyRateRubPerM2: 120, badge: 'Секционная' },
  { id: 'slab', category: 'horizontal', name: 'Перекрытий', subtitle: 'Иллюстрация опор и балок', dailyRateRubPerM2: 80, badge: 'Опорная' },
  { id: 'large', category: 'special', name: 'Крупнощитовая', subtitle: 'Иллюстрация крупного щита', dailyRateRubPerM2: 110, badge: 'Крупная' },
  { id: 'volume', category: 'special', name: 'Объёмная', subtitle: 'Иллюстрация пространственной рамы', dailyRateRubPerM2: 100, badge: 'Рамная' },
] as const satisfies readonly Equipment[];

export const categories = [
  { id: 'all', label: 'Все решения' },
  { id: 'vertical', label: 'Вертикальные' },
  { id: 'horizontal', label: 'Перекрытия' },
  { id: 'special', label: 'Специальные' },
] as const;
