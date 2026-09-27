import type { DocPage } from '../types';

const page: DocPage = {
  title: 'Hooks & utils',
  group: 'Hooks & utils',
  order: 1,
  description:
    'React hooks, helpers and design tokens exported next to the components. Everything here comes from `@aionui/ui` unless noted.',
  examples: [
    {
      file: 'DebounceThrottle',
      title: 'useDebounce and useThrottle',
      description: 'Type quickly: the debounced call waits for a pause, the throttled one fires at most every 500ms.',
    },
    {
      file: 'ResizableSplit',
      title: 'useResizableSplit',
      description:
        'Drag the divider; double-click resets it. With `storageKey` the width is remembered. Put the handle inside the resized panel.',
    },
    {
      file: 'Streaming',
      title: 'useTypingAnimation and useAutoScroll',
      description: 'Streamed text types out smoothly, and the list follows new content while you are near the bottom.',
    },
    {
      file: 'Composition',
      title: 'useCompositionInput',
      description:
        'Enter sends, Shift+Enter adds a line, and Enter that confirms an IME candidate (Chinese, Japanese, Vietnamese…) is ignored.',
    },
    {
      file: 'ModalHOCExample',
      title: 'ModalHOC',
      description:
        'Turns a modal body into a component with `useModal()`, returning an `open()`/`close()` controller and the element to render.',
    },
    {
      file: 'Formatting',
      title: 'Formatting and clipboard',
      description:
        '`formatNumber`, `formatCurrency` and `formatByteSize` take a locale (UiProvider `locale` by convention); `copyText` works without the Clipboard API too.',
    },
    {
      file: 'SystemFonts',
      title: 'useSystemFonts',
      description:
        'Lists installed font families through the Local Font Access API. `load()` must run in a user gesture.',
    },
  ],
  snippets: [
    {
      title: 'Hooks reference',
      language: 'typescript',
      code: `useDebounce(fn, delayMs, deps): typeof fn           // runs fn after calls stop for delayMs
useThrottle(fn, delayMs, deps): typeof fn           // runs fn at most once per delayMs (trailing call kept)
useLatestRef(value): { current: value }             // ref that always holds the latest value
useLatestCallback(fn): typeof fn                    // stable function that calls the latest fn
useIndexedItemRefs<T>(count): { itemRefs, setItemRef(index) }  // refs for a list of items
useResizableSplit(options): { splitRatio, setSplitRatio, dragHandle, createDragHandle(options) }
useSystemFonts(): { fonts, status: 'idle' | 'loading' | 'ready' | 'error', load() }
useCompositionInput(): { isComposing, isComposingState, compositionHandlers, createKeyDownHandler(onEnter, intercept?) }
useAutoScroll({ containerRef, content, enabled?, threshold?, behavior? }): void
useTypingAnimation({ content, enabled?, speed? }): { displayedContent, isAnimating }
useTabOverflow(deps): { tabsContainerRef, tabFadeState }   // see TabBar
useUi(): { labels, theme, isMobile, fontScale, locale }    // see Getting started`,
    },
    {
      title: 'Utilities reference',
      language: 'typescript',
      code: `copyText(text): Promise<void>
formatNumber(value, locale?, options?) · formatCurrency(amount, currency, locale?, options?) · formatByteSize(bytes, locale?, digits = 1)
parseHttpUrl(text): string | null                    // a single http(s) URL, or null
resolveSelectionHttpUrl(text, anchorNode, focusNode) // URL of a selection, also from the surrounding <a>
blurActiveElement() · blockMobileInputFocus(ms = 700) · shouldBlockMobileInputFocus()
removeStack(...cleanups): () => void                 // one cleanup that runs the others in reverse order
restrictToVerticalAxis · restrictToHorizontalAxis     // @dnd-kit modifiers
createContext(initial): [useValue, Provider, useSetValue]
HOC(Wrapper, props?)(Component) · ModalHOC(Body, defaultModalProps?)
cssVar / getCSSVar / cssVars · iconColors · diffColors · colorMapping   // design tokens`,
    },
    {
      title: 'createContext',
      description: 'A typed context with a setter in three lines; the Provider takes the initial `value`.',
      code: `import { createContext } from '@aionui/ui';

const [useFilter, FilterProvider, useSetFilter] = createContext('all');

function Tabs() {
  const setFilter = useSetFilter();
  return <button onClick={() => setFilter('mine')}>Mine ({useFilter()})</button>;
}

<FilterProvider value='all'>
  <Tabs />
</FilterProvider>;`,
    },
    {
      title: 'Markdown helpers',
      description: 'From `@aionui/ui/markdown`.',
      language: 'typescript',
      code: `convertLatexDelimiters(text)            // \\( \\) and \\[ \\] to $ and $$, outside code
processCustomCss(css) · wrapCustomCss(css) · addImportantToAll(css) · validateCss(css)
parseDiff(diff) · parseFilePathFromDiff(diff) · extractContentFromDiff(diff)
getFileTypeInfo(fileName) · EXTENSION_MAP     // language and preview type by extension
resolveLocalFileLinkReference(href)          // parse a local file link (see LocalFileLink)
MARKDOWN_REMARK_PLUGINS · SANITIZED_HTML_REHYPE_PLUGINS`,
    },
  ],
};

export default page;
