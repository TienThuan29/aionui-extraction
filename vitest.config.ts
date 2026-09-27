import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';
import { iconParkPlugin, selfAlias } from './vitePlugins';

// Same icon-park transform as the library build; UnoCSS output is irrelevant to DOM tests.
export default defineConfig({
  plugins: [iconParkPlugin()],
  resolve: { alias: [...selfAlias, { find: 'virtual:uno.css', replacement: resolve(__dirname, 'tests/empty.css') }] },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['tests/**/*.test.{ts,tsx}'],
    setupFiles: ['./tests/setup.ts'],
  },
});
