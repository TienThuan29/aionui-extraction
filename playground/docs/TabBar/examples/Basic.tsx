import { useState } from 'react';
import { TabBar, useTabOverflow, type TabBarItem } from '@aionui/ui';

const initialTabs: TabBarItem[] = [
  { id: 'index', title: 'index.ts' },
  { id: 'readme', title: 'README.md', isDirty: true },
  { id: 'docs', title: 'AionUi — Documentation — Getting started with components', favicon: '', agentActive: true },
  { id: 'app', title: 'App.tsx' },
];

export default function Example() {
  const [tabs, setTabs] = useState(initialTabs);
  const [active, setActive] = useState<string | null>('index');
  const [maximized, setMaximized] = useState(false);
  const { tabsContainerRef, tabFadeState } = useTabOverflow([tabs.length]);

  const close = (id: string) => {
    const next = tabs.filter((t) => t.id !== id);
    setTabs(next);
    if (active === id) setActive(next[0]?.id ?? null);
  };

  return (
    <div className='max-w-640px border border-solid border-b-base rounded-8px overflow-hidden'>
      <TabBar
        tabs={tabs}
        activeTabId={active}
        tabsContainerRef={tabsContainerRef}
        tabFadeState={tabFadeState}
        onSwitchTab={setActive}
        onCloseTab={close}
        onContextMenu={(e) => e.preventDefault()}
        isMaximized={maximized}
        onToggleMaximize={() => setMaximized((v) => !v)}
        onNewBrowserTab={() => {
          const id = `page-${Date.now()}`;
          setTabs((list) => [...list, { id, title: 'New tab', favicon: '' }]);
          setActive(id);
        }}
        onClosePanel={() => setTabs([])}
      />
      <div className='p-16px text-13px text-t-secondary'>
        {active ? `Showing ${tabs.find((t) => t.id === active)?.title}` : 'No tabs open'}
        {maximized && ' (maximized)'}
      </div>
    </div>
  );
}
