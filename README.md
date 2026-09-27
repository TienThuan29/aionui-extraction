# @aionui/ui

Reusable React UI components extracted from [AionUi](https://github.com/iOfficeAI/AionUi), built on
[Arco Design](https://arco.design/react) and [icon-park](https://iconpark.oceanengine.com/).

- **Core entry** `@aionui/ui`: layout, inputs, overlays, display, settings and tab components, hooks, utils, design tokens.
- **Markdown entry** `@aionui/ui/markdown`: Markdown renderer with code highlighting, KaTeX, Mermaid, WaveDrom and a diff viewer.

## Install

```bash
npm i @aionui/ui @arco-design/web-react @icon-park/react @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
# only if you use @aionui/ui/markdown:
npm i react-markdown remark-gfm remark-math remark-breaks rehype-katex rehype-raw rehype-sanitize \
  katex react-syntax-highlighter mermaid wavedrom json5 postcss diff2html
```

Requires React 18.2+.

## Setup

```tsx
import '@arco-design/web-react/dist/css/arco.css';
import '@aionui/ui/styles.css'; // tokens, base styles, component styles, utility classes
import '@aionui/ui/arco-theme.css'; // optional: AionUi's look for ALL Arco components, html/body font, scrollbars
```

Set the theme attributes on the document (the color tokens and Arco's dark mode key off them):

```html
<html data-color-scheme="default" data-theme="light">
  <!-- or data-theme="dark" -->
  <body arco-theme="light">
    <!-- keep in sync with data-theme -->
  </body>
</html>
```

`styles.css` includes a small global reset (UnoCSS preflight: `* { color: inherit }` and a zero
border baseline), the same one Tailwind ships.

## Usage

```tsx
import { AionModal, AionSelect, UiProvider } from '@aionui/ui';

<UiProvider theme='dark' isMobile={false} locale='de-DE' labels={{ cancel: 'Abbrechen', confirm: 'OK' }}>
  <App />
</UiProvider>;
```

`UiProvider` is optional. Without it, components use English labels, desktop layout, scale 1, the
light theme and `en-US` number formatting. Labels with parameters are functions (for example
`viewMoreLines: (count) => ...`), so your i18n library keeps control of plurals. The full list is
in `defaultLabels`.

### Markdown

```tsx
import { Markdown } from '@aionui/ui/markdown';

<Markdown
  onOpenLink={(href) => openInBrowser(href)} // default: window.open(href, '_blank', 'noopener')
  onOpenPreview={(source, { title }) => showPanel(source, title)} // shows "open in panel" on diagrams
  renderLocalImage={(img) => <MyImage {...img} />} // images whose src is a local path
  customCss={themeCss} // injected into the shadow root, made !important
>
  {text}
</Markdown>;
```

Every host prop is optional. Leaving one out hides the feature it drives; nothing breaks.
Raw HTML is off unless you pass `allowHtml`, which parses HTML **without** sanitizing, so only use
it for trusted content. `SANITIZED_HTML_REHYPE_PLUGINS` is exported for untrusted content.

### Deep imports

Every module is also available at its own path, for example
`@aionui/ui/components/display/CollapsibleContent/CollapsibleContent`. Importing one module
that way loads only that module, not the whole entry.

## Known limitations (0.x)

- The utility classes in `styles.css` (`flex`, `text-1`, ...) use the same names as Tailwind or UnoCSS
  and can clash with a project's own utilities that define the same class differently.
- The icon-park defaults (size 16, stroke 3, secondary color) are applied when the library is built.
  They only affect icons inside library components.

## Development

```bash
bun run build        # dist/ (JS + .d.ts + styles.css + arco-theme.css)
bun run test         # builds first, then smoke/dist/unit tests
bun run playground   # component docs: live examples, copyable code, props tables (light/dark, desktop/mobile)
bun run docs:props   # regenerate playground/docs/props.generated.json after changing component props
PLAYGROUND_SHOTS=./shots bun run playground:build && electron playground/out/main/index.js   # screenshots
```

### Documenting a component

Each docs page is a folder `playground/docs/<Page>/` with a `meta.ts` (title, group, description,
components, examples, notes) and `examples/<Name>.tsx` files. An example file default-exports the demo
and imports only `@aionui/ui`, `@aionui/ui/markdown` and peer packages; the page shows the same file as
its copyable code. Props tables come from the TypeScript types and their JSDoc, so describe new props
with JSDoc and run `bun run docs:props`. `bun run test` fails when a page, an example or the props data
is missing or stale. See `docs/component-docs.md` for the design.

## License

Apache-2.0. See `LICENSE` and `NOTICE`.
