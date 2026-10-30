import { calculateQuote, type DemoQuote } from '../domain/quote.ts';
import { formatDemoEstimate } from '../domain/estimate.ts';

const equipmentSelect = document.querySelector<HTMLSelectElement>('#equipment');
const areaInput = document.querySelector<HTMLInputElement>('#area');
const periodInput = document.querySelector<HTMLInputElement>('#periods');
const total = document.querySelector<HTMLOutputElement>('#total');
const breakdown = document.querySelector<HTMLElement>('#breakdown');
const error = document.querySelector<HTMLElement>('#quote-error');
const downloadButton = document.querySelector<HTMLButtonElement>('#download-estimate');
const calculator = document.querySelector<HTMLElement>('#calculator');
const count = document.querySelector<HTMLElement>('#catalog-count');
const filters = [...document.querySelectorAll<HTMLButtonElement>('[data-filter]')];
const cards = [...document.querySelectorAll<HTMLElement>('[data-equipment-category]')];
const chooserButtons = [...document.querySelectorAll<HTMLButtonElement>('[data-select-equipment]')];

const formatter = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 });
const moveBehavior: ScrollBehavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';

if (equipmentSelect && areaInput && periodInput && total && breakdown && error && downloadButton) {
  let currentQuote: DemoQuote | null = null;
  const update = () => {
    const result = calculateQuote({
      equipmentId: equipmentSelect.value,
      areaM2: areaInput.value,
      billingPeriods: periodInput.value,
    });
    areaInput.setAttribute('aria-invalid', String(!result.ok && result.errors.some(message => message.startsWith('Площадь:'))));
    periodInput.setAttribute('aria-invalid', String(!result.ok && result.errors.some(message => message.startsWith('Срок:'))));
    currentQuote = result.ok ? result.quote : null;
    downloadButton.disabled = !result.ok;
    if (!result.ok) {
      total.textContent = '—';
      breakdown.textContent = 'Расчёт не выполнен.';
      error.textContent = result.errors.join(' ');
      return;
    }
    areaInput.setAttribute('aria-invalid', 'false');
    periodInput.setAttribute('aria-invalid', 'false');
    error.textContent = '';
    const q = result.quote;
    total.textContent = formatter.format(q.totalRub) + ' ₽';
    breakdown.textContent = `${q.areaM2.toLocaleString('ru-RU')} м² × ${q.dailyRateRubPerM2} ₽/м²/сутки × ${q.days} дней × ${q.discountFactor.toLocaleString('ru-RU')} = ${formatter.format(q.totalRub)} ₽. Учебные тарифы.`;
  };

  equipmentSelect.addEventListener('change', update);
  areaInput.addEventListener('input', update);
  periodInput.addEventListener('input', update);
  update();

  downloadButton.addEventListener('click', () => {
    if (!currentQuote) return;
    const contents = formatDemoEstimate(currentQuote);
    const blob = new Blob(['\uFEFF', contents], { type: 'text/plain;charset=utf-8' });
    const temporaryUrl = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = temporaryUrl;
    anchor.download = 'opalubka-demo-smeta.txt';
    anchor.hidden = true;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(temporaryUrl), 1000);
  });

  chooserButtons.forEach(button => {
    button.addEventListener('click', () => {
      const id = button.dataset.selectEquipment;
      if (!id) return;
      equipmentSelect.value = id;
      update();
      calculator?.scrollIntoView({ behavior: moveBehavior, block: 'start' });
      equipmentSelect.focus({ preventScroll: true });
    });
  });
}
filters.forEach(button => button.addEventListener('click', () => {
  const category = button.dataset.filter;
  filters.forEach(filter => {
    const selected = filter === button;
    filter.classList.toggle('active', selected);
    filter.setAttribute('aria-pressed', String(selected));
  });
  cards.forEach(card => { card.hidden = category !== 'all' && card.dataset.equipmentCategory !== category; });
  if (count) count.textContent = `${cards.filter(card => !card.hidden).length} / ${cards.length}`;
}));
