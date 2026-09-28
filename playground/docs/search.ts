// Sidebar search: case-insensitive substring match; every whitespace-separated term must appear.
import type { DocPage } from './types';

const haystack = (page: DocPage) =>
  [page.title, page.group, page.description, ...(page.components ?? []), ...(page.examples ?? []).map((e) => e.title)]
    .join(' ')
    .toLowerCase();

export function filterDocPages<T extends DocPage>(pages: T[], query: string): T[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return pages;
  return pages.filter((page) => {
    const text = haystack(page);
    return terms.every((term) => text.includes(term));
  });
}

/**
 * The page Enter opens: the first whose title or component name starts with the query, then one whose
 * name contains it (`tab` is inside "Sortable"), else the first result.
 */
export function bestDocPage<T extends DocPage>(results: T[], query: string): T | undefined {
  const q = query.trim().toLowerCase();
  const names = (page: T) => [page.title, ...(page.components ?? [])].map((n) => n.toLowerCase());
  return (
    results.find((page) => names(page).some((n) => n.startsWith(q))) ??
    results.find((page) => names(page).some((n) => n.includes(q))) ??
    results[0]
  );
}
