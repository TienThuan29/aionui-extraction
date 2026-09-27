import { ConfigProvider, Radio } from '@arco-design/web-react';
import enUS from '@arco-design/web-react/es/locale/en-US';
import { useEffect, useState } from 'react';
import { UiProvider, type UiTheme } from '@aionui/ui';
import { docPages } from '../docs/registry';
import { DOC_GROUPS } from '../docs/types';
import { DocPageView } from './DocPageView';
import { demos } from './demos';

type Route = { page: string; example?: string; theme: UiTheme; layout: 'desktop' | 'mobile' };

// Old demos stay reachable until every component has a docs page (then demos*.tsx are removed).
const legacyDemos = demos.filter((demo) => !docPages.some((page) => page.id === demo.name));

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

// Exposed for the main process's screenshot mode: every docs page, then the remaining legacy demos.
(window as unknown as { __PLAYGROUND_DEMOS__: string[] }).__PLAYGROUND_DEMOS__ = [
  ...docPages.map((page) => page.id),
  ...legacyDemos.map((demo) => demo.name),
];

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

  // The three attributes every consumer must set (see README).
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', route.theme);
    document.body.setAttribute('arco-theme', route.theme);
  }, [route.theme]);

  const go = (patch: Partial<Route>) => {
    window.location.hash = toHash({ ...route, example: undefined, ...patch });
  };
  const page = docPages.find((p) => p.id === route.page);
  const legacy = page ? undefined : legacyDemos.find((d) => d.name === route.page);
  const isMobile = route.layout === 'mobile';
  const pageHref = (id: string) => toHash({ ...route, page: id, example: undefined });

  return (
    // Arco has its own locale (zh-CN by default) for texts like Modal's Cancel.
    <ConfigProvider locale={enUS}>
      <UiProvider theme={route.theme} isMobile={isMobile}>
        <div className='flex h-screen bg-1 text-t-primary'>
          <nav className='w-230px shrink-0 overflow-auto border-r border-b-base p-12px'>
            <div className='text-15px font-700 px-8px mb-12px'>@aionui/ui</div>
            {DOC_GROUPS.map((group) => {
              const pages = docPages.filter((p) => p.group === group);
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
            {legacyDemos.length > 0 && (
              <div className='mb-12px'>
                <div className='text-11px uppercase tracking-wide text-t-secondary px-8px mb-4px'>Legacy demos</div>
                {legacyDemos.map((d) => (
                  <NavLink key={d.name} label={d.name} active={d.name === route.page} href={pageHref(d.name)} />
                ))}
              </div>
            )}
          </nav>
          <main className='flex-1 min-w-0 flex flex-col'>
            <header className='flex items-center gap-16px px-16px h-48px border-b border-b-base'>
              <strong className='text-15px'>{page?.title ?? legacy?.name ?? 'Not found'}</strong>
              <Radio.Group type='button' size='small' value={route.theme} onChange={(theme) => go({ theme })}>
                <Radio value='light'>Light</Radio>
                <Radio value='dark'>Dark</Radio>
              </Radio.Group>
              <Radio.Group type='button' size='small' value={route.layout} onChange={(layout) => go({ layout })}>
                <Radio value='desktop'>Desktop</Radio>
                <Radio value='mobile'>Mobile</Radio>
              </Radio.Group>
            </header>
            {/* Keyed by page: a new page starts scrolled to the top. */}
            <section key={route.page} className='flex-1 overflow-auto p-24px'>
              {page ? (
                <DocPageView page={page} example={route.example} />
              ) : (
                <div className={isMobile ? 'w-390px mx-auto border border-b-base rounded-12px p-16px' : ''}>
                  {legacy?.render()}
                </div>
              )}
            </section>
          </main>
        </div>
      </UiProvider>
    </ConfigProvider>
  );
}
