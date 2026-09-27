import type { DocPage } from '../types';

const page: DocPage = {
  title: 'CodeBlock',
  group: 'Markdown',
  order: 3,
  description:
    'The fenced-code renderer Markdown uses: syntax highlighting with a language label, copy and collapse for long code, and special renderers for `mermaid`, `wavedrom`, `math` and `diff`. Use it directly to show code outside Markdown.',
  importFrom: '@aionui/ui/markdown',
  components: ['CodeBlock'],
  examples: [
    {
      file: 'Basic',
      title: 'Basic',
      description: 'The language comes from `className="language-xxx"`, as react-markdown passes it.',
    },
    {
      file: 'Special',
      title: 'Diff and math',
      description: '`language-diff` colors added and removed lines; `language-math` renders KaTeX.',
    },
  ],
  notes: [
    'Code with a single line renders as inline `<code>`.',
    'Blocks longer than 3 lines start collapsed to 3 lines with a "view more" footer. Copy and collapse buttons appear on hover (always on touch layouts).',
  ],
};

export default page;
