// Discovers every docs page from the folder convention (see ./types.ts). Shared by the playground and tests.
import type React from 'react';
import propsJson from './props.generated.json';
import { DOC_GROUPS, type DocExample, type DocPage } from './types';

export type PropDoc = { name: string; type: string; required: boolean; default?: string; description?: string };
export type ComponentDoc = { source: string; props: PropDoc[]; inherits: string[] };
export const componentDocs = propsJson as Record<string, ComponentDoc>;

export type LoadedExample = DocExample & {
  id: string;
  /** Glob key of the example file, e.g. ./Section/examples/Basic.tsx */
  path: string;
  Component: React.ComponentType;
  source: string;
};

export type LoadedPage = DocPage & { id: string; loadedExamples: LoadedExample[] };

const metas = import.meta.glob<{ default: DocPage }>('./*/meta.ts', { eager: true });
const modules = import.meta.glob<{ default: React.ComponentType }>('./*/examples/*.tsx', { eager: true });
const sources = import.meta.glob<string>('./*/examples/*.tsx', { eager: true, query: '?raw', import: 'default' });

const pageId = (path: string) => path.split('/')[1];

export const docPages: LoadedPage[] = Object.entries(metas)
  .map(([path, mod]) => {
    const id = pageId(path);
    const loadedExamples = (mod.default.examples ?? []).map((example) => {
      const file = `./${id}/examples/${example.file}.tsx`;
      const Component = modules[file]?.default;
      if (!Component) throw new Error(`docs/${id}: examples/${example.file}.tsx is listed in meta.ts but missing`);
      return { ...example, id: `${id}/${example.file}`, path: file, Component, source: sources[file] };
    });
    return { ...mod.default, id, loadedExamples };
  })
  .sort(
    (a, b) =>
      DOC_GROUPS.indexOf(a.group) - DOC_GROUPS.indexOf(b.group) ||
      (a.order ?? 0) - (b.order ?? 0) ||
      a.title.localeCompare(b.title)
  );

/** Example files present on disk but not listed in any meta.ts (would never be shown). */
export const unlistedExampleFiles = Object.keys(modules).filter(
  (file) => !docPages.some((page) => page.loadedExamples.some((example) => example.path === file))
);
