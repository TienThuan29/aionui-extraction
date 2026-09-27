import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';
import pkg from './package.json';
import { iconParkPlugin, uiSrc } from './vitePlugins';

// Every dependency and peer is external: consumers install them, we never bundle them.
const externals = [...Object.keys(pkg.dependencies), ...Object.keys(pkg.peerDependencies)];
const isExternal = (id: string) => externals.some((dep) => id === dep || id.startsWith(`${dep}/`));

// Every source module is an entry: deep imports (`@aionui/ui/components/...`, the "./*" export) are public,
// and Rollup only keeps the full export signature of entries (it tree-shakes unused exports elsewhere).
const entries = Object.fromEntries(
  readdirSync(uiSrc, { recursive: true, encoding: 'utf8' })
    .map((file) => file.replace(/\\/g, '/'))
    .filter((file) => /\.tsx?$/.test(file) && !file.endsWith('.d.ts') && file !== 'tokens/unoPreset.ts')
    .map((file) => [file.replace(/\.tsx?$/, ''), resolve(uiSrc, file)])
);

// Library source uses relative imports only: tsc does not rewrite path aliases in emitted .d.ts files.
export default defineConfig({
  plugins: [
    iconParkPlugin(),
    UnoCSS(),
    {
      // arco-theme.css is opt-in, so it ships as a separate file instead of inside styles.css.
      name: 'aionui-ui-arco-theme',
      generateBundle() {
        this.emitFile({
          type: 'asset',
          fileName: 'arco-theme.css',
          source: readFileSync(resolve(uiSrc, 'styles/arco-theme.css'), 'utf8'),
        });
      },
    },
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    cssCodeSplit: false,
    lib: {
      entry: entries,
      formats: ['es'],
      cssFileName: 'styles',
    },
    rollupOptions: {
      external: isExternal,
      output: { preserveModules: true, preserveModulesRoot: 'src', entryFileNames: '[name].js' },
    },
  },
});
