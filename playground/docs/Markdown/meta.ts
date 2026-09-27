import type { DocPage } from '../types';

const page: DocPage = {
  title: 'Markdown',
  group: 'Markdown',
  order: 1,
  description:
    'Renders chat-style Markdown in a shadow root: GFM tables and task lists, KaTeX math, highlighted code with copy, Mermaid and WaveDrom diagrams, and chips for links to local files. Host callbacks (links, previews, images) are props, or come from a MarkdownHostProvider.',
  importFrom: '@aionui/ui/markdown',
  components: ['Markdown', 'MarkdownTable', 'MarkdownTd'],
  examples: [
    { file: 'Basic', title: 'Basic', description: 'Headings, emphasis, a table, math and a code block.' },
    {
      file: 'Diagrams',
      title: 'Diagrams',
      description:
        'Fenced `mermaid` and `wavedrom` blocks render as diagrams with pan and zoom; `onOpenPreview` adds an "open in panel" button.',
    },
    {
      file: 'Links',
      title: 'Links and local files',
      description:
        '`onOpenLink` handles web links; paths like `/Users/me/app.ts:12` become file chips that call `onLocalFileLink`.',
    },
    {
      file: 'Html',
      title: 'Raw HTML',
      description: 'Raw HTML tags are dropped unless `allowHtml` is set; enable it only for trusted content.',
    },
  ],
  snippets: [
    {
      title: 'Using the table overrides with react-markdown',
      description:
        'MarkdownTable and MarkdownTd are the table components Markdown uses; pass them to your own react-markdown for the same look.',
      code: `import ReactMarkdown from 'react-markdown';
import { MARKDOWN_REMARK_PLUGINS, MarkdownTable, MarkdownTd } from '@aionui/ui/markdown';

<ReactMarkdown remarkPlugins={MARKDOWN_REMARK_PLUGINS} components={{ table: MarkdownTable, td: MarkdownTd }}>
  {source}
</ReactMarkdown>`,
    },
  ],
  notes: [
    'Import from `@aionui/ui/markdown`, a separate entry, so apps that do not render Markdown never load react-markdown, KaTeX, Mermaid or WaveDrom. Install its peer dependencies (see Getting started).',
    'Styles live inside the shadow root, so page CSS does not leak in; theme through MarkdownHostProvider `customCss`.',
    '`\\( … \\)` and `\\[ … \\]` math delimiters are converted to `$ … $` and `$$ … $$`.',
  ],
};

export default page;
