/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
  stories: ['../stories/**/*.stories.js'],
  addons: ['@chromatic-com/storybook', '@storybook/addon-a11y'],
  framework: { name: '@storybook/html-vite', options: {} },
  staticDirs: [
    { from: '../assets', to: '/assets' },
    { from: '../data', to: '/data' },
  ],
};

export default config;
