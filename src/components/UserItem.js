import { Badge } from './Badge.js';
import { escape } from './utils.js';

const AVATAR_COLORS = ['#2a78d6', '#eb6834', '#1baf7a', '#6250d6', '#e34948'];

function avatarUrl(name) {
  const initials = name.split(/\s+/).map((part) => part[0]).slice(0, 2).join('').toUpperCase();
  const color = AVATAR_COLORS[[...name].reduce((sum, c) => sum + c.charCodeAt(0), 0) % AVATAR_COLORS.length];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><rect width="40" height="40" fill="${color}"/><text x="20" y="25" font-family="Arial" font-size="15" font-weight="700" fill="#fff" text-anchor="middle">${escape(initials)}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

const TIER_STATUS = { Blue: 'info', Silver: 'neutral', Gold: 'warning', Platinum: 'success' };

export function UserItem({ name, handle, tier, accessible = true }) {
  const badge = tier ? Badge({ label: tier, status: TIER_STATUS[tier] ?? 'neutral', showIcon: false, accessible }) : '';
  if (!accessible) {
    // Avatar has no alt, handle is low contrast.
    return `<div class="c-user c-user--broken">
      <img class="c-user__avatar" src="${avatarUrl(name)}" width="40" height="40">
      <div><div class="c-user__name">${escape(name)}</div><div class="c-user__handle">${escape(handle)}</div></div>
      ${badge}
    </div>`;
  }
  // Avatar is decorative: the name is right next to it.
  return `<div class="c-user">
    <img class="c-user__avatar" src="${avatarUrl(name)}" width="40" height="40" alt="">
    <div><p class="c-user__name">${escape(name)}</p><p class="c-user__handle">${escape(handle)}</p></div>
    ${badge}
  </div>`;
}
