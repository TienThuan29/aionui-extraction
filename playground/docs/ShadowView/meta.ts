import type { DocPage } from '../types';

const page: DocPage = {
  title: 'ShadowView',
  group: 'Markdown',
  order: 9,
  description:
    'Renders its children inside a shadow root carrying the markdown stylesheet, the current theme variables and KaTeX CSS, and re-applies them when the theme changes. Markdown uses it so page CSS and message CSS never mix.',
  importFrom: '@aionui/ui/markdown',
  components: ['ShadowView'],
  examples: [
    {
      file: 'Basic',
      title: 'Style isolation',
      description:
        'The page rule `.demo-title { color: red }` styles the outside heading but not the one inside ShadowView.',
    },
  ],
  notes: ['`createInitStyle` and `collectKatexCssRules` are the helpers it uses to build that stylesheet.'],
};

export default page;
