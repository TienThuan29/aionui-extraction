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
 * time so published output needs no consumer-side transform.
 */
export function iconParkPlugin(): Plugin {
  const hocPath = resolve(uiSrc, 'icons/IconParkHOC/IconParkHOC.tsx').replace(/\\/g, '/');
  return {
    name: 'aionui-ui-icon-park',
    enforce: 'pre',
    transform(source, id) {
      if (!id.endsWith('.tsx') || id.includes('node_modules')) return null;
      // Never wrap inside the HOC itself (it imports from @icon-park/react/es/runtime).
      if (id.replace(/\\/g, '/') === hocPath) return null;
      if (!source.includes('@icon-park/react')) return null;
      const transformed = source.replace(
        /import\s+\{\s+([a-zA-Z, ]*)\s+\}\s+from\s+['"]@icon-park\/react['"](;?)/g,
        (str, match: string) => {
          if (!match) return str;
          const components = match.split(',');
          const importComponent = str.replace(match, components.map((key) => `${key} as _${key.trim()}`).join(', '));
          const hoc = `import { lazyIconParkHOC } from '${hocPath}';
          ${components.map((key) => `const ${key.trim()} = lazyIconParkHOC(() => _${key.trim()})`).join(';\n')}`;
          return importComponent + ';' + hoc;
        }
      );
      return transformed === source ? null : { code: transformed, map: null };
    },
  };
}
