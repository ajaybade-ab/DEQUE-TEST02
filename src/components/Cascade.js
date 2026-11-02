import { escape } from './utils.js';

export function Cascade({ title, items, unit = '', accessible = true }) {
  const max = Math.max(...items.map((item) => item.value));
  const bar = (item) =>
    `<span class="c-cascade__track"><span class="c-cascade__bar" style="width:${(item.value / max) * 100}%"></span></span>`;

  if (!accessible) {
    // <li> outside a list, tiny low-contrast labels, values only shown as bar length.
    return `<div class="c-chart c-cascade c-cascade--broken"><div class="c-cascade__list">${items
      .map((item) => `<li class="c-cascade__row"><span class="c-cascade__label">${escape(item.label)}</span>${bar(item)}</li>`)
      .join('')}</div></div>`;
  }

  return `<figure class="c-chart c-cascade">
    <figcaption class="c-chart__title">${escape(title)}</figcaption>
    <ul class="c-cascade__list">${items
      .map((item) => `<li class="c-cascade__row">
        <span class="c-cascade__label">${escape(item.label)}</span>
        ${bar(item)}
        <span class="c-cascade__value">${item.value}${unit ? `<span class="sr-only"> ${escape(unit)}</span>` : ''}</span>
      </li>`)
      .join('')}</ul>
  </figure>`;
}
