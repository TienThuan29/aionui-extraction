import { render } from '@testing-library/react';
import { componentDocs, docPages, unlistedExampleFiles } from '../playground/docs/registry';

// Heavy renderers jsdom cannot run; these tests only check that every example mounts.
vi.mock('mermaid', () => ({
  default: { initialize: vi.fn(), render: vi.fn().mockResolvedValue({ svg: '<svg></svg>' }) },
}));
vi.mock('wavedrom', () => ({ default: { renderAny: () => ['svg', {}], onml: { stringify: () => '<svg></svg>' } } }));

const examples = docPages.flatMap((page) => page.loadedExamples.map((example) => [example.id, example] as const));

describe('docs examples', () => {
  it.each(examples)('%s renders', (_id, example) => {
    const { Component } = example;
    const { unmount } = render(<Component />);
    unmount();
  });

  it('every example file on disk is listed in its meta.ts', () => {
    expect(unlistedExampleFiles).toEqual([]);
  });

  it('every component a page documents has generated props data', () => {
    const missing = docPages.flatMap((page) => (page.components ?? []).filter((name) => !componentDocs[name]));
    expect(missing).toEqual([]);
  });

  it('example code imports the package by name, never library internals', () => {
    const offenders = docPages
      .flatMap((page) => page.loadedExamples)
      .filter((example) => /from '\.\.?\//.test(example.source))
      .map((example) => example.id);
    expect(offenders).toEqual([]);
  });
});
