> **Origin note:** this is the design record of extracting this library out of the AionUi monorepo (`AionUi-main/packages/ui`). Paths such as `packages/desktop/...`, the root `uno.config.ts` and the "AionUi gates" refer to that repository, not to this one.

# `@aionui/ui` — UI Library Extraction Design

- **Date:** 2026-09-27
- **Status:** Implemented (Phases 0–6, commits `6a06b4f`…). See §8 for where the implementation deviated from this design.
- **Source:** `packages/desktop/src/renderer/` (all paths below are relative to it unless stated otherwise)
- **Target:** new workspace package `packages/ui`, published as `@aionui/ui`

## 1. Understanding summary

- **What:** a publishable React component library holding AionUi's generic presentation components, hooks and utils. Coupled components are decoupled through props and a single provider.
- **Why:** reuse AionUi's UI primitives in future projects without bringing its IPC bridge, stores, routing or i18n setup.
- **Who:** the maintainer's own future React projects. AionUi is the first consumer.
- **Hard constraint:** AionUi keeps working with no call-site changes. Every moved component keeps an adapter or re-export at its old path.
- **Hard constraint:** the library builds on Arco Design + icon-park and inherits their look.
- **Non-goals:** no redesign, no removing Arco, no new components, no Electron `<webview>` host, no business-logic (group C) code.

## 2. Assumptions

1. Peer dependency range `react >=18.2`. Verified: no React 19-only APIs are used by in-scope files.
2. Version starts at `0.1.0` under semver. Apache-2.0: the package ships `LICENSE` and `NOTICE` and keeps the file headers.
3. **Performance:** the core entry depends only on react, react-dom, Arco, icon-park and classnames, and ships as tree-shakable ESM (`preserveModules`). Heavy renderers live only in `/markdown`.
4. **Security:** ~~Markdown keeps `rehype-sanitize` on by default.~~ _Corrected during implementation:_ by default the Markdown renderer does not parse raw HTML at all. `allowHtml` enables `rehype-raw` **without** sanitizing (trusted content only), and `SANITIZED_HTML_REHYPE_PLUGINS` is exported for untrusted content. This behavior is unchanged from AionUi. `customCss` still passes through `addImportantToAll`, exactly as today.
5. **Reliability:** AionUi's existing gates stay green after every phase: `bunx tsc --noEmit`, `bun run test`, `bun run lint`, `bun run i18n:types`, `node scripts/check-i18n.js`.
6. **Scale:** a single maintainer. No CI publishing pipeline is in scope; publishing is manual (`npm publish`).

## 3. Scope (approved)

### A — generic as-is (copy; old path becomes a re-export)

| Library name                                               | Source                                                                            |
| ---------------------------------------------------------- | --------------------------------------------------------------------------------- |
| AionCollapse                                               | `components/base/AionCollapse.tsx`                                                |
| AionScrollArea                                             | `components/base/AionScrollArea.tsx`                                              |
| AionSelect                                                 | `components/base/AionSelect.tsx`                                                  |
| AionSteps                                                  | `components/base/AionSteps.tsx`                                                   |
| AionInlineSearchInput (+ `.module.css`)                    | `components/base/AionInlineSearchInput.tsx`                                       |
| ForkBranchIcon                                             | `components/base/ForkBranchIcon.tsx`                                              |
| ShimmerText                                                | `components/ShimmerText.tsx`                                                      |
| IconParkHOC                                                | `components/IconParkHOC.tsx`                                                      |
| MentionMenuShell                                           | `components/chat/MentionMenuShell.tsx`                                            |
| SlashCommandMenu                                           | `components/chat/SlashCommandMenu.tsx`                                            |
| ThemedLogo                                                 | `components/agent/ThemedLogo.tsx`                                                 |
| **HorizontalScroller** (renamed)                           | `components/media/HorizontalFileList.tsx`                                         |
| FlexFullContainer                                          | `components/layout/FlexFullContainer.tsx`                                         |
| AppLoader                                                  | `components/layout/AppLoader.tsx`                                                 |
| SortableSiderEntry                                         | `components/layout/Sider/SortableSiderEntry.tsx`                                  |
| PreferenceRow                                              | `components/settings/SettingsModal/contents/SystemModalContent/PreferenceRow.tsx` |
| SettingsPageHeader                                         | `pages/settings/components/SettingsPageHeader.tsx`                                |
| SectionCard, FieldLabel, ConfigRow, ReadonlySelectionField | `pages/settings/AssistantSettings/editor/editorSectionPrimitives.tsx`             |
| **CollapseGroup** (renamed)                                | `pages/conversation/components/WorkspaceCollapse.tsx`                             |
| **Section**, **SectionDivider** (renamed)                  | `pages/conversation/SourceControl/ScmSection.tsx`                                 |

