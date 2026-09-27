import { Radio } from '@arco-design/web-react';
import { useEffect, useState } from 'react';
import { UiProvider, type UiTheme } from '../../src';
import { demos } from './demos';

type Route = { demo: string; theme: UiTheme; layout: 'desktop' | 'mobile' };

const parseHash = (): Route => {
  const [path, query = ''] = window.location.hash.replace(/^#\/?/, '').split('?');
  const params = new URLSearchParams(query);
  return {
    demo: path || demos[0]?.name || '',
    theme: params.get('theme') === 'dark' ? 'dark' : 'light',
    layout: params.get('layout') === 'mobile' ? 'mobile' : 'desktop',
  };
};

const toHash = (r: Route) => `#/${r.demo}?theme=${r.theme}&layout=${r.layout}`;

// Exposed for the main process's screenshot mode.
(window as unknown as { __PLAYGROUND_DEMOS__: string[] }).__PLAYGROUND_DEMOS__ = demos.map((d) => d.name);

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
    window.location.hash = toHash({ ...route, ...patch });
  };
  const current = demos.find((d) => d.name === route.demo);
  const isMobile = route.layout === 'mobile';

  return (
    <UiProvider theme={route.theme} isMobile={isMobile}>
      <div className='flex h-screen bg-1 text-t-primary'>
        <nav className='w-220px shrink-0 overflow-auto border-r border-b-base p-12px flex flex-col gap-2px'>
          <div className='text-12px text-t-secondary mb-8px'>@aionui/ui — {demos.length} demos</div>
          {demos.map((d) => (
            <a
              key={d.name}
              href={toHash({ ...route, demo: d.name })}
              className={`px-8px py-4px rounded-6px text-13px no-underline text-t-primary ${d.name === route.demo ? 'bg-active' : 'hover:bg-hover'}`}
            >
              {d.name}
            </a>
          ))}
        </nav>
        <main className='flex-1 min-w-0 flex flex-col'>
          <header className='flex items-center gap-16px px-16px h-48px border-b border-b-base'>
            <strong className='text-15px'>{current?.name ?? 'No demos yet'}</strong>
            <Radio.Group type='button' size='small' value={route.theme} onChange={(theme) => go({ theme })}>
              <Radio value='light'>Light</Radio>
              <Radio value='dark'>Dark</Radio>
            </Radio.Group>
            <Radio.Group type='button' size='small' value={route.layout} onChange={(layout) => go({ layout })}>
              <Radio value='desktop'>Desktop</Radio>
              <Radio value='mobile'>Mobile</Radio>
            </Radio.Group>
          </header>
          <section className='flex-1 overflow-auto p-24px'>
            <div className={isMobile ? 'w-390px mx-auto border border-b-base rounded-12px p-16px' : ''}>
              {current?.render()}
            </div>
          </section>
        </main>
      </div>
    </UiProvider>
  );
}
