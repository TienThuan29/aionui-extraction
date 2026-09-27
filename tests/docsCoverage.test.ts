import { componentDocs, docPages } from '../playground/docs/registry';

// Mounting every example is covered by docsExamples.dom.test.tsx; mock the heavy renderers it pulls in.
vi.mock('mermaid', () => ({ default: { initialize: vi.fn(), render: vi.fn() } }));
vi.mock('wavedrom', () => ({ default: { renderAny: () => ['svg', {}], onml: { stringify: () => '' } } }));

// Exports that are documented as prose on a page rather than with a props table.
const DOCUMENTED_WITHOUT_TABLE: Record<string, string> = {
  IconParkHOC: 'Icons',
  ModalHOC: 'HooksUtils',
  'ModalHOC.Extra': 'HooksUtils',
};

describe('docs coverage', () => {
  it('every exported component is on a docs page', () => {
    const onPages = new Set(docPages.flatMap((page) => page.components ?? []));
    const pageIds = new Set(docPages.map((page) => page.id));
    const undocumented = Object.keys(componentDocs).filter((name) => {
      if (onPages.has(name)) return false;
      if (DOCUMENTED_WITHOUT_TABLE[name]) return !pageIds.has(DOCUMENTED_WITHOUT_TABLE[name]);
      // Static sub-components (AionSelect.Option) are covered by their parent's page.
      const parent = name.split('.')[0];
      return !(name.includes('.') && onPages.has(parent));
    });
    expect(undocumented, 'add them to a page `components` list (or to DOCUMENTED_WITHOUT_TABLE)').toEqual([]);
  });

  it('every page has a description and at least one example or snippet', () => {
    const thin = docPages
      .filter((page) => !page.description || (page.loadedExamples.length === 0 && !page.snippets?.length))
      .map((page) => page.id);
    expect(thin).toEqual([]);
  });
});