**Hooks:** `hooks/ui/{useDebounce,useThrottle,useLatestRef,useIndexedItemRefs,useResizableSplit}`, `hooks/ui/font/useSystemFonts`, `hooks/chat/{useCompositionInput,useAutoScroll,useTypingAnimation}`, `pages/conversation/Preview/hooks/useTabOverflow` (+ tab constants from `Preview/constants.ts`).

**Utils:** `utils/ui/{clipboard,focus,HOC,ModalHOC,createContext,dndModifiers}`, `removeStack` from `utils/common.ts`, `utils/url.ts`.

**Excluded:** `StepsWrapper`, `ModalWrapper` (they duplicate AionSteps/AionModal), and `WebviewHost` + `webviewHistory` (Electron-only).

### B — decoupled (library component + AionUi adapter at the old path)

| Library name                                                                                                                                    | Source                                                                                   | Coupling removed                                                                      | Pattern    |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ---------- |
| AionModal                                                                                                                                       | `components/base/AionModal.tsx`                                                          | ThemeContext.fontScale, i18n                                                          | P1, P2     |
| AionSearchInput (+css)                                                                                                                          | `components/base/AionSearchInput.tsx`                                                    | i18n                                                                                  | P1         |
| FileChangesPanel                                                                                                                                | `components/base/FileChangesPanel.tsx`                                                   | i18n                                                                                  | P1         |
| CollapsibleContent                                                                                                                              | `components/chat/CollapsibleContent.tsx`                                                 | ThemeContext.theme (→ CSS var), i18n                                                  | P1, P2     |
| ThoughtDisplay                                                                                                                                  | `components/chat/ThoughtDisplay.tsx`                                                     | i18n                                                                                  | P1         |
| EmojiPicker                                                                                                                                     | `components/chat/EmojiPicker.tsx`                                                        | i18n (`builtinAvatars` is already a prop)                                             | P1         |
| MobileActionSheet (+css, types)                                                                                                                 | `components/chat/MobileActionSheet/` (not `useAttachEntry`)                              | i18n                                                                                  | P1         |
| RuntimeSelectorPill + MarqueePillLabel                                                                                                          | `components/agent/`                                                                      | LayoutContext.isMobile                                                                | P2         |
| SiderItem                                                                                                                                       | `components/layout/Sider/SiderItem.tsx`                                                  | LayoutContext.isMobile                                                                | P2         |
| FontSizeStepper                                                                                                                                 | `components/settings/SettingsModal/contents/AppearanceModalContent/FontSizeStepper.tsx`  | i18n                                                                                  | P1         |
| ScaleControl                                                                                                                                    | `components/settings/ScaleControl.tsx`                                                   | ThemeContext, useFontScale → controlled `value`/`onChange`                            | P2, P4     |
| DirInputItem                                                                                                                                    | `components/settings/SettingsModal/contents/SystemModalContent/DirInputItem.tsx`         | `ipcBridge.dialog.showOpen` → `onBrowse`                                              | P3         |
| WindowControls                                                                                                                                  | `components/layout/WindowControls.tsx`                                                   | `ipcBridge.windowControls.*` → `isMaximized` + `onMinimize/onMaximize/onClose`        | P3         |
| UploadProgressBar                                                                                                                               | `components/media/UploadProgressBar.tsx`                                                 | useUploadState → `items`, `onAbort`                                                   | P4         |
| FilePreview                                                                                                                                     | `components/media/FilePreview.tsx`                                                       | ipcBridge.fs, FileService, format → `name`, `size`, `thumbnailSrc`                    | P4         |
| ContextUsageIndicator                                                                                                                           | `components/agent/ContextUsageIndicator.tsx`                                             | storage types, i18n format → `usage` + formatters (`Intl` defaults)                   | P4, P5     |
| **TabBar** (renamed)                                                                                                                            | `pages/conversation/Preview/components/PreviewPanel/PreviewTabs.tsx`                     | i18n                                                                                  | P1, P5     |
| **TabToolbar** (renamed)                                                                                                                        | `…/PreviewPanel/PreviewToolbar.tsx` (+ `previewToolbarUtils.ts`)                         | i18n, chatFile type                                                                   | P1, P5     |
| **TabContextMenu** (renamed)                                                                                                                    | `…/PreviewPanel/PreviewContextMenu.tsx`                                                  | i18n, `isMacOS` → prop                                                                | P1, P3     |
| `/markdown`: Markdown, CodeBlock, markdownComponents, markdownUtils, MermaidBlock, WavedromBlock, DiagramZoomOverlay, ShadowView, LocalFileLink | `components/Markdown/`                                                                   | PreviewContext, LayoutContext, ipcBridge.theme, openExternalUrl, LocalImageView, i18n | P1–P3      |
| `/markdown`: Diff2Html (+css)                                                                                                                   | `components/media/Diff2Html.tsx` (+ `utils/file/diffUtils.ts`, `utils/file/fileType.ts`) | ThemeContext, usePreviewLauncher → `onOpenFile`                                       | P2, P3, P5 |
| `/markdown` utils                                                                                                                               | `utils/chat/latexDelimiters.ts`, `utils/theme/customCssProcessor.ts`                     | none                                                                                  | –          |

