import { UserItem } from '../../src/components/UserItem.js';
import { users } from '../data.js';

const handleOf = (user) => `@${user.email.split('@')[0]}`;

export default {
  title: 'Components/UserItem',
  render: (args) => UserItem(args),
  args: { name: users[0].name, handle: handleOf(users[0]), accessible: true },
};

export const Default = {};

export const WithTier = { args: { tier: users[0].tier } };

export const List = {
  render: () =>
    `<ul class="c-user-list">${users
      .slice(0, 5)
      .map((u) => `<li>${UserItem({ name: u.name, handle: handleOf(u), tier: u.tier })}</li>`)
      .join('')}</ul>`,
};

export const Inaccessible = { args: { tier: users[0].tier, accessible: false } };
