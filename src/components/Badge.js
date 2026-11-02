import { escape } from './utils.js';

const ICONS = { success: '✓', warning: '!', error: '✕', info: 'i', neutral: '' };

// showIcon: keep on when the badge reports a state; turn off for plain labels (e.g. loyalty tier).
export function Badge({ label, status = 'neutral', showIcon = true, accessible = true }) {
  if (!accessible) {
    // Pale green on pale green (~1.6:1) and no icon, so status relies on colour.
    return `<span class="c-badge c-badge--broken">${escape(label)}</span>`;
  }
  const icon = showIcon && ICONS[status] ? `<span class="c-badge__icon" aria-hidden="true">${ICONS[status]}</span>` : '';
  return `<span class="c-badge c-badge--${status}">${icon}${escape(label)}</span>`;
}
