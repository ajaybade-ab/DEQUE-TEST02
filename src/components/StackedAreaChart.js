import { attachHover, axes, chartFigure, dataTable, escape, legend, niceMax, plotArea, toElement } from './utils.js';

const COLORS = ['var(--series-1)', 'var(--series-2)', 'var(--series-3)'];

export function StackedAreaChart({ title, labels, series, width = 380, height = 220, accessible = true }) {
  const { pad, plotW, plotH } = plotArea(width, height);
  const totals = labels.map((_, i) => series.reduce((sum, s) => sum + s.values[i], 0));
  const max = niceMax(Math.max(...totals));
  const x = (i) => pad.left + (i / (labels.length - 1)) * plotW;
  const y = (v) => pad.top + plotH - (v / max) * plotH;

  let base = labels.map(() => 0);
  const areas = series
    .map((s, si) => {
      const top = base.map((b, i) => b + s.values[i]);
      const upper = top.map((v, i) => `${x(i)},${y(v)}`).join('L');
      const lower = base.map((v, i) => `${x(i)},${y(v)}`).reverse().join('L');
      base = top;
      return `<path class="c-area" d="M${upper}L${lower}Z" style="fill:${COLORS[si]}"/>`;
    })
    .join('');

  const svgBody =
    axes({ pad, plotW, plotH, max, labels, x }) +
    areas +
    `<line class="c-crosshair" x1="0" x2="0" y1="${pad.top}" y2="${pad.top + plotH}" visibility="hidden"/>`;

  const figure = toElement(
    chartFigure({
      title,
      summary: `Stacked total goes from ${totals[0]} in ${labels[0]} to ${totals.at(-1)} in ${labels.at(-1)}.`,
      width,
      height,
      svgBody,
      accessible,
      legendMarkup: legend(series.map((s, i) => ({ name: s.name, color: COLORS[i] })), accessible),
      table: dataTable(
        title,
        ['Period', ...series.map((s) => s.name), 'Total'],
        labels.map((l, i) => [l, ...series.map((s) => s.values[i]), totals[i]]),
      ),
    }),
  );

  const crosshair = figure.querySelector('.c-crosshair');
  attachHover(figure, {
    count: labels.length,
    xAt: x,
    viewWidth: width,
    onIndex: (i) => {
      crosshair.setAttribute('visibility', i < 0 ? 'hidden' : 'visible');
      if (i >= 0) {
        crosshair.setAttribute('x1', x(i));
        crosshair.setAttribute('x2', x(i));
      }
    },
    render: (i) =>
      `<strong>${escape(labels[i])}</strong>` +
      series
        .map((s, si) => `<div><span class="c-swatch" style="background:${COLORS[si]}"></span> ${escape(s.name)}: ${s.values[i]}</div>`)
        .reverse()
        .join('') +
      `<div>Total: ${totals[i]}</div>`,
  });
  return figure;
}
