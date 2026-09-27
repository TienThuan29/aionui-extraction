# Standalone copy of `@aionui/ui`

- **Date:** 2026-09-27
- **Source:** `AionUi-main/packages/ui` at commit `58dff1d` (AionUi-main itself left untouched)
- **Target:** `ElectronUI-Extraction/aionui-ui` (this repository)

## Understanding summary

- Copy the `@aionui/ui` library out of the AionUi monorepo into an independent project, keeping the AionUi copy as it is.
- The two copies evolve independently. No syncing in either direction; they are expected to drift.
- The package name stays `@aionui/ui`.
- A fresh git repository with one initial commit; the detailed history stays in AionUi-main.
- The project must install, build, typecheck, test, lint/format and run its playground without AionUi-main.
- **Non-goals:** publishing to npm, changing component code or API, or switching AionUi to consume this copy.

## Assumptions

1. The copy contains only committed sources and config (`src/`, `tests/`, `playground/`, configs, `LICENSE`, `NOTICE`, `README.md`). It excludes `node_modules/`, `dist/` and `playground/out/`.
2. Bun is the package manager, as in AionUi. This project has its own `bun.lock` and `node_modules`.
3. Lint/format use AionUi's `.oxfmtrc.json`, `.oxlintrc.json` and `.gitattributes`, plus `oxlint`/`oxfmt` devDependencies and scripts.
4. Code logic is unchanged. Only `package.json`, root configs and comments that referred to the AionUi root config change.
5. **Non-functional:** performance and scale are not applicable. There are no secrets. Reliability means every existing check passes standalone. The maintainer owns it, with no sync mechanism.

## Risks

- `bun install` may hit the corporate TLS proxy, as in the AionUi Phase 0. Fallback: `--ignore-scripts`, with Electron extracted from the local cache.
- The two copies drift (accepted).

## Design

- **Copy:** `git archive 58dff1d:packages/ui`, which is exactly the committed content and is reproducible.
- **Root files added:**
  - `.gitignore`: the package's own, plus `node_modules/`.
  - `.oxfmtrc.json`: verbatim.
  - `.oxlintrc.json`: minus AionUi-only overrides.
  - `.gitattributes`: verbatim.
  - `docs/design.md` and `docs/plan.md`: with an origin note.
- **`package.json`:** adds the `lint`, `lint:fix`, `format` and `format:check` scripts, plus `oxlint ^1.56.0` and `oxfmt ^0.41.0`. Everything else is unchanged.
- **Verification** (all must pass before the commit):
  1. build: `dist/` with both stylesheets
  2. typecheck: 0 errors
  3. tests: 104/104
  4. lint: 0 errors; format clean
  5. `npm pack --dry-run`: only `dist/`, `LICENSE`, `NOTICE`, `README.md`, `package.json`
  6. playground: 144 screenshots, and the overlay check passes 4/4
  7. AionUi-main: clean and still at `58dff1d`
- **Git:** repo-local identity; a single commit, `chore: initial import from AionUi packages/ui @58dff1d`, with no AI signature lines.

## Decision log

| #   | Decision                                                                  | Alternatives                                   | Why                                                                                                                                                                                          |
| --- | ------------------------------------------------------------------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| E1  | Two independent copies                                                    | New copy as source of truth; keep both in sync | Simplest; drift accepted                                                                                                                                                                     |
| E2  | `ElectronUI-Extraction/aionui-ui`                                         | Another folder                                 | Next to AionUi-main, easy to compare                                                                                                                                                         |
| E3  | Keep the name `@aionui/ui`                                                | Own npm scope                                  | Nothing to rename                                                                                                                                                                            |
| E4  | Fresh repo with one commit                                                | `git subtree split`; no git                    | Clean history; detailed history stays in AionUi-main                                                                                                                                         |
| E5  | Bring oxlint/oxfmt config                                                 | No lint                                        | Keeps current code conventions                                                                                                                                                               |
| E6  | Bring design doc and plan                                                 | README only                                    | Keeps the reasons behind the design                                                                                                                                                          |
| E7  | `git archive @58dff1d`                                                    | `cp -r` with exclusions                        | Reproducible; ignored and untracked files excluded automatically                                                                                                                             |
| E8  | Drop AionUi-only overrides from `.oxlintrc.json`                          | Copy verbatim                                  | No dead config                                                                                                                                                                               |
| E9  | Pin `oxlint 1.56.0` / `oxfmt 0.41.0` exactly                              | Caret ranges                                   | `^1.56.0` resolved to 1.85.0, which rejects the copied config (`no-await-thenable` "not found"); the exact versions match AionUi                                                             |
| E10 | Anchor the UnoCSS content filter to this project folder (`uno.config.ts`) | Keep the copied `packages/ui` path regex       | The copied regex matched no file outside the monorepo, so `styles.css` shipped without any utility classes (found by the playground check; `dist.test.ts` now asserts utilities are present) |

## Verification result (2026-09-27)

All 7 checks passed:

1. Build emits `styles.css` (35,931 bytes, identical in size to the AionUi copy) and `arco-theme.css`.
2. Typecheck: 0 errors.
3. Tests: 105/105, including the new assertion that utilities are present.
4. Lint: 0 errors (33 warnings); format clean.
5. `npm pack --dry-run`: 288 KB, containing only `dist/`, `LICENSE`, `NOTICE`, `README.md` and `package.json`.
6. Playground: 144 screenshots; the overlay check passed 4/4 twice. The first failures came from the check script, not the library: a background Electron window throttles `requestAnimationFrame`, which MobileActionSheet uses to open. With `backgroundThrottling: false` the AionUi copy and this copy behave identically.
7. AionUi-main: clean and still at `58dff1d`.

A fresh lockfile resolves newer in-range dependency versions than AionUi's (for example vite 6.4.3, vitest 4.1.11, wavedrom 3.7.0). All checks above ran on those versions.
