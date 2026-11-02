let counter = 0;
export const uniqueId = (prefix) => `${prefix}-${++counter}`;

export const escape = (value) =>
  String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export function toElement(markup) {
  const template = document.createElement('template');
  template.innerHTML = markup.trim();
  return template.content.firstElementChild;
}

export function niceMax(value) {
  const step = 10 ** Math.floor(Math.log10(value));
  return Math.ceil(value / step) * step;
}

export function plotArea(width, height) {
  const pad = { top: 12, right: 16, bottom: 28, left: 44 };
  return { pad, plotW: width - pad.left - pad.right, plotH: height - pad.top - pad.bottom };
}

// Horizontal gridlines with y tick labels, plus x labels at the given positions.
export function axes({ pad, plotW, plotH, max, labels, x, ticks = [0, max / 2, max], format = String }) {
  const yAt = (v) => pad.top + plotH - (v / max) * plotH;
  const grid = ticks
    .map((t) => `<line class="c-grid" x1="${pad.left}" x2="${pad.left + plotW}" y1="${yAt(t)}" y2="${yAt(t)}"/>
      <text class="c-tick" x="${pad.left - 8}" y="${yAt(t)}" text-anchor="end" dominant-baseline="middle">${format(t)}</text>`)
    .join('');
  const xLabels = labels
    .map((l, i) => `<text class="c-tick" x="${x(i)}" y="${pad.top + plotH + 18}" text-anchor="middle">${escape(l)}</text>`)
    .join('');
  return grid + xLabels;
}

export function legend(entries, accessible) {
  if (!accessible) {
    // Colour swatches only: series identity depends on colour alone.
    return `<div class="c-legend">${entries.map((e) => `<span class="c-swatch" style="background:${e.color}"></span>`).join('')}</div>`;
  }
  return `<ul class="c-legend">${entries
    .map((e) => `<li><span class="c-swatch" style="background:${e.color}" aria-hidden="true"></span>${escape(e.name)}</li>`)
    .join('')}</ul>`;
}

export function dataTable(caption, headers, rows) {
  return `<details class="c-chart__table">
    <summary>Show data table</summary>
    <table>
      <caption>${escape(caption)}</caption>
      <thead><tr>${headers.map((h) => `<th scope="col">${escape(h)}</th>`).join('')}</tr></thead>
      <tbody>${rows.map((r) => `<tr>${r.map((c, i) => (i === 0 ? `<th scope="row">${escape(c)}</th>` : `<td>${escape(c)}</td>`)).join('')}</tr>`).join('')}</tbody>
    </table>
  </details>`;
}

// Accessible: named figure, described SVG, legend and data table.
// Inaccessible: unnamed role="img" SVG, no title, no table.
export function chartFigure({ title, summary, width, height, svgBody, legendMarkup = '', table = '', accessible }) {
  const svgAttrs = `viewBox="0 0 ${width} ${height}" width="${width}" height="${height}"`;
  if (!accessible) {
    return `<div class="c-chart c-chart--broken">
      ${legendMarkup}
      <div class="c-chart__plot"><svg role="img" ${svgAttrs}>${svgBody}</svg><div class="c-tooltip" hidden></div></div>
    </div>`;
  }
  const titleId = uniqueId('chart-title');
  const descId = uniqueId('chart-desc');
  return `<figure class="c-chart">
    <figcaption id="${titleId}" class="c-chart__title">${escape(title)}</figcaption>
    ${legendMarkup}
    <div class="c-chart__plot">
      <svg role="img" aria-labelledby="${titleId} ${descId}" ${svgAttrs}><desc id="${descId}">${escape(summary)}</desc>${svgBody}</svg>
      <div class="c-tooltip" hidden></div>
    </div>
    ${table}
  </figure>`;
}

// Tooltip on hover: snaps to the nearest data index along x.
export function attachHover(figure, { count, xAt, viewWidth, render, onIndex }) {
  const plot = figure.querySelector('.c-chart__plot');
  const svg = plot.querySelector('svg');
  const tip = plot.querySelector('.c-tooltip');
  svg.addEventListener('pointermove', (event) => {
    const box = svg.getBoundingClientRect();
    const scale = box.width / viewWidth;
    const px = (event.clientX - box.left) / scale;
    let index = 0;
    for (let i = 1; i < count; i++) if (Math.abs(xAt(i) - px) < Math.abs(xAt(index) - px)) index = i;
    onIndex(index);
    tip.innerHTML = render(index);
    tip.hidden = false;
    const anchor = xAt(index) * scale;
    const left = anchor + 12 + tip.offsetWidth > box.width ? anchor - 12 - tip.offsetWidth : anchor + 12;
    tip.style.left = `${left}px`;
  });
  svg.addEventListener('pointerleave', () => {
    tip.hidden = true;
    onIndex(-1);
  });
}
