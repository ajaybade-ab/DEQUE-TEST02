import { DatePicker } from '../../src/components/DatePicker.js';

export default {
  title: 'Components/DatePicker',
  render: (args) => DatePicker(args),
  args: { label: 'Travel dates', month: '2026-08', start: '2026-08-01', end: '2026-08-08', accessible: true },
};

export const Default = {};

export const NoSelection = { args: { start: null, end: null } };

export const StartOnly = { args: { start: '2026-08-14', end: null } };

export const Inaccessible = { args: { accessible: false } };
