import { defineConfig, transformerDirectives, transformerVariantGroup } from 'unocss';
import { aionuiUnoConfig } from './src/tokens/unoPreset';

// Anchor scanning to this project's own src/ and playground/ (whatever folder it lives in),
// so styles.css never picks up app classes. Vite module ids use forward slashes on every OS.
const projectRoot = __dirname.replace(/\\/g, '/').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export default defineConfig({
  ...aionuiUnoConfig(),
  transformers: [transformerVariantGroup(), transformerDirectives({ enforce: 'pre' })],
  content: {
    pipeline: {
      include: [new RegExp(`^${projectRoot}/(src|playground)/.*\\.([jt]sx?|css)($|\\?)`, 'i')],
      exclude: [/[\\/]node_modules[\\/]/, /\.html($|\?)/],
    },
  },
});
