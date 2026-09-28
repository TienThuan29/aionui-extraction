# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`@aionui/ui`: a React component library extracted from the AionUi monorepo, built on Arco Design + icon-park. Two public entries: core (`src/index.ts`) and `@aionui/ui/markdown` (`src/markdown.ts`, heavy renderers: react-markdown, KaTeX, Mermaid, WaveDrom, diff2html). The core entry must never import from `src/markdown/`. Background and decisions live in `docs/design.md` (§4 decoupling patterns, §8 deviations D17–D30); `docs/component-docs.md` covers the docs playground.

## Commands (bun)

```bash
bun run build          # vite lib build + tsc declarations -> dist/
bun run test           # runs `build` first (pretest), then vitest
bunx vitest run tests/url.test.ts   # single test file (no rebuild; tests/dist.test.ts needs a fresh dist/)
bunx vitest run -t "name"           # single test by name
bun run typecheck      # tsc --noEmit over src, tests, playground, scripts
bun run lint           # oxlint;  bun run format / format:check  (oxfmt)
bun run playground     # Electron docs app (live examples, props tables)
bun run docs:props     # regenerate playground/docs/props.generated.json after changing component props/JSDoc
bun run playground:pack  # portable Windows exe of the docs into release/
```

## Architecture

- **Every source file is a build entry** (`vite.config.ts`, `preserveModules`), so deep imports like `@aionui/ui/components/display/X/X` are public API. All deps and peers are external. Library source must use **relative imports only** (tsc does not rewrite aliases in `.d.ts`). The `@aionui/ui` alias (`selfAlias` in `vitePlugins.ts`) is for playground and tests only.
- **icon-park transform** (`vitePlugins.ts`): at build time, every named `@icon-park/react` import in `src/**/*.tsx` is rewritten to go through `lazyIconParkHOC`, which applies AionUi's icon defaults. Playground examples are not transformed. Tests use the same plugin.
- **Styles**: UnoCSS generates the utility classes into `dist/styles.css`, scanning only `src/` and `playground/` (`uno.config.ts`). Design tokens live in `src/tokens/unoPreset.ts` as a config spread, not a preset (D25). `src/styles/arco-theme.css` is emitted separately as an opt-in `arco-theme.css`. Components that use CSS modules keep a `.module.css` next to the component. Theme keys off `data-theme` / `data-color-scheme` on `<html>` and `arco-theme` on `<body>`.
- **Decoupling rules** (keep them when adding or changing components):
  - No i18n library. Every user-facing string comes from `useUi().labels`, with English defaults in `src/provider/defaultLabels.ts`. Parameterized labels are functions.
  - `isMobile`, `fontScale`, `theme` and `locale` come from `useUi()`. `UiProvider` is optional and every value has a default.
  - Host actions are optional callback props. A missing callback hides the feature and must never break it.
  - Data comes in through props, never from stores or IPC. Shared minimal types live in `src/types.ts`.
- **Markdown**: renders inside a shadow root (`ShadowView`). Host integrations go through props or `MarkdownHostProvider`. Raw HTML is off by default. `allowHtml` parses HTML without sanitizing; `SANITIZED_HTML_REHYPE_PLUGINS` is for untrusted content.
- **Component layout**: `src/components/<group>/<Name>/{<Name>.tsx, index.ts}`. Each group has a barrel re-exported from `src/components/index.ts`. Files carry the Apache-2.0 license header.

## Docs playground (enforced by tests)

`playground/docs/registry.ts` auto-discovers pages from `playground/docs/<Page>/meta.ts` + `examples/<Name>.tsx`. Examples import only `@aionui/ui`, `@aionui/ui/markdown` and peer packages, and the page shows the example file's own source as the copyable code. Props tables are generated from TS types + JSDoc. `bun run test` fails if:

- an exported component is on no page (`tests/docsCoverage.test.ts`)
- an example fails to render
- `props.generated.json` is stale. Run `bun run docs:props`.

When adding a component: export it, document its props with JSDoc, add a docs folder, then run `docs:props`.

## Style

oxfmt: single quotes (JSX too), semicolons, 120 cols, trailing comma es5. oxlint enforces `consistent-type-imports` (`import type`) and `no-floating-promises`. Commits follow Conventional Commits (`feat(scope): …`, `fix(markdown): …`, `docs(playground): …`).
