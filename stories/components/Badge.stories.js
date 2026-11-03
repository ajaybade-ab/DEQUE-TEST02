import { Badge } from '../../src/components/Badge.js';

export default {
  title: 'Components/Badge',
  render: (args) => Badge(args),
  argTypes: { status: { control: 'select', options: ['success', 'warning', 'error', 'info', 'neutral'] } },
  args: { label: 'Confirmed', status: 'success', showIcon: true, accessible: true },
};

export const Default = {};

export const AllStatuses = {
  render: () =>
    `<div style="display:flex;gap:8px;flex-wrap:wrap">${[
      ['Confirmed', 'success'],
      ['Pending', 'warning'],
      ['Cancelled', 'error'],
      ['New', 'info'],
      ['Draft', 'neutral'],
    ]
      .map(([label, status]) => Badge({ label, status }))
      .join('')}</div>`,
};

export const Inaccessible = { args: { label: 'Badge', accessible: false } };

export const Errored = {
  args: {
    size: 'small',
    label: 'Button',
  },
  render: () => {
    throw new Error('oops');
  },
};