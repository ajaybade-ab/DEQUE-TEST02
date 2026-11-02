import { LineGraph } from '../../src/components/LineGraph.js';

export default {
  title: 'Components/LineGraph',
  render: (args) => LineGraph(args),
  args: {
    title: 'Weekly cancellation rate',
    labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'],
    values: [14, 18, 16, 22, 27, 21, 23, 17],
    references: [
      { label: 'Alert', value: 25 },
      { label: 'Target', value: 10 },
    ],
    unit: '%',
    accessible: true,
  },
};

export const Default = {};

export const WithoutReferenceLines = { args: { references: [] } };

export const Inaccessible = { args: { accessible: false } };
