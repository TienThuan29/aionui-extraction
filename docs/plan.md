> **Origin note:** this is the design record of extracting this library out of the AionUi monorepo (`AionUi-main/packages/ui`). Paths such as `packages/desktop/...`, the root `uno.config.ts` and the "AionUi gates" refer to that repository, not to this one.

# `@aionui/ui` — Implementation Plan

- **Design:** `docs/superpowers/specs/2026-09-27-ui-library-extraction-design.md` (the scope tables, patterns P1–P5 and decisions D1–D16 are defined there)
- **Rule for every phase:** finish with AionUi's gates green (compared against the Phase 0 baseline), then one Conventional Commit (`<type>(ui): …`). Per `AGENTS.md`, commits carry no AI signature lines.
- **Gates:** `bunx tsc --noEmit` · `bun run test` · `bun run lint` (exit code only) · `bun run i18n:types && node scripts/check-i18n.js`

## Phase 0: Prerequisites

1. `git init`, then commit the untouched source (`chore: import AionUi source`).
2. `bun install`.
3. Run the gates and save the results to `docs/superpowers/plans/baseline.md`: exit codes, failing test names, type-error count.

**Exit:** the baseline is recorded and reported to the maintainer before Phase 1.

## Phase 1: Scaffold `packages/ui`

1. `packages/ui/package.json` as in design §5.3. Copy `LICENSE`; add a `NOTICE` that names the AionUi origin.
2. `tsconfig.json` (strict, `jsx: react-jsx`, **no** AionUi path aliases) and `tsconfig.build.json` (declaration-only output to `dist/`).
3. `vite.config.ts`: library mode with the `index` and `markdown` entries, `preserveModules`, peers external, `unocss/vite`, and a copy of `iconParkPlugin` importing `@/icons/IconParkHOC` (a library-local alias).
4. `uno.config.ts`: presets matching the root config; theme from `src/tokens/unoTheme.ts`; content restricted to `src/**`.
5. Move the token/theme sources:
   - Copy `styles/colors.ts` → `src/tokens/colors.ts`.
   - Copy `styles/themes/{base,default-color-scheme,index}.css` → `src/styles/`.
   - Copy `styles/arco-override.css` → `src/styles/arco-override.css`, emitted as `arco-theme.css`.
   - Extract the theme block from the root `uno.config.ts` into `src/tokens/unoTheme.ts`. The root file is not touched yet (Phase 5).
6. `src/provider/`: `UiProvider`, `useUi`, `defaultLabels` (keys from design §5.4, English values copied from AionUi's `en-US` locale).
7. `src/index.ts` and `src/markdown.ts`, initially exporting only the provider.
8. `playground/`: electron-vite app with main (one frameless `BrowserWindow`) and a renderer (sidebar, light/dark toggle, desktop/mobile toggle) importing `../src`.
9. Root `package.json`: add `"@aionui/ui": "workspace:*"` plus `predev`/`prestart`/`pretest`/`prepackage` → `bun run --cwd packages/ui build`.

**Exit:** `bun run --cwd packages/ui build` emits `dist/index.js`, `dist/markdown.js`, `dist/styles.css`, `dist/arco-theme.css` and `.d.ts` files; the gates match the baseline. **Commit:** `build(ui): scaffold @aionui/ui package`.

## Phase 2: Group A

For each row in design §3 group A, plus the hooks and utils:

1. Copy it into its category folder (`Component/Component.tsx` + `index.ts`) and rewrite imports to library-relative paths. Apply the renames (CollapseGroup, Section, HorizontalScroller).
2. Replace the AionUi original with a re-export that keeps the original name and default/named shape.
3. Add it to the category barrel and the root barrel.
4. Move its test, if one exists, into `packages/ui/tests` with fixed imports.
5. Add it to the playground.

**Exit:** library `typecheck` + `test` pass; the gates match the baseline. **Commit:** `refactor(ui): move generic components to @aionui/ui`.

## Phase 3: Group B core (everything outside `/markdown`)

1. Per component, apply the patterns listed in the design §3 table:
   - P1: `t('x')` → `useUi().labels.x`
   - P2: context reads → `useUi()`
   - P3/P4: new optional props
   - P5: types → `src/types.ts`
2. Rewrite the AionUi original as an adapter. It keeps the old props, reads ipcBridge/stores/contexts as it does today, and renders the library component.
3. Add `renderer/components/UiBridge.tsx` (maps existing i18n keys → labels; `isMobile` from LayoutContext; `theme` and `fontScale` from ThemeContext). Mount it once inside the existing providers.
4. Add each component to the playground.

**Exit:** AionUi's existing B tests pass **unchanged**; the i18n checks pass; the gates match the baseline. **Commit:** `refactor(ui): decouple shared components behind UiProvider`.

## Phase 4: `/markdown`

1. Move `components/Markdown/*` (except LocalImageView wiring), `Diff2Html` (+css), `diffUtils`, `fileType`, `latexDelimiters` and `customCssProcessor` into `src/markdown/`.
2. Replace `usePreviewContext` / `useOptionalPreviewContext` / `openExternalUrl` / `ipcBridge.theme` / `LocalImageView` with `<Markdown>` props carried through an internal context. Missing callbacks hide their feature.
3. The AionUi `components/Markdown/index.tsx` adapter wires PreviewContext, `openExternalUrl`, `LocalImageView` and live `customCss` from `ipcBridge.theme`.

**Exit:** the ~12 markdown/mermaid/wavedrom/shadowView tests in AionUi pass unchanged; the gates match the baseline. **Commit:** `refactor(ui): extract markdown renderer to @aionui/ui/markdown`.

## Phase 5: Single token source

1. Build AionUi's renderer and save the generated UnoCSS output (before).
2. The root `uno.config.ts` imports the theme from `packages/ui/src/tokens/unoTheme.ts`. AionUi's global styles import `@aionui/ui/styles.css` and `@aionui/ui/arco-theme.css` in place of the duplicated files, which are then deleted.
3. Rebuild and diff against the saved output.

**Exit:** no unexplained diff; the gates match the baseline. **Commit:** `refactor(ui): make @aionui/ui the single source of design tokens`.

## Phase 6: Verify

1. `tests/smoke.dom.test.tsx`: render every export of both entries with no provider. Assert that an icon-park icon has size 16 / stroke 3.
2. `tests/dist.test.ts`: after `build`, import `dist/index.js` and `dist/markdown.js`, check the export names and that the CSS files exist.
3. `npm pack --dry-run` in `packages/ui`: only `dist`, `LICENSE`, `NOTICE`, `package.json`, `README.md`.
4. `packages/ui/README.md`: install, CSS imports, `UiProvider`, the `/markdown` optional peers, and a note on risk R1.
5. Walk through every component in the playground (light/dark × desktop/mobile). Do one manual `bun start` of AionUi.

**Exit:** all checks green. **Commit:** `test(ui): add smoke and dist checks for @aionui/ui`.
