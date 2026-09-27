import type { DocPage } from '../types';

const page: DocPage = {
  title: 'WavedromBlock',
  group: 'Markdown',
  order: 5,
  description:
    'Renders WaveJSON (timing diagrams) with WaveDrom, using a dark skin in dark mode. Same controls as MermaidBlock. Markdown uses it for fenced `wavedrom` and `wavejson` blocks.',
  importFrom: '@aionui/ui/markdown',
  components: ['WavedromBlock'],
  examples: [
    { file: 'Basic', title: 'Basic', description: 'A clocked bus; the source is JSON5, so keys need no quotes.' },
  ],
  notes: ['`resolveWaveRenderTheme` and `remapDarkSkinStyle` are exported for custom WaveDrom rendering.'],
};

export default page;
