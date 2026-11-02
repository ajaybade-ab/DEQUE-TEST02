import { Treeview } from '../../src/components/Treeview.js';

const items = [
  {
    label: 'Atoms',
    expanded: true,
    children: [{ label: 'Button' }, { label: 'ButtonHover' }, { label: 'ButtonToggle' }],
  },
  {
    label: 'Molecules',
    children: [{ label: 'UserItem' }, { label: 'DatePicker' }],
  },
  {
    label: 'Charts',
    children: [
      { label: 'LineGraph' },
      { label: 'Histogram' },
      { label: 'Advanced', children: [{ label: 'Cascade' }, { label: 'StackedArea' }] },
    ],
  },
];

export default {
  title: 'Components/Treeview',
  render: (args) => Treeview(args),
  args: { label: 'Component library', items, accessible: true },
};

export const Default = {};

export const Collapsed = { args: { items: items.map((i) => ({ ...i, expanded: false })) } };

export const FullyExpanded = {
  args: {
    items: items.map((i) => ({
      ...i,
      expanded: true,
      children: i.children.map((c) => (c.children ? { ...c, expanded: true } : c)),
    })),
  },
};

export const Inaccessible = { args: { accessible: false } };
