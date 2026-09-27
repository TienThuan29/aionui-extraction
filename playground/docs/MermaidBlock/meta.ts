import type { DocPage } from '../types';

const page: DocPage = {
  title: 'MermaidBlock',
  group: 'Markdown',
  order: 4,
  description:
    'Renders Mermaid source as a themed SVG, with a zoom overlay, an optional "open in panel" button and optional pan/zoom. Markdown uses it for fenced `mermaid` blocks.',
  importFrom: '@aionui/ui/markdown',
  components: ['MermaidBlock'],
  examples: [
    { file: 'Basic', title: 'Basic', description: 'A sequence diagram; it re-renders when the theme changes.' },
    {
      file: 'PanZoom',
      title: 'Pan, zoom and panel',
      description:
        '`enablePanZoom` adds drag-to-pan and zoom buttons; `onOpenPreview` from MarkdownHostProvider adds the panel button.',
    },
  ],
  notes: [
    'Source that fails to render falls back to showing the code; there is also a toggle between diagram and source.',
  ],
};

export default page;
