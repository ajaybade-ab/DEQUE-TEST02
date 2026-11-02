import '../assets/styles.css';
import '../src/components/components.css';

/** @type { import('@storybook/html-vite').Preview } */
const preview = {
  parameters: {
    a11y: {
      // 'error' fails the story's a11y check (and Chromatic accessibility test) on any violation.
      // 'todo' reports violations as warnings only. 'off' skips the check.
      test: 'error',
      options: {
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] },
      },
    },
    layout: 'padded',
  },
};

export default preview;
