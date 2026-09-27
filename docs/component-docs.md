# Component documentation — design

- **Date:** 2026-09-27
- **Status:** implemented (steps 1–4)

## Understanding summary

- An interactive documentation page for every component of `@aionui/ui`: 47 component pages, with sub-components on their parent's page, plus Overview and a Hooks & utils page.
- Each page has a description, the import line, examples (a live demo plus copyable source), and an **auto-generated props table** built from TypeScript types and JSDoc.
- It runs inside the existing Electron playground (`bun run playground`). Screenshot mode is kept.
- The language is English.
- **Audience:** the maintainer and anyone reusing the library in another project, who needs to see a component and copy working code.
- **Non-goals:** a deployable website, search, bilingual docs, doc versioning, Storybook/MDX, or any change to component behavior or API.

## Assumptions

1. Examples import from `'@aionui/ui'` / `'@aionui/ui/markdown'`, never from `../../src`, so copied code works as-is in another project.
2. Every example is a real `.tsx` file. The page renders it and shows the same file's source through Vite `?raw`, so the demo and the code cannot drift.
3. There are no new dependencies. Highlighting uses `react-syntax-highlighter` (already a dev dependency), Copy uses the library's `copyText`, and props use the TypeScript compiler API.
4. Pages have 2–4 examples each (1–2 for trivial components), about 110 in total.
5. **Non-functional:**
   - performance and scale: not applicable (a dev tool)
   - security: not applicable
   - reliability: every example typechecks and renders under test, and the props JSON is checked for staleness
   - maintenance: adding a component means adding one docs folder
6. The docs live in `playground/` only. The npm package is unchanged (`files: dist, LICENSE, NOTICE`).

## Risks

- Volume: about 110 examples. Environment-heavy components (WindowControls, SortableSiderEntry, the markdown renderers) need self-contained examples.
- Generated types for props inherited from Arco/HTML are unreadable if listed one by one. They are collapsed into one line ("Also accepts all props of Arco `SelectProps`").

## Design

### Page layout

The playground becomes the docs app, and the old `demos*.tsx` are migrated into examples, then removed.

- **Sidebar:** grouped as Overview · Layout · Inputs · Overlays · Display · Settings · Files · Tabs · Icons · Markdown · Hooks & utils.
- **Header:** the existing Light/Dark and Desktop/Mobile toggles.
- **Page sections:**
  - title and description
  - the `import { X } from '@aionui/ui'` line, with Copy
  - **Examples:** each shows a title, a description and the live demo; its code is collapsed by default, with **Code** to expand and **⧉ Copy** to copy the whole file
  - **API:** a props table per component on the page (main first, then sub-components)
  - **Notes:** optional; UiProvider labels, host props, caveats
- **Deep links:** `#/AionModal` opens a page; `#/AionModal?example=Disabled` scrolls to one example (a second `#` cannot live inside the hash route).

### Folder convention (decision F7)

```
playground/docs/<Page>/
  meta.ts               { title, group, description, components: [...], examples: [{ file, title, description }], notes? }
  examples/<File>.tsx   default export = the demo; only '@aionui/ui' imports; no metadata inside
```

The app discovers pages with `import.meta.glob('../docs/*/meta.ts', { eager: true })`, examples with `import.meta.glob('../docs/*/examples/*.tsx', { eager: true })`, and their sources with the same glob plus `query: '?raw'`.

### Props generation

`scripts/gen-props.ts` (`bun run docs:props`) uses the TypeScript compiler API:

1. For every component exported by `src/index.ts` and `src/markdown.ts`, resolve its props type: the first parameter, `React.FC<P>`, or `forwardRef<_, P>`.
2. For every prop **declared in `src/`**, record:
   - name and whether it is required
   - type (`checker.typeToString`, shortened)
   - default: the JSDoc `@default`, otherwise the destructuring default
   - the JSDoc description
3. Props declared in `node_modules` (Arco/HTML) collapse into an "Also accepts all props of …" line.
4. The output is `playground/docs/props.generated.json`, which is committed.

Missing descriptions are filled by adding JSDoc to the component props in `src/`. These are comment-only changes (decision F10). The JSDoc is written group by group as each group's pages are written, not all at step 4, so each step's tables ship complete.

### Aliases

`@aionui/ui` → `src/index.ts` and `@aionui/ui/markdown` → `src/markdown.ts`. They are set in the playground Vite config, in `vitest.config.ts` and in `tsconfig.json` `paths`. Library source keeps relative imports.

