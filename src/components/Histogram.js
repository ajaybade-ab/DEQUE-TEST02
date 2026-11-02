import { attachHover, axes, chartFigure, dataTable, plotArea, toElement } from './utils.js';

// Column with a 4px rounded top, anchored square on the baseline.
const barPath = (x, y, w, base, r = 4) =>
  `M${x},${base}V${y + r}Q${x},${y} ${x + r},${y}H${x + w - r}Q${x + w},${y} ${x + w},${y + r}V${base}Z`;

export function Histogram({ title, values, bins = 6, format = String, itemLabel = 'items', width = 380, height = 220, accessible = true }) {
  const { pad, plotW, plotH } = plotArea(width, height);
  const min = Math.min(...values);
  const step = Math.ceil((Math.max(...values) - min + 1) / bins);
  const counts = Array.from({ length: bins }, () => 0);
  values.forEach((v) => counts[Math.min(bins - 1, Math.floor((v - min) / step))]++);
  const ranges = counts.map((_, i) => [min + i * step, min + (i + 1) * step - 1]);
  const rangeText = ([lo, hi]) => `${format(lo)}–${format(hi)}`;

  const max = Math.max(2, Math.ceil(Math.max(...counts) / 2) * 2);
  const band = plotW / bins;
  const x = (i) => pad.left + band * i + band / 2;
  const y = (v) => pad.top + plotH - (v / max) * plotH;
  const base = pad.top + plotH;

  const bars = counts
    .map((c, i) => (c ? `<path class="c-bar" data-index="${i}" d="${barPath(pad.left + band * i + 1, y(c), band - 2, base)}"/>` : ''))
    .join('');

  const svgBody = axes({ pad, plotW, plotH, max, x, labels: ranges.map(([lo]) => format(lo)) }) + bars;

  const peak = counts.indexOf(Math.max(...counts));
  const figure = toElement(
    chartFigure({
      title,
      summary: `${values.length} ${itemLabel} in ${bins} ranges; the most common range is ${rangeText(ranges[peak])} with ${counts[peak]}.`,
      width,
      height,
      svgBody,
      accessible,
      table: dataTable(title, ['Range', 'Count'], ranges.map((r, i) => [rangeText(r), counts[i]])),
    }),
  );

  attachHover(figure, {
    count: bins,
    xAt: x,
    viewWidth: width,
    onIndex: (i) => figure.querySelectorAll('.c-bar').forEach((bar) => bar.classList.toggle('is-active', Number(bar.dataset.index) === i)),
    render: (i) => `<strong>${rangeText(ranges[i])}</strong><div>${counts[i]} ${itemLabel}</div>`,
  });
  return figure;
}
