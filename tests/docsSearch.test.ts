import { docPages } from '../playground/docs/registry';
import { bestDocPage, filterDocPages } from '../playground/docs/search';

const ids = (query: string) => filterDocPages(docPages, query).map((page) => page.id);

describe('docs search', () => {
  it('an empty or blank query keeps every page', () => {
    expect(ids('')).toEqual(docPages.map((page) => page.id));
    expect(ids('   ')).toHaveLength(docPages.length);
  });

  it('matches titles case-insensitively', () => {
    expect(ids('tab')).toEqual(expect.arrayContaining(['TabBar', 'TabToolbar', 'TabContextMenu']));
    expect(ids('MERMAID')).toContain('MermaidBlock');
  });

  it('requires every term, and searches sub-component names', () => {
    expect(ids('collapse item')).toContain('AionCollapse');
    expect(ids('collapse zzzz')).toEqual([]);
  });

  it('Enter prefers a page named after the query over description matches', () => {
    expect(bestDocPage(filterDocPages(docPages, 'tab'), 'tab')?.id).toBe('TabBar');
    expect(bestDocPage(filterDocPages(docPages, 'zzzz'), 'zzzz')).toBeUndefined();
  });
});
