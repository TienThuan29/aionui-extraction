import type { DocPage } from '../types';

const page: DocPage = {
  title: 'Diff2Html',
  group: 'Markdown',
  order: 7,
  description:
    'A diff card built on diff2html: file header, line-by-line or side-by-side view, collapse, and word-level highlighting that follows the theme.',
  importFrom: '@aionui/ui/markdown',
  components: ['Diff2Html'],
  examples: [
    {
      file: 'Basic',
      title: 'Basic',
      description: 'The path is read from the diff headers; toggle side-by-side in the header.',
    },
    {
      file: 'Preview',
      title: 'Open in a preview panel',
      description:
        'With MarkdownHostProvider `onPreviewDiff`, a preview button hands you the path, language and diff; `diffPreviewLoading` disables it while you open it.',
    },
  ],
  notes: [
    '`title` is inserted into the header as HTML: pass only trusted text, such as a file path you control.',
    '`parseDiff`, `parseFilePathFromDiff` and `extractContentFromDiff` are exported for working with diff text.',
  ],
};

export default page;
