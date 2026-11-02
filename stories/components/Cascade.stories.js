import { Cascade } from '../../src/components/Cascade.js';

export default {
  title: 'Components/Cascade',
  render: (args) => Cascade(args),
  args: {
    title: 'Booking record size by field',
    unit: 'bytes',
    items: [
      { label: 'transaction', value: 412 },
      { label: 'estimate', value: 64 },
      { label: 'description', value: 380 },
      { label: 'name', value: 96 },
      { label: 'summary', value: 352 },
      { label: 'id', value: 36 },
      { label: 'length', value: 48 },
      { label: 'billingUrl', value: 288 },
      { label: 'invoiceCount', value: 120 },
      { label: 'value', value: 196 },
      { label: 'type', value: 40 },
    ],
    accessible: true,
  },
};

export const Default = {};

export const Inaccessible = { args: { accessible: false } };
