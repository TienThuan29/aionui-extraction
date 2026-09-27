import type { DocPage } from '../types';

const page: DocPage = {
  title: 'MarkdownHostProvider',
  group: 'Markdown',
  order: 2,
  description:
    'Supplies host callbacks and theme CSS to every Markdown, CodeBlock, diagram and Diff2Html below it: link opening, diagram and diff previews, local images and custom CSS. Set it once near the root instead of on every Markdown.',
  importFrom: '@aionui/ui/markdown',
  components: ['MarkdownHostProvider'],
  examples: [
    {
      file: 'Basic',
      title: 'Shared host',
      description:
        'Both messages use the provider’s link handler and custom CSS. Nested providers and Markdown props override only what they set.',
    },
    {
      file: 'LocalImages',
      title: 'Local images',
      description:
        '`renderLocalImage` renders images whose `src` is a local path, for example through your file protocol.',
    },
  ],
  notes: [
    '`useMarkdownHost()` reads the merged values, for custom blocks of your own.',
    '`customCss` is scoped to the markdown shadow roots and every rule is made `!important`.',
  ],
};

export default page;
