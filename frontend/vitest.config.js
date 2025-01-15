import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    global: true,
    environment: 'jsdom',
    setupFiles: './setupTest.js', // Include setup file for custom matchers
  },
});
