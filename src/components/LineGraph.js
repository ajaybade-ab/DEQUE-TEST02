import { attachHover, axes, chartFigure, dataTable, escape, niceMax, plotArea, toElement, uniqueId } from './utils.js';

export function LineGraph({ title, labels, values, references = [], unit = '%', width = 380, height = 220, accessible = true }) {
  const { pad, plotW, plotH } = plotArea(width, height);
  const max = niceMax(Math.max(...values, ...references.map((r) => r.value)));
  const x = (i) => pad.left + (i / (values.length - 1)) * plotW;
  const y = (v) => pad.top + plotH - (v / max) * plotH;
  const fmt = (v) => `${v}${unit}`;
  const gradientId = uniqueId('line-fill');
  const points = values.map((v, i) => `${x(i)},${y(v)}`).join('L');

  const refs = references
    .map((r) => `<line class="c-ref" x1="${pad.left}" x2="${pad.left + plotW}" y1="${y(r.value)}" y2="${y(r.value)}"/>
      <text class="c-ref-label" x="${pad.left + plotW}" y="${y(r.value) - 5}" text-anchor="end">${escape(r.label)} ${fmt(r.value)}</text>`)
    .join('');

  const svgBody = `<defs><linearGradient id="${gradientId}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" style="stop-color:var(--series-2);stop-opacity:0.4"/>
      <stop offset="1" style="stop-color:var(--series-2);stop-opacity:0.02"/>
    </linearGradient></defs>
    ${axes({ pad, plotW, plotH, max, labels, x, format: fmt })}
    <path d="M${x(0)},${y(0)}L${points}L${x(values.length - 1)},${y(0)}Z" style="fill:url(#${gradientId})"/>
    ${refs}
    <path class="c-line" d="M${points}"/>
    <line class="c-crosshair" x1="0" x2="0" y1="${pad.top}" y2="${pad.top + plotH}" visibility="hidden"/>
    <circle class="c-dot" r="4" visibility="hidden"/>`;

  const low = Math.min(...values);
  const high = Math.max(...values);
  const figure = toElement(
    chartFigure({
      title,
      summary: `Ranges from ${fmt(low)} to ${fmt(high)}; latest value ${fmt(values.at(-1))} in ${labels.at(-1)}.`,
      width,
      height,
      svgBody,
      accessible,
      table: dataTable(title, ['Period', 'Value'], labels.map((l, i) => [l, fmt(values[i])])),
    }),
  );

  const crosshair = figure.querySelector('.c-crosshair');
  const dot = figure.querySelector('.c-dot');
  attachHover(figure, {
    count: values.length,
    xAt: x,
    viewWidth: width,
    onIndex: (i) => {
      const visibility = i < 0 ? 'hidden' : 'visible';
      crosshair.setAttribute('visibility', visibility);
      dot.setAttribute('visibility', visibility);
      if (i >= 0) {
        crosshair.setAttribute('x1', x(i));
        crosshair.setAttribute('x2', x(i));
        dot.setAttribute('cx', x(i));
        dot.setAttribute('cy', y(values[i]));
      }
    },
    render: (i) => `<strong>${escape(labels[i])}</strong><div>${fmt(values[i])}</div>`,
  });
  return figure;
}
