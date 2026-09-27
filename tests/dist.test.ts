// Checks the built package the way a consumer receives it (runs after `bun run build`).
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import pkg from '../package.json';

const dist = resolve(__dirname, '../dist');

const jsFiles = (dir: string): string[] =>
  readdirSync(dir, { recursive: true, encoding: 'utf8' })
    .filter((file) => file.endsWith('.js'))
    .map((file) => join(dir, file));

// Importing a whole entry loads every module (and all of Arco) cold.
const ENTRY_IMPORT_TIMEOUT = 30_000;

describe('dist', () => {
  it('ships both stylesheets and entry declarations', () => {
    for (const file of ['styles.css', 'arco-theme.css', 'index.js', 'index.d.ts', 'markdown.js', 'markdown.d.ts']) {
      expect(existsSync(join(dist, file)), file).toBe(true);
    }
  });

  it('styles.css contains the utility classes the components use', () => {
    // Regression: a UnoCSS content filter that matched no source file produced a styles.css
    // with tokens and component CSS but no utilities, silently breaking every layout.
    const css = readFileSync(join(dist, 'styles.css'), 'utf8');
    for (const utility of ['.flex', '.items-center', '.gap-26px', '.min-w-240px']) {
      expect(css, utility).toMatch(new RegExp(`${utility.replace('.', '\\.')}[,{:]`));
    }
  });

  it(
    'core entry exposes the public API',
    async () => {
      const core = await import('../dist/index.js');
      for (const name of [
        'UiProvider',
        'useUi',
        'defaultLabels',
        'AionModal',
        'AionSelect',
        'TabBar',
        'WindowControls',
        'IconParkHOC',
        'copyText',
      ]) {
        expect(core, name).toHaveProperty(name);
      }
      // Markdown's heavy peers must stay out of the core entry.
      expect(core).not.toHaveProperty('Markdown');
    },
    ENTRY_IMPORT_TIMEOUT
  );

  it(
    'markdown entry exposes the renderers',
    async () => {
      const markdown = await import('../dist/markdown.js');
      for (const name of ['Markdown', 'MarkdownHostProvider', 'CodeBlock', 'MermaidBlock', 'Diff2Html', 'ShadowView']) {
        expect(markdown, name).toHaveProperty(name);
      }
    },
    ENTRY_IMPORT_TIMEOUT
  );

  it('deep imports keep their full export signature', async () => {
    // Regression: Rollup used to drop exports unused by the barrels (e.g. this default).
    const mod = await import('../dist/components/display/CollapsibleContent/CollapsibleContent.js');
    expect(mod.default).toBeTypeOf('function');
    expect(mod.CollapsibleContent).toBe(mod.default);
  });

  it('only imports declared dependencies and peers (nothing bundled, nothing missing)', () => {
    const declared = new Set([...Object.keys(pkg.dependencies), ...Object.keys(pkg.peerDependencies)]);
    const undeclared = new Set<string>();
    for (const file of jsFiles(dist)) {
      for (const [, spec] of readFileSync(file, 'utf8').matchAll(/(?:from|import)\s*["']([^"'.][^"']*)["']/g)) {
        const name = spec.startsWith('@') ? spec.split('/').slice(0, 2).join('/') : spec.split('/')[0];
        if (!declared.has(name)) undeclared.add(`${name} (${file.slice(dist.length + 1)})`);
      }
    }
    expect([...undeclared]).toEqual([]);
  });
});
