import type { DocPage } from '../types';

const page: DocPage = {
  title: 'Getting started',
  group: 'Overview',
  description:
    'Reusable React components extracted from AionUi, built on Arco Design and icon-park. Install the package and its peers, load two stylesheets, set the theme attributes, and optionally wrap the app in UiProvider for labels, theme, layout and locale.',
  components: ['UiProvider'],
  snippets: [
    {
      title: 'Install',
      language: 'bash',
      code: `npm i @aionui/ui @arco-design/web-react @icon-park/react @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
# only if you use @aionui/ui/markdown:
npm i react-markdown remark-gfm remark-math remark-breaks rehype-katex rehype-raw rehype-sanitize katex react-syntax-highlighter mermaid wavedrom json5 postcss diff2html`,
    },
    {
      title: 'Stylesheets',
      description:
        'styles.css is required. arco-theme.css is optional and restyles every Arco component to the AionUi look.',
      code: `import '@arco-design/web-react/dist/css/arco.css';
import '@aionui/ui/styles.css';
import '@aionui/ui/arco-theme.css'; // optional`,
    },
    {
      title: 'Theme attributes',
      description: 'Color tokens and Arco dark mode key off these attributes. Keep data-theme and arco-theme in sync.',
      language: 'html',
      code: `<html data-color-scheme="default" data-theme="light">
  <body arco-theme="light">…</body>
</html>`,
    },
  ],
  examples: [
    {
      file: 'Labels',
      title: 'Localized labels',
      description:
        'Components render English labels by default. Pass any subset of labels to UiProvider; parameterized labels are functions.',
    },
  ],
  notes: [
    'UiProvider is optional: without it components use English labels, the desktop layout, scale 1, the light theme and en-US number formatting.',
    'Arco components have their own texts (zh-CN by default); wrap the app in Arco `ConfigProvider` with a locale such as `@arco-design/web-react/es/locale/en-US`.',
    'Nested providers merge: the inner one overrides only the values it sets.',
    'Every module is also importable by path (for example @aionui/ui/components/layout/Section/Section); that loads only that module.',
  ],
};

export default page;
