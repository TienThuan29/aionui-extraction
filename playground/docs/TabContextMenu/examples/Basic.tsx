import { Message } from '@arco-design/web-react';
import { useState } from 'react';
import { TabBar, TabContextMenu, useTabOverflow, useUi, type TabBarItem, type TabContextMenuState } from '@aionui/ui';

const initialTabs: TabBarItem[] = [
  { id: 'index', title: 'index.ts', canCopyPath: true, canCopyRelativePath: true, canRevealInFolder: true },
  { id: 'notes', title: 'notes.md', isDirty: true, canCopyPath: true, canRevealInFolder: true },
  { id: 'site', title: 'aionui.com', favicon: '', canCopyPath: true },
];

export default function Example() {
  const { theme } = useUi();
  const [tabs, setTabs] = useState(initialTabs);
  const [active, setActive] = useState<string | null>('index');
  const [menu, setMenu] = useState<TabContextMenuState>({ show: false, x: 0, y: 0, tabId: null });
  const { tabsContainerRef, tabFadeState } = useTabOverflow([tabs.length]);

  const closeMenu = () => setMenu((m) => ({ ...m, show: false }));
  const keep = (predicate: (tab: TabBarItem, index: number, target: number) => boolean) => (id: string) => {
    const target = tabs.findIndex((t) => t.id === id);
    setTabs(tabs.filter((tab, index) => predicate(tab, index, target)));
  };

  return (
    <div className='max-w-640px border border-solid border-b-base rounded-8px overflow-hidden'>
      <TabBar
        tabs={tabs}
        activeTabId={active}
        tabsContainerRef={tabsContainerRef}
        tabFadeState={tabFadeState}
        onSwitchTab={setActive}
        onCloseTab={keep((tab, i, target) => i !== target)}
        onContextMenu={(e, tabId) => {
          e.preventDefault();
          setMenu({ show: true, x: e.clientX, y: e.clientY, tabId });
        }}
      />
      <div className='p-16px text-13px text-t-secondary'>Right-click a tab.</div>
      <TabContextMenu
        contextMenu={menu}
        tabs={tabs}
        currentTheme={theme}
        onClose={closeMenu}
        onCloseTab={keep((tab, i, target) => i !== target)}
        onCloseLeft={keep((tab, i, target) => i >= target)}
        onCloseRight={keep((tab, i, target) => i <= target)}
        onCloseOthers={keep((tab, i, target) => i === target)}
        onCloseUnmodified={() => setTabs(tabs.filter((t) => t.isDirty))}
        onCloseAll={() => setTabs([])}
        onCopyPath={(id) => Message.info(`Copy path of ${id}`)}
        onCopyRelativePath={(id) => Message.info(`Copy relative path of ${id}`)}
        onRevealInFolder={(id) => Message.info(`Reveal ${id}`)}
      />
    </div>
  );
}
