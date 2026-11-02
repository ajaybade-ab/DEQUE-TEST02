import { uniqueId } from './utils.js';

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const CHEVRON = (d) => `<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="${d}" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`;
const PREV_ICON = CHEVRON('M10 3 5 8l5 5');
const NEXT_ICON = CHEVRON('m6 3 5 5-5 5');

const pad2 = (n) => String(n).padStart(2, '0');
const toIso = (d) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
const fromIso = (iso) => {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
};
const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const longLabel = (d) => d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
const shortLabel = (iso) => fromIso(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
const monthLabel = (d) => d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

// Date range picker. month: 'YYYY-MM'; start/end: 'YYYY-MM-DD' or null.
// Accessible: grid with roving tabindex, arrow/Home/End/PageUp/PageDown keys, named buttons, live status.
// Inaccessible: unnamed icon controls, day cells are non-focusable divs, low-contrast weekday labels.
export function DatePicker({ month = '2026-08', start = null, end = null, label = 'Travel dates', accessible = true } = {}) {
  const state = { view: fromIso(`${month}-01`), start, end, focus: start ?? `${month}-01` };
  const root = document.createElement('div');
  root.className = accessible ? 'c-datepicker' : 'c-datepicker c-datepicker--broken';

  const labelId = uniqueId('dp-label');
  const monthId = uniqueId('dp-month');
  if (accessible) {
    root.setAttribute('role', 'group');
    root.setAttribute('aria-labelledby', labelId);
    root.innerHTML = `
      <p class="c-datepicker__label" id="${labelId}">${label}</p>
      <div class="c-datepicker__header">
        <button type="button" class="c-datepicker__nav" data-nav="-1" aria-label="Previous month">${PREV_ICON}</button>
        <h2 class="c-datepicker__month" id="${monthId}" aria-live="polite"></h2>
        <button type="button" class="c-datepicker__nav" data-nav="1" aria-label="Next month">${NEXT_ICON}</button>
      </div>
      <table role="grid" class="c-datepicker__grid" aria-labelledby="${monthId}">
        <thead><tr>${WEEKDAYS.map((w) => `<th scope="col" abbr="${w}">${w.slice(0, 2)}</th>`).join('')}</tr></thead>
        <tbody class="js-days"></tbody>
      </table>
      <p class="c-datepicker__status" aria-live="polite"></p>`;
  } else {
    root.innerHTML = `
      <div class="c-datepicker__header">
        <span class="c-datepicker__nav" data-nav="-1">${PREV_ICON}</span>
        <div class="c-datepicker__month"></div>
        <span class="c-datepicker__nav" data-nav="1">${NEXT_ICON}</span>
      </div>
      <div class="c-datepicker__weekdays">${WEEKDAYS.map((w) => `<div>${w.slice(0, 2)}</div>`).join('')}</div>
      <div class="c-datepicker__days js-days"></div>`;
  }

  const monthEl = root.querySelector('.c-datepicker__month');
  const daysEl = root.querySelector('.js-days');
  const statusEl = root.querySelector('.c-datepicker__status');

  function visibleDays() {
    const first = state.view;
    const last = new Date(first.getFullYear(), first.getMonth() + 1, 0);
    const days = [];
    for (let d = addDays(first, -first.getDay()); d <= addDays(last, 6 - last.getDay()); d = addDays(d, 1)) days.push(d);
    return days;
  }

  function update() {
    const days = visibleDays();
    if (!days.some((d) => toIso(d) === state.focus)) state.focus = toIso(state.view);
    const { start: s, end: e } = state;

    const cells = days.map((d) => {
      const iso = toIso(d);
      const inRange = Boolean(s && e && iso > s && iso < e);
      const classes = ['c-day'];
      if (d.getMonth() !== state.view.getMonth()) classes.push('is-outside');
      if (iso === s) classes.push('is-start');
      if (iso === e) classes.push('is-end');
      if (inRange) classes.push('is-in-range');
      if (!accessible) return `<div class="${classes.join(' ')}" data-date="${iso}">${d.getDate()}</div>`;
      const selected = iso === s || iso === e || inRange;
      return `<td aria-selected="${selected}"><button type="button" class="${classes.join(' ')}" data-date="${iso}" tabindex="${iso === state.focus ? 0 : -1}" aria-label="${longLabel(d)}">${d.getDate()}</button></td>`;
    });

    monthEl.textContent = accessible ? monthLabel(state.view) : state.view.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    if (accessible) {
      const rows = [];
      for (let i = 0; i < cells.length; i += 7) rows.push(`<tr>${cells.slice(i, i + 7).join('')}</tr>`);
      daysEl.innerHTML = rows.join('');
      statusEl.textContent = s && e ? `Selected ${shortLabel(s)} to ${shortLabel(e)}` : s ? `Start ${shortLabel(s)} selected. Choose an end date.` : 'No dates selected.';
    } else {
      daysEl.innerHTML = cells.join('');
    }
  }

  const focusDay = () => accessible && root.querySelector(`[data-date="${state.focus}"]`)?.focus();

  function choose(iso) {
    if (!state.start || state.end) {
      state.start = iso;
      state.end = null;
    } else if (iso < state.start) {
      state.end = state.start;
      state.start = iso;
    } else {
      state.end = iso;
    }
    state.focus = iso;
    update();
    focusDay();
  }

  root.addEventListener('click', (event) => {
    const nav = event.target.closest('[data-nav]');
    if (nav) {
      state.view = new Date(state.view.getFullYear(), state.view.getMonth() + Number(nav.dataset.nav), 1);
      update();
      return;
    }
    const day = event.target.closest('[data-date]');
    if (day) choose(day.dataset.date);
  });

  if (accessible) {
    root.addEventListener('keydown', (event) => {
      const day = event.target.closest('[data-date]');
      if (!day) return;
      const current = fromIso(day.dataset.date);
      const steps = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
      let next;
      if (event.key in steps) next = addDays(current, steps[event.key]);
      else if (event.key === 'Home') next = addDays(current, -current.getDay());
      else if (event.key === 'End') next = addDays(current, 6 - current.getDay());
      else if (event.key === 'PageUp' || event.key === 'PageDown') {
        next = new Date(current.getFullYear(), current.getMonth() + (event.key === 'PageUp' ? -1 : 1), current.getDate());
      } else return;
      event.preventDefault();
      state.focus = toIso(next);
      state.view = new Date(next.getFullYear(), next.getMonth(), 1);
      update();
      focusDay();
    });
  }

  update();
  return root;
}
