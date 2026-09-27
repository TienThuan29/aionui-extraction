/**
 * @license
 * Copyright 2025 AionUi (aionui.com)
 * SPDX-License-Identifier: Apache-2.0
 */

import { resolve } from 'node:path';
import type { Plugin } from 'vite';

export const uiSrc = resolve(__dirname, 'src');

/**
 * Wraps every named `@icon-park/react` import in (lazy) IconParkHOC, so icons get
 * AionUi's defaults (size 16, stroke 3, secondary fill, cursor-pointer).
 * Copied from packages/desktop/electron.vite.config.ts; runs at library build
 * time so published output needs no consumer-side transform. Only library source is
 * transformed: playground docs examples must render as they would in a consumer app.
 */
export function iconParkPlugin(): Plugin {
  const srcDir = uiSrc.replace(/\\/g, '/') + '/';
  const hocPath = resolve(uiSrc, 'icons/IconParkHOC/IconParkHOC.tsx').replace(/\\/g, '/');
  return {
    name: 'aionui-ui-icon-park',
    enforce: 'pre',
    transform(source, id) {
      if (!id.endsWith('.tsx') || !id.replace(/\\/g, '/').startsWith(srcDir)) return null;
      // Never wrap inside the HOC itself (it imports from @icon-park/react/es/runtime).
      if (id.replace(/\\/g, '/') === hocPath) return null;
      if (!source.includes('@icon-park/react')) return null;
      // Handles multi-line lists, digits in names (Share2) and aliases (`Message as MessageIcon`);
      // `type` specifiers are left untouched.
      const transformed = source.replace(
        /import\s*\{([\w\s,]*)\}\s*from\s*['"]@icon-park\/react['"];?/g,
        (str, list: string) => {
          const specifiers = list
            .split(',')
            .map((spec) => spec.trim())
            .filter(Boolean);
          const icons = specifiers
            .filter((spec) => !spec.startsWith('type '))
            .map((spec) => {
              const [imported, local = imported] = spec.split(/\s+as\s+/);
              return { imported, local };
            });
          if (icons.length === 0) return str;
          const types = specifiers.filter((spec) => spec.startsWith('type '));
          const imports = [...icons.map(({ imported, local }) => `${imported} as _${local}`), ...types].join(', ');
          const wrappers = icons.map(({ local }) => `const ${local} = lazyIconParkHOC(() => _${local});`).join('\n');
          return `import { ${imports} } from '@icon-park/react';\nimport { lazyIconParkHOC } from '${hocPath}';\n${wrappers}`;
        }
      );
      return transformed === source ? null : { code: transformed, map: null };
    },
  };
}

/**
 * Docs/examples import the package by name, exactly as consumers do; resolve it to the source.
 * Used by the playground and tests only — library source keeps relative imports.
 */
export const selfAlias = [
  { find: /^@aionui\/ui\/markdown$/, replacement: resolve(uiSrc, 'markdown.ts') },
  { find: /^@aionui\/ui$/, replacement: resolve(uiSrc, 'index.ts') },
];