### C — stays in AionUi

Everything else: SendBox and the chat menus, agent selectors, Butler/Feedback buttons, app layout/router/sider/titlebar, all settings panes and channel forms, update flow, workspace pickers, FileAttachButton, LocalImageView, all other `pages/`, and hooks under `agent|assistant|config|context|file|mcp|system`.

## 4. Decoupling patterns

| #   | Pattern      | Rule                                                                                                                                                                 |
| --- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P1  | Labels       | No i18next in the library. Every string comes from `useUi().labels`, which holds English defaults. AionUi supplies its `t()` values once.                            |
| P2  | Environment  | `isMobile`, `fontScale`, `theme` come from `useUi()`. Where CSS can express it (CollapsibleContent's gradient), use a CSS variable instead.                          |
| P3  | Host actions | App actions become optional callback props. **A missing callback hides the feature and never breaks it.** Links default to `window.open(url, '_blank', 'noopener')`. |
| P4  | Data         | Store and service reads become props. The AionUi adapter does the fetching.                                                                                          |
| P5  | Types        | Copy the minimal types into `src/types.ts` (`PreviewTab`, `TokenUsage`, the office-preview file type, the chatFile subset).                                          |

## 5. Design

### 5.1 Build: Vite library mode

- Two entries: `src/index.ts` → `@aionui/ui`, and `src/markdown.ts` → `@aionui/ui/markdown`. ESM, `preserveModules`, all peers external.
- Plugins: `unocss/vite` (scans `packages/ui/src/**` only) and the icon-park transform copied from `packages/desktop/electron.vite.config.ts` (`iconParkPlugin`), pointed at the library's own `IconParkHOC`. The transform runs at library build time, so published components already carry AionUi's icon defaults (size 16, stroke 3, secondary fill, `cursor-pointer`). Consumers need nothing extra.
- CSS output: `dist/styles.css` (tokens + base + component CSS + UnoCSS output) and `dist/arco-theme.css` (the global Arco overrides, opt-in).
- Types: `tsc -p tsconfig.build.json --emitDeclarationOnly`.

### 5.2 Package layout

```
packages/ui/
├─ package.json  tsconfig.json  tsconfig.build.json  vite.config.ts  uno.config.ts
├─ LICENSE  NOTICE  README.md
├─ src/
│  ├─ index.ts  markdown.ts  types.ts
│  ├─ provider/      UiProvider, useUi, defaultLabels
│  ├─ tokens/        colors.ts, unoTheme.ts
│  ├─ styles/        base.css, default-color-scheme.css, arco-override.css, index.css
│  ├─ icons/         IconParkHOC, ForkBranchIcon, ThemedLogo
│  ├─ components/
│  │  ├─ layout/     CollapseGroup, Section, FlexFullContainer, AppLoader, AionScrollArea,
│  │  │              HorizontalScroller, SiderItem, SortableSiderEntry, WindowControls
│  │  ├─ inputs/     AionSelect, AionSearchInput, AionInlineSearchInput, FontSizeStepper,
│  │  │              ScaleControl, DirInputItem, EmojiPicker
│  │  ├─ overlays/   AionModal, MentionMenuShell, SlashCommandMenu, MobileActionSheet
│  │  ├─ display/    AionCollapse, AionSteps, ShimmerText, CollapsibleContent, ThoughtDisplay,
│  │  │              RuntimeSelectorPill, ContextUsageIndicator, FileChangesPanel
│  │  ├─ settings/   PreferenceRow, SettingsPageHeader, SectionCard
│  │  ├─ files/      FilePreview, UploadProgressBar
│  │  └─ tabs/       TabBar, TabToolbar, TabContextMenu, useTabOverflow
│  ├─ markdown/      Markdown, CodeBlock, MermaidBlock, WavedromBlock, DiagramZoomOverlay,
│  │                 ShadowView, LocalFileLink, Diff2Html, markdownUtils, utils/
│  ├─ hooks/         9 hooks + index.ts
│  └─ utils/         clipboard, focus, HOC, ModalHOC, createContext, dndModifiers, removeStack, url
├─ tests/
└─ playground/       electron-vite app (main + renderer)
```

- Each component lives in its own folder with `Component.tsx` + `index.ts`. There are category barrels and a root barrel.
- It follows `AGENTS.md`: ≤10 entries per directory, PascalCase files, `type` over `interface`, UnoCSS + CSS Modules, no raw interactive HTML.
- **Tokens:** the library owns them. The theme block in the root `uno.config.ts` moves to `packages/ui/src/tokens/unoTheme.ts`, and the root config imports it back.

### 5.3 `package.json` essentials

- `name: "@aionui/ui"`, `version: "0.1.0"`, `license: "Apache-2.0"`, `type: "module"`, `sideEffects: ["**/*.css"]`
- `exports`: `"."`, `"./markdown"` (each with `types` + `import`), `"./styles.css"`, `"./arco-theme.css"`
- `files`: `["dist", "LICENSE", "NOTICE"]`
- `peerDependencies`: `react >=18.2`, `react-dom >=18.2`, `@arco-design/web-react ^2.66`, `@icon-park/react ^1.4`, plus the `/markdown` and dnd-kit packages, which are marked optional via `peerDependenciesMeta`
  - `/markdown` peers: react-markdown, remark-gfm, remark-math, remark-breaks, rehype-katex, rehype-raw, rehype-sanitize, katex, react-syntax-highlighter, mermaid, wavedrom, json5, postcss, diff2html
  - dnd-kit peers: `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`
- `dependencies`: `classnames`
- `scripts`: `build`, `build:watch`, `typecheck`, `test`, `playground`

### 5.4 Public API

```ts
type UiLabels = { cancel: string; confirm: string; clear: string; copy: string; copySuccess: string;
  copyFailed: string; collapse: string; expand: string; expandMore: string; viewMoreLines: string;
  back: string; close: string; zoomIn: string; zoomOut: string; zoomReset: string; diagramZoomHint: string;
  preview: string; processing: string; retryStart: string; minuteShort: string; secondShort: string;
  /* …exactly one key per i18n key used by in-scope files */ };
type UiContextValue = { labels: UiLabels; isMobile: boolean; fontScale: number; theme: 'light' | 'dark' };

<UiProvider labels?: Partial<UiLabels> isMobile? fontScale? theme?>{children}</UiProvider>
useUi(): UiContextValue   // defaults: English labels, isMobile=false, fontScale=1, theme='light'

<Markdown source onOpenPreview? onLinkClick? renderLocalImage? renderLocalFileLink? customCss? />
```

- Nested `UiProvider`s: the inner one wins.
- The library holds no global state.

### 5.5 Data flow and AionUi wiring

```
AionUi root: ThemeContext + LayoutContext + t()  ─►  <UiBridge> → <UiProvider>  ─►  library components
AionUi adapter at old path: ipcBridge / stores / PreviewContext  ─►  props  ─►  library component
```

- `renderer/components/UiBridge.tsx` is new in AionUi and is mounted once inside the existing Theme and Layout providers. It maps existing i18n keys to `labels`, adds **no new user-facing strings**, and needs no locale changes.
- The Markdown adapter (`components/Markdown/index.tsx`) wires `PreviewContext.openPreview`, `openExternalUrl`, `LocalImageView`, and the live `customCss` from `ipcBridge.theme.requestCurrent` / `ipcBridge.theme.changed`.
- Group A old paths become one-line re-exports that keep the original names (`export { HorizontalScroller as default } from '@aionui/ui'`).

### 5.6 Consumption

- The root `package.json` gets `"@aionui/ui": "workspace:*"`.
- AionUi consumes the **built dist**. The root scripts `predev`, `prestart`, `pretest` and `prepackage` run `bun run --cwd packages/ui build`. Use `build:watch` while editing the library.
- AionUi's renderer imports `@aionui/ui/styles.css` and `@aionui/ui/arco-theme.css` in place of its own copies.
- Other projects: `npm i @aionui/ui @arco-design/web-react @icon-park/react`, `import '@aionui/ui/styles.css'` (and optionally `arco-theme.css`), then wrap the app in `<UiProvider>` if non-English labels are needed.

### 5.7 Testing and verification

| Check                        | How                                                                                                                                                        |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Nothing from AionUi leaks in | `packages/ui/tsconfig.json` has **no** AionUi path aliases, so any leftover import fails `tsc --noEmit`                                                    |
| Group A behavior             | Tests whose subject moves also move (e.g. `ThemedLogo`, `horizontalFileList`, `diagramZoomOverlay`)                                                        |
| Group B behavior             | Tests stay in AionUi and run through the adapters, unchanged (Markdown/Mermaid/Wavedrom/ShadowView, ThoughtDisplay, RuntimeSelectorPill, FontSizeStepper…) |
| Entries render               | One smoke test per entry renders every export with no provider                                                                                             |
| Dist is complete             | `npm pack --dry-run`, plus a test that imports `dist/index.js` and `dist/markdown.js` and asserts the exports and CSS files exist                          |
| Icons                        | The smoke test asserts that an icon-park icon renders with size 16 / stroke 3                                                                              |
| Visual                       | Electron playground: sidebar of components, light/dark and desktop/mobile toggles, and a real frameless window for WindowControls                          |
| AionUi unchanged             | `bunx tsc --noEmit`, `bun run test`, `bun run lint`, i18n checks, a manual `bun start`, and a diff of the generated UnoCSS output before and after Phase 5 |

### 5.8 Migration phases

Each phase ends with AionUi green and one commit.

| Phase            | Work                                                                                                          | Exit check                                               |
| ---------------- | ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| 0. Prerequisites | `git init` + commit the untouched source; `bun install`; record baseline results for `tsc`, `test` and `lint` | Baseline recorded                                        |
| 1. Scaffold      | `packages/ui` config, tokens, styles, `UiProvider`, empty playground, workspace dependency, root pre-scripts  | `build` emits `dist/` + both CSS files; AionUi unchanged |
| 2. Group A       | Copy files; old paths become re-exports; move their tests                                                     | Library `tsc` + tests pass; AionUi green                 |
| 3. Group B core  | Apply P1–P5; adapters; mount `UiBridge`                                                                       | AionUi's B tests pass unchanged                          |
| 4. `/markdown`   | Markdown bundle + Diff2Html + Markdown adapter                                                                | All markdown tests pass in AionUi                        |
| 5. Tokens        | Root `uno.config.ts` imports `unoTheme.ts`                                                                    | Generated CSS is identical before and after              |
| 6. Verify        | Smoke + dist tests, `npm pack --dry-run`, playground walk-through, `bun start`                                | All checks green                                         |

## 6. Risks

| #   | Risk                                                                                           | Mitigation                                                                                                  |
| --- | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| R1  | Utility classes in `styles.css` (`flex`, `text-1`…) may clash with a project's Tailwind/UnoCSS | Harmless in AionUi (identical rules). Documented for 0.x; add a UnoCSS `prefix` if a real project conflicts |
| R2  | The icon-park transform regex only matches `import { A, B } from '@icon-park/react'`           | Same limitation as today; the smoke test checks icon defaults                                               |
| R3  | `postcss` in the browser bundle (ShadowView)                                                   | Only in `/markdown`; unchanged from today                                                                   |
| R4  | Arco 2.x peer range officially lists React ≤18                                                 | AionUi already runs it on React 19; keep `>=18.2`                                                           |
| R5  | No git and no installed dependencies in the workspace                                          | Phase 0                                                                                                     |
| R6  | ~31 adapters add wiring code to AionUi                                                         | Each is thin; remove them as call sites switch to `@aionui/ui` directly                                     |

## 7. Decision log

| #   | Decision                                                                           | Alternatives considered                         | Why                                                                         |
| --- | ---------------------------------------------------------------------------------- | ----------------------------------------------- | --------------------------------------------------------------------------- |
| D1  | Scope = groups A + B                                                               | All components; A only                          | A/B are presentation; C is business logic                                   |
| D2  | Arco + icon-park as peers, precompiled CSS                                         | UnoCSS preset; framework-agnostic rewrite       | Least rewrite; consumers don't need UnoCSS                                  |
| D3  | English defaults + `UiProvider` for labels                                         | Ship i18next locales; per-component label props | No i18next dependency; AionUi wires it once                                 |
| D4  | `packages/ui` in the AionUi monorepo                                               | Separate repo                                   | `workspace:*` linking works now; still publishable                          |
| D5  | Include ContextUsageIndicator, ThoughtDisplay, WindowControls, Markdown/Diff2Html  | Exclude as chat- or Electron-specific           | Maintainer's choice                                                         |
| D6  | Adapters/re-exports at old paths                                                   | Rewrite AionUi call sites                       | Zero call-site churn; existing tests keep passing                           |
| D7  | Rename domain-named generics (CollapseGroup, Section, HorizontalScroller, TabBar…) | Keep original names                             | Generic names in a generic library; adapters keep the old names             |
| D8  | Electron + Vite playground                                                         | Browser Vite page; Storybook; tests only        | Maintainer's choice; tests WindowControls in a real frameless window        |
| D9  | Reproduce the icon-park transform in the library build                             | Leave it to consumers                           | Otherwise icons render at the wrong size, stroke and color                  |
| D10 | Vite library mode                                                                  | tsup; plain Rollup                              | Same toolchain; native CSS Modules; reuses the UnoCSS and icon-park plugins |
| D11 | Category folders, per-component barrels, tokens owned by the library               | Flat folders; tokens stay in AionUi             | ≤10-entry rule; one source for tokens                                       |
| D12 | `UiProvider` + Markdown host props; missing callbacks hide features                | Props only everywhere                           | One wiring point; safe defaults                                             |
| D13 | AionUi consumes the built dist via pre-scripts                                     | Alias to library source                         | AionUi runs exactly what npm consumers get                                  |
| D14 | `arco-theme.css` as a separate opt-in                                              | Single CSS file                                 | Doesn't restyle other projects' Arco components                             |
| D15 | Tests move only when their subject moves; add smoke + dist tests                   | Duplicate the tests                             | No duplication; adapters keep proving AionUi works                          |
| D16 | Phase 0: git init, install, baseline                                               | Start migrating directly                        | Rollback point; separates old failures from new ones                        |

## 8. Implementation notes and deviations

What changed relative to §3–§6 while implementing, and why. Each item was found by a build, a test or a CSS comparison, not assumed.

| #   | Deviation                                                                                                                                                                                                                                                    | Why                                                                                                                                                                                                                                                                                                                |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| D17 | `@dnd-kit/*` is a **required** peer (not optional)                                                                                                                                                                                                           | Core-entry modules import it; a bundler resolves every import reachable from an entry, so an optional peer would break consumers that skip it                                                                                                                                                                      |
| D18 | `exports["./*"]` exposes every module; AionUi re-exports use **deep imports** (`@aionui/ui/components/...`), never the root barrel                                                                                                                           | Importing the barrel evaluates every module, which broke AionUi tests with partial `vi.mock('@icon-park/react' / '@arco-design/web-react')` factories and made re-exports load far more than their originals                                                                                                       |
| D19 | Every source module is a Vite build **entry**                                                                                                                                                                                                                | Rollup keeps full export signatures only for entries; a default export only re-exported by name (CollapsibleContent) was dropped. Found by AionUi's production build, not by tests                                                                                                                                 |
| D20 | The icon-park transform emits `lazyIconParkHOC(() => Icon)`                                                                                                                                                                                                  | Wrapping at module load read icon bindings that partial test mocks did not provide; resolving on render restores the original semantics                                                                                                                                                                            |
| D21 | AionUi imports `@aionui/ui/styles.css` from Phase 2 (not Phase 5)                                                                                                                                                                                            | CSS-module rules of moved components exist only in the library's stylesheet. Found by inspecting the AionUi build output                                                                                                                                                                                           |
| D22 | `withUiBridge(Component, [bridges])` at old AionUi paths, and `AppUiBridge` at the root                                                                                                                                                                      | Keeps each old path's contract for isolated renders and tests: labels come from AionUi's `t()` using **the same call form** as the original (`t(k)`, `t(k, {defaultValue})`, `t(k, 'default')`), and only the contexts the original read (Theme/Layout) are read. Inside the app it renders the component directly |
| D23 | The theme bridge lives in its own module (`UiThemeBridge.tsx`)                                                                                                                                                                                               | Importing ThemeContext pulls in the theme engine and config service; re-exports whose originals did not import it must not either                                                                                                                                                                                  |
| D24 | `UiProvider` gained `locale`; separate `copyLink` label                                                                                                                                                                                                      | Number/currency/byte formatting follows the app language; LocalFileLink and CodeBlock resolved "Copy" with different `t()` forms                                                                                                                                                                                   |
| D25 | Design tokens are shared as a config spread (`aionuiUnoConfig()`), not a UnoCSS `Preset`                                                                                                                                                                     | As a preset the custom rules and theme lost precedence to presetMini/Wind3 (`text-2` → bg color, `font-mono` → default stack)                                                                                                                                                                                      |
| D26 | Root `uno.config` also scans `packages/ui/dist/**/*.js` (`content.filesystem`)                                                                                                                                                                               | Library-only utilities were otherwise emitted only in the early `styles.css`, which changes cascade order against AionUi's utilities. Verified by diffing against the pre-migration build: rule set identical apart from notation, and no order changes that affect values                                         |
| D27 | Only custom-property token files are deduplicated in AionUi (`default-color-scheme.css`, the `:root` font/overlay block, `colors.ts`). Other duplicated rules (`.i-icon`, `.aionui-modal*`, window controls, `arco-override` Arco rules) stay in both places | Removing them from AionUi would move them ahead of AionUi's `uno.css` and could flip cascade outcomes, for example `.i-icon` versus a `flex` utility on the same element                                                                                                                                           |
| D28 | Five AionUi tests changed, all mechanically: 4 mock a moved internal at its `@aionui/ui` path, 2 read token CSS at its new path                                                                                                                              | These mocked or read internals that now live in the library; the stubs and assertions are unchanged                                                                                                                                                                                                                |
| D29 | `postinstall` also builds the library                                                                                                                                                                                                                        | CI runs `bunx tsc` / `bunx vitest` directly (no `pre*` hooks), and both need `dist/`, including `.d.ts`                                                                                                                                                                                                            |
| D30 | Removed `declare module 'unocss'` from AionUi's `types.d.ts`                                                                                                                                                                                                 | The shorthand ambient module typed every `unocss` import as `any` and broke the shared, typed token config; root `tsc` stays clean without it                                                                                                                                                                      |

**Known observation (not changed):** in the playground, Mermaid node labels can clip. ShadowView's `code span { font-family: var(--font-mono) }` also matches Mermaid's HTML labels, while Mermaid measures text in the main document. The CSS and component are unchanged from AionUi. This was not verified against the running AionUi app.
