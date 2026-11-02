import { Histogram } from '../../src/components/Histogram.js';
import { bookings } from '../data.js';

export default {
  title: 'Components/Histogram',
  render: (args) => Histogram({ ...args, format: (v) => `$${v}` }),
  args: {
    title: 'Distribution of booking fares',
    values: bookings.map((b) => b.fare),
    bins: 6,
    itemLabel: 'bookings',
    accessible: true,
  },
};

export const Default = {};

export const FewerBins = { args: { bins: 4 } };

export const Inaccessible = { args: { accessible: false } };
