import { StackedAreaChart } from '../../src/components/StackedAreaChart.js';

export default {
  title: 'Components/Charts',
  render: (args) => StackedAreaChart(args),
  args: {
    title: 'Bookings by cabin class, Jan–Jun 2026',
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    series: [
      { name: 'Economy', values: [120, 135, 160, 110, 150, 175] },
      { name: 'Business', values: [45, 60, 52, 70, 48, 66] },
      { name: 'First', values: [12, 18, 15, 22, 30, 19] },
    ],
    accessible: true,
  },
};

export const Default = {};

export const TwoSeries = {
  args: {
    title: 'Bookings, Economy vs Business',
    series: [
      { name: 'Economy', values: [120, 135, 160, 110, 150, 175] },
      { name: 'Business', values: [45, 60, 52, 70, 48, 66] },
    ],
  },
};

export const Inaccessible = { args: { accessible: false } };