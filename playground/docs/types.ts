// Shape of each docs page's meta.ts. The folder name is the page id (and its route: #/<folder>).

export const DOC_GROUPS = [
  'Overview',
  'Layout',
  'Inputs',
  'Overlays',
  'Display',
  'Settings',
  'Files',
  'Tabs',
  'Icons',
  'Markdown',
  'Hooks & utils',
] as const;

export type DocGroup = (typeof DOC_GROUPS)[number];

/** A live example: examples/<file>.tsx, whose default export is rendered and whose source is shown. */
export type DocExample = {
  file: string;
  title: string;
  description?: string;
};

/** A code snippet without a live demo (install steps, hook signatures, Electron wiring…). */
export type DocSnippet = {
  title: string;
  description?: string;
  code: string;
  language?: 'tsx' | 'typescript' | 'bash' | 'html' | 'css';
};

export type DocPage = {
  title: string;
  group: DocGroup;
  /** Sort order inside the group (lower first); ties sort by title. */
  order?: number;
  description: string;
  /** Package entry the components are imported from. */
  importFrom?: '@aionui/ui' | '@aionui/ui/markdown';
  /** Exported components covered by this page: the first is the main one, the rest are shown as sub-components. */
  components?: string[];
  examples?: DocExample[];
  snippets?: DocSnippet[];
  /** Short paragraphs shown under "Notes". */
  notes?: string[];
};
