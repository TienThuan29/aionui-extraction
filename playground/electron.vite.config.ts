import { resolve } from 'node:path';
import { defineConfig } from 'electron-vite';
import UnoCSS from 'unocss/vite';
import { iconParkPlugin, selfAlias } from '../vitePlugins';

const out = (dir: string) => resolve(__dirname, 'out', dir);

// Renders the library *source* (not dist) with the same plugins the library build uses.
export default defineConfig({
  main: {
    build: { outDir: out('main'), lib: { entry: resolve(__dirname, 'main/index.ts') } },
  },
  preload: {
    // Sandboxed preloads must be CommonJS; main/index.ts loads preload/index.js.
    build: {
      outDir: out('preload'),
      lib: { entry: resolve(__dirname, 'preload/index.ts') },
      rollupOptions: { output: { format: 'cjs', entryFileNames: '[name].js' } },
    },
  },
  renderer: {
    root: resolve(__dirname, 'renderer'),
    resolve: { alias: selfAlias },
    plugins: [iconParkPlugin(), UnoCSS({ configFile: resolve(__dirname, '../uno.config.ts') })],
    build: { outDir: out('renderer'), rollupOptions: { input: resolve(__dirname, 'renderer/index.html') } },
  },
});
