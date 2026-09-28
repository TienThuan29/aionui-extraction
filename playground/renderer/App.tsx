import { ConfigProvider, Radio } from '@arco-design/web-react';
import enUS from '@arco-design/web-react/es/locale/en-US';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { AionSearchInput, UiProvider, WindowControls, type UiTheme } from '@aionui/ui';
import { docPages } from '../docs/registry';
import { bestDocPage, filterDocPages } from '../docs/search';
import { DOC_GROUPS } from '../docs/types';
import type { PlaygroundWindowControls } from '../preload';
import { DocPageView } from './DocPageView';

type Route = { page: string; example?: string; theme: UiTheme; layout: 'desktop' | 'mobile' };

const parseHash = (): Route => {
  const [path, query = ''] = window.location.hash.replace(/^#\/?/, '').split('?');
  const params = new URLSearchParams(query);
  return {
    page: path || docPages[0]?.id || '',
    example: params.get('example') ?? undefined,
    theme: params.get('theme') === 'dark' ? 'dark' : 'light',
    layout: params.get('layout') === 'mobile' ? 'mobile' : 'desktop',
  };
};

const toHash = (r: Route) =>
  `#/${r.page}?${r.example ? `example=${encodeURIComponent(r.example)}&` : ''}theme=${r.theme}&layout=${r.layout}`;

// Exposed for the main process's screenshot mode: every docs page.
(window as unknown as { __PLAYGROUND_DEMOS__: string[] }).__PLAYGROUND_DEMOS__ = docPages.map((page) => page.id);

const windowApi = (window as unknown as { playground?: { windowControls: PlaygroundWindowControls } }).playground
  ?.windowControls;

/** The playground window is frameless; these are its real title-bar buttons. */
function TitleBarControls() {
  const [isMaximized, setIsMaximized] = useState(false);
  useEffect(() => {
    if (!windowApi) return undefined;
    void windowApi.isMaximized().then(setIsMaximized);
    return windowApi.onMaximizedChange(setIsMaximized);
  }, []);
  if (!windowApi) return null;
  return (
    <WindowControls
      isMaximized={isMaximized}
      onMinimize={() => void windowApi.minimize()}
      onToggleMaximize={() => void windowApi.toggleMaximize()}
      onClose={() => void windowApi.close()}
    />
  );
}

const noDrag = { WebkitAppRegion: 'no-drag' } as React.CSSProperties;

function NavLink({ label, active, href }: { label: string; active: boolean; href: string }) {
  return (
    <a
      href={href}
      className={`block px-8px py-4px rounded-6px text-13px no-underline text-t-primary ${active ? 'bg-active font-600' : 'hover:bg-hover'}`}
    >
      {label}
    </a>
  );
}

export function App() {
  const [route, setRoute] = useState(parseHash);

  useEffect(() => {
    const onHash = () => setRoute(parseHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const [query, setQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const visiblePages = filterDocPages(docPages, query);

  // Ctrl/⌘+K or Ctrl/⌘+F focuses the sidebar search.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'f')) {
        e.preventDefault();
        searchRef.current?.focus();
        searchRef.current?.select();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // The three attributes every consumer must set (see README).
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', route.theme);
    document.body.setAttribute('arco-theme', route.theme);
  }, [route.theme]);

  const go = (patch: Partial<Route>) => {
    window.location.hash = toHash({ ...route, example: undefined, ...patch });
  };
  const page = docPages.find((p) => p.id === route.page);
  const isMobile = route.layout === 'mobile';
  const pageHref = (id: string) => toHash({ ...route, page: id, example: undefined });

  return (
    // Arco has its own locale (zh-CN by default) for texts like Modal's Cancel.
    <ConfigProvider locale={enUS}>
      <UiProvider theme={route.theme} isMobile={isMobile}>
        <div className='flex h-screen bg-1 text-t-primary'>
          <nav className='w-230px shrink-0 overflow-auto border-r border-b-base p-12px'>
            <div className='text-15px font-700 px-8px mb-12px'>@aionui/ui</div>
            <AionSearchInput
              ref={searchRef}
              className='mb-12px'
              value={query}
              onChange={setQuery}
              placeholder='Search… (Ctrl+K)'
              inputProps={{
                'aria-label': 'Search docs',
                onKeyDown: (e) => {
                  const best = e.key === 'Enter' && bestDocPage(visiblePages, query);
                  if (best) window.location.hash = pageHref(best.id);
                  if (e.key === 'Escape') {
                    if (query) setQuery('');
                    else e.currentTarget.blur();
                  }
                },
              }}
            />
            {visiblePages.length === 0 && (
              <div className='text-13px text-t-secondary px-8px'>No results for “{query.trim()}”.</div>
            )}
            {DOC_GROUPS.map((group) => {
              const pages = visiblePages.filter((p) => p.group === group);
              if (pages.length === 0) return null;
              return (
                <div key={group} className='mb-12px'>
                  <div className='text-11px uppercase tracking-wide text-t-secondary px-8px mb-4px'>{group}</div>
                  {pages.map((p) => (
                    <NavLink key={p.id} label={p.title} active={p.id === route.page} href={pageHref(p.id)} />
                  ))}
                </div>
              );
            })}
          </nav>
          <main className='flex-1 min-w-0 flex flex-col'>
            {/* Draggable title bar (frameless window); interactive children opt out. */}
            <header
              className='flex items-center gap-16px ps-16px h-48px border-b border-b-base'
              style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}
            >
              <strong className='text-15px'>{page?.title ?? 'Not found'}</strong>
              <Radio.Group
                style={noDrag}
                type='button'
                size='small'
                value={route.theme}
                onChange={(theme) => go({ theme })}
              >
                <Radio value='light'>Light</Radio>
                <Radio value='dark'>Dark</Radio>
              </Radio.Group>
              <Radio.Group
                style={noDrag}
                type='button'
                size='small'
                value={route.layout}
                onChange={(layout) => go({ layout })}
              >
                <Radio value='desktop'>Desktop</Radio>
                <Radio value='mobile'>Mobile</Radio>
              </Radio.Group>
              <div className='ms-auto self-stretch flex'>
                <TitleBarControls />
              </div>
            </header>
            {/* Keyed by page: a new page starts scrolled to the top. */}
            <section key={route.page} className='flex-1 overflow-auto p-24px'>
              {page ? (
                <DocPageView page={page} example={route.example} />
              ) : (
                <div className='text-14px text-t-secondary'>No page named “{route.page}”.</div>
              )}
            </section>
          </main>
        </div>
      </UiProvider>
    </ConfigProvider>
  );
}
