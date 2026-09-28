# Docs search (playground)

## Understanding summary

- A search box at the top of the docs playground sidebar; the `@aionui/ui` library itself does not change.
- Purpose: jump to a page or component among ~48 docs pages without scrolling 11 groups.
- Matches page title, component names (including sub-components such as `AionCollapse.Item`), group,
  page description and example titles.
- The sidebar filters as you type; empty groups hide; "No results" when nothing matches.
- Keys: Ctrl/⌘+K or Ctrl/⌘+F focuses the box, Enter opens the first result, Esc clears (then blurs).
- Non-goals: searching props, notes or snippets; a Ctrl+K dialog; fuzzy matching or ranking.

## Assumptions

- Case-insensitive substring match, whitespace-separated terms combined with AND.
- Filtering runs in memory on every keystroke (48 static pages: no debounce, no index).
- The query is not stored in the URL; it survives page navigation but not a reload.
- Playground-only change; no security or privacy impact (static data).

## Decision log

| #   | Decision                         | Alternatives                | Why                                   |
| --- | -------------------------------- | --------------------------- | ------------------------------------- |
| 1   | Search in the docs app only      | New library component; both | The need is navigating the docs       |
| 2   | Name + description fields        | Names only; full-text       | Useful enough, no index needed        |
| 3   | Sidebar filter + Ctrl+K focus    | Filter only; Ctrl+K dialog  | Least code for the same navigation    |
| 4   | `AionSearchInput`                | Arco `Input.Search`         | Dogfoods the library, consistent look |
| 5   | Substring, AND, case-insensitive | Fuzzy                       | YAGNI                                 |

## Design

- `playground/docs/search.ts`: `filterDocPages(pages, query)` joins each page's title, group,
  description, `components` and example titles into one lower-cased haystack and keeps pages whose
  haystack contains every term. An empty query returns all pages; input order (group, order, title) is kept.
- `playground/renderer/App.tsx`: `query` state, `AionSearchInput` under the sidebar heading, the
  existing group loop reads the filtered list. A `window` keydown listener handles Ctrl/⌘+K/F;
  the input's `onKeyDown` handles Enter (navigate to the first result) and Esc.
- Deviation found while testing: `tab` also matches descriptions (e.g. SortableSiderEntry comes first in
  sidebar order), so Enter uses `bestDocPage`: the first result whose title or component name contains
  the query, falling back to the first result. The sidebar itself stays unranked.
- The page currently open stays shown even when the filter hides it from the sidebar.
- Test: `tests/docsSearch.test.ts` runs `filterDocPages` on the real `docPages`.
