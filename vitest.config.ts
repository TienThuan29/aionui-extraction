import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';
import { iconParkPlugin } from './vitePlugins';

// Same icon-park transform as the library build; UnoCSS output is irrelevant to DOM tests.
export default defineConfig({
  plugins: [iconParkPlugin()],
  resolve: { alias: { 'virtual:uno.css': resolve(__dirname, 'tests/empty.css') } },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['tests/**/*.test.{ts,tsx}'],
    setupFiles: ['./tests/setup.ts'],
  },
});