### Tests (all in `bun run test`)

| Test                        | Catches                                                             |
| --------------------------- | ------------------------------------------------------------------- |
| typecheck                   | every example compiles under strict `tsc`                           |
| `docsExamples.dom.test.tsx` | every example (globbed) renders without crashing                    |
| `docsProps.test.ts`         | the committed props JSON matches the code                           |
| `docsCoverage.test.ts`      | every exported component has a page or is listed as a sub-component |

The existing smoke and dist tests are unchanged. Visual checks use playground screenshot mode.

### Steps (one commit each; gates: typecheck, lint, format, test, playground build)

1. Framework, props generator and props test, Overview, and the 9 Layout pages. **Pause for review with screenshots.** This step also fixed the icon-park transform for `import { A as B }` (the AionUi original emitted invalid code), with a test.
2. Inputs, Overlays, Display, Settings, Files, Tabs and Icons (28 pages). Along the way:
   - the props generator also documents static sub-components declared in `src/` (`AionCollapse.Item`, `AionSteps.Step`, `AionSelect.Option`);
   - the icon-park transform now runs on `src/` only, so examples render exactly as in a consumer app;
   - `TabBar`'s `tabsContainerRef` accepts `RefObject<HTMLDivElement | null>`, so the ref from `useTabOverflow` fits without a cast (a widening, backward-compatible type fix).
3. Markdown (9 pages), and Hooks & utils. `useAutoScroll`'s `containerRef` gets the same nullable-ref widening as TabBar, and the playground sets Arco's `ConfigProvider` locale to en-US.
4. JSDoc fill, props regeneration, the coverage test, removal of the old demos, and a full screenshot pass (48 pages × light/dark × desktop/mobile). Also:
   - `@deprecated` props show their deprecation note as the description; `docs:props` formats its output;
   - the playground header is now the real title bar of its frameless window, with working `WindowControls`;
   - the preload is built as CommonJS `preload/index.js`: it was emitted as `index.mjs` while the main process loads `index.js`, so the window bridge never loaded (a playground bug that predates the docs).

### Known issues found while documenting (pre-existing in AionUi, not fixed: out of scope)

- Mermaid flowchart labels are clipped inside `Markdown`: Mermaid measures text with the page font but the shadow root renders it in another font. Standalone `MermaidBlock` is fine.
- The line badge of `LocalFileLink` (`L12`) is unstyled inside `Markdown`: it uses UnoCSS classes, which do not reach the shadow root (`ShadowView` styles a `.markdown-local-file-line` class the component never sets).
- `Diff2Html` writes `title` into the header with `innerHTML`; untrusted titles would be injected as HTML.

## Decision log

| #   | Decision                                                   | Alternatives                                | Why                                                 |
| --- | ---------------------------------------------------------- | ------------------------------------------- | --------------------------------------------------- |
| F1  | Document `aionui-ui`                                       | AionUi-main copy; both                      | The reusable copy                                   |
| F2  | Interactive doc pages                                      | Markdown files; both                        | Live demos, like React UI docs                      |
| F3  | Inside the Electron playground                             | Web site                                    | User's choice; no new app                           |
| F4  | English                                                    | Vietnamese; bilingual                       | Matches code, JSDoc and README                      |
| F5  | Props generated from TypeScript                            | Hand-written                                | Always in sync; staleness test                      |
| F6  | All components; hooks/utils on one page                    | Separate hook pages; common components only | Full coverage without bloat                         |
| F7  | Folder per page + `import.meta.glob` + `?raw`              | Registry with code strings; MDX             | Shown code is the running code; no new dependencies |
| F8  | Code collapsed by default                                  | Expanded                                    | Pages stay scannable                                |
| F9  | Inherited Arco/HTML props collapsed into one line          | List every prop                             | Readable tables                                     |
| F10 | Add JSDoc in `src/`                                        | Prop descriptions in `meta.ts`              | One source; also shows in consumers' IDEs           |
| F11 | Example metadata in `meta.ts`; example files are pure code | Metadata inside example files               | Copied code is clean                                |
| F12 | Remove `demos*.tsx` after migrating                        | Keep both                                   | One home for examples                               |
| F13 | Pilot the Layout group, then pause for review              | Everything at once                          | Correct course at 9/47 pages                        |
