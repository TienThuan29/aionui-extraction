import type { DocPage } from '../types';

const page: DocPage = {
  title: 'DiagramZoomOverlay',
  group: 'Markdown',
  order: 6,
  description:
    'A full-window viewer for an SVG diagram with zoom and pan. MermaidBlock and WavedromBlock open it from their zoom button; use it for your own SVGs.',
  importFrom: '@aionui/ui/markdown',
  components: ['DiagramZoomOverlay'],
  examples: [
    { file: 'Basic', title: 'Basic', description: 'Open it with the button; close with ×, the backdrop or Escape.' },
  ],
  notes: ['Render it only while open; it has no `visible` prop.'],
};

export default page;
