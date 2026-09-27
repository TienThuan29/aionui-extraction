import { resolve } from 'node:path';
import type { Plugin } from 'vite';
import { iconParkPlugin, uiSrc } from '../vitePlugins';

const transform = (code: string, id = resolve(uiSrc, 'Demo.tsx')): string | null => {
  const hook = iconParkPlugin().transform as (code: string, id: string) => { code: string } | null;
  return hook(code, id)?.code ?? null;
};

describe('iconParkPlugin', () => {
  it('wraps each imported icon lazily', () => {
    const out = transform("import { Close, Copy } from '@icon-park/react';");
    expect(out).toContain("import { Close as _Close, Copy as _Copy } from '@icon-park/react';");
    expect(out).toContain('const Close = lazyIconParkHOC(() => _Close);');
    expect(out).toContain('const Copy = lazyIconParkHOC(() => _Copy);');
  });

  it('keeps the local name of aliased imports', () => {
    const out = transform("import { Message as MessageIcon } from '@icon-park/react';");
    expect(out).toContain('Message as _MessageIcon');
    expect(out).toContain('const MessageIcon = lazyIconParkHOC(() => _MessageIcon);');
  });

  it('handles multi-line lists and names with digits', () => {
    const out = transform("import {\n  Share2,\n  Down,\n} from '@icon-park/react'");
    expect(out).toContain('const Share2 = lazyIconParkHOC(() => _Share2);');
    expect(out).toContain('const Down = lazyIconParkHOC(() => _Down);');
  });

  it('leaves type-only specifiers and other modules alone', () => {
    expect(transform("import { type IconProps } from '@icon-park/react';")).toBeNull();
    expect(transform("import { Close } from '@arco-design/web-react';")).toBeNull();
  });

  it('only transforms library source', () => {
    const code = "import { Close } from '@icon-park/react';";
    expect(transform(code, resolve(uiSrc, '../playground/docs/Icons/examples/IconPark.tsx'))).toBeNull();
  });

  it('is a pre-transform plugin', () => {
    expect((iconParkPlugin() as Plugin).enforce).toBe('pre');
  });
});
