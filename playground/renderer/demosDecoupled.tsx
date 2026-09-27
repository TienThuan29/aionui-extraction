import { Button, Form } from '@arco-design/web-react';
import { FolderOpen, Picture } from '@icon-park/react';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import {
  AionModal,
  AionSearchInput,
  CollapsibleContent,
  ContextUsageIndicator,
  DirInputItem,
  EmojiPicker,
  FileChangesPanel,
  FilePreview,
  FontSizeStepper,
  MobileActionSheet,
  RuntimeSelectorPill,
  ScaleControl,
  SiderItem,
  TabBar,
  TabContextMenu,
  TabToolbar,
  ThoughtDisplay,
  UploadProgressBar,
  WindowControls,
  useTabOverflow,
  useUi,
  type TabContextMenuState,
} from '../../src';
import type { PlaygroundWindowControls } from '../preload';

type Demo = { name: string; render: () => React.ReactNode };

const noop = () => {};
const windowControls = (window as unknown as { playground?: { windowControls: PlaygroundWindowControls } }).playground
  ?.windowControls;

function SearchDemo() {
  const [value, setValue] = useState('');
  return <AionSearchInput className='w-320px' value={value} onChange={setValue} placeholder='Search conversations' />;
}

function StepperDemo() {
  const [value, setValue] = useState(14);
  return (
    <FontSizeStepper
      value={value}
      min={10}
      max={24}
      step={1}
      defaultValue={14}
      resetLabel='Reset'
      onChange={setValue}
    />
  );
}

function ScaleDemo() {
  const [value, setValue] = useState(1);
  return (
    <div className='w-360px'>
      <ScaleControl value={value} onChange={setValue} />
    </div>
  );
}

function WindowControlsDemo() {
  const [isMaximized, setIsMaximized] = useState(false);
  useEffect(() => {
    if (!windowControls) return undefined;
    void windowControls.isMaximized().then(setIsMaximized);
    return windowControls.onMaximizedChange(setIsMaximized);
  }, []);
  return (
    <div className='flex justify-end h-36px border border-b-base rounded-8px overflow-hidden'>
      <WindowControls
        isMaximized={isMaximized}
        onMinimize={() => void windowControls?.minimize()}
        onToggleMaximize={() => void windowControls?.toggleMaximize()}
        onClose={() => void windowControls?.close()}
      />
    </div>
  );
}

function TabsDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const { tabFadeState } = useTabOverflow([]);
  const [active, setActive] = useState('a');
  const tabs = [
    { id: 'a', title: 'index.ts' },
    { id: 'b', title: 'README.md', isDirty: true },
    { id: 'c', title: 'https://aionui.com', favicon: '' },
  ];
  return (
    <div className='border border-b-base rounded-8px overflow-hidden'>
      <TabBar
        tabs={tabs}
        activeTabId={active}
        onSwitchTab={setActive}
        onCloseTab={noop}
        onContextMenu={noop}
        tabsContainerRef={ref as React.RefObject<HTMLDivElement>}
        tabFadeState={tabFadeState}
      />
      <TabToolbar
        content_type='markdown'
        isMarkdown
        isHTML={false}
        viewMode='preview'
        isSplitScreenEnabled={false}
        file_name='README.md'
        showOpenInSystemButton
        hasFilePath
        onViewModeChange={noop}
        onSplitScreenToggle={noop}
        onOpenInSystem={noop}
        onDownload={noop}
        onClose={noop}
      />
    </div>
  );
}

/** Overlay demos start open (for screenshots) but close for real, with a button to reopen. */
function ReopenButton({ label, onClick }: { label: string; onClick: () => void }) {
  return <Button onClick={onClick}>{label}</Button>;
}

function ActionSheetDemo() {
  const [open, setOpen] = useState(true);
  return (
    <>
      <ReopenButton label='Open action sheet' onClick={() => setOpen(true)} />
      <MobileActionSheet
        open={open}
        title='Attach'
        onClose={() => setOpen(false)}
        entries={[
          { key: 'file', icon: <FolderOpen />, label: 'Upload from device', description: 'Images, PDFs, code' },
          { key: 'img', icon: <Picture />, label: 'Photo library' },
        ]}
      />
    </>
  );
}

function ContextMenuDemo() {
  const { theme } = useUi();
  const [menu, setMenu] = useState<TabContextMenuState>({ show: true, x: 420, y: 160, tabId: 'a' });
  const close = () => setMenu((m) => ({ ...m, show: false }));
  return (
    <>
      <div
        className='inline-block px-12px py-8px border border-b-base rounded-6px text-13px'
        onContextMenu={(e) => {
          e.preventDefault();
          setMenu({ show: true, x: e.clientX, y: e.clientY, tabId: 'a' });
        }}
      >
        Right-click me (index.ts)
      </div>
      <TabContextMenu
        contextMenu={menu}
        tabs={[{ id: 'a', title: 'index.ts', canCopyPath: true, canCopyRelativePath: true, canRevealInFolder: true }]}
        currentTheme={theme}
        onClose={close}
        onCloseTab={close}
        onCloseLeft={close}
        onCloseRight={close}
        onCloseOthers={close}
        onCloseUnmodified={close}
        onCloseAll={close}
        onCopyPath={close}
        onCopyRelativePath={close}
        onRevealInFolder={close}
      />
    </>
  );
}

function ModalDemo() {
  const [visible, setVisible] = useState(true);
  return (
    <>
      <ReopenButton label='Open modal' onClick={() => setVisible(true)} />
      <AionModal
        visible={visible}
        header='Delete assistant?'
        onCancel={() => setVisible(false)}
        onOk={() => setVisible(false)}
      >
        <div className='p-24px text-14px'>This removes the assistant and its conversation history.</div>
      </AionModal>
    </>
  );
}

export const decoupledDemos: Demo[] = [
  { name: 'AionSearchInput', render: () => <SearchDemo /> },
  {
    name: 'FileChangesPanel',
    render: () => (
      <FileChangesPanel
        title='3 files changed'
        defaultExpanded
        files={[
          { file_name: 'index.ts', fullPath: 'src/index.ts', insertions: 12, deletions: 3 },
          { file_name: 'App.tsx', fullPath: 'src/App.tsx', insertions: 40, deletions: 0 },
          { file_name: 'README.md', fullPath: 'README.md', insertions: 0, deletions: 8 },
        ]}
      />
    ),
  },
  {
    name: 'CollapsibleContent',
    render: () => (
      <CollapsibleContent maxHeight={80}>
        <div className='text-13px leading-22px'>
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i}>Line {i + 1} of a long tool output that collapses behind a gradient.</div>
          ))}
        </div>
      </CollapsibleContent>
    ),
  },
  {
    name: 'ThoughtDisplay',
    render: () => (
      <ThoughtDisplay
        running
        startedAtMs={Date.now() - 42_000}
        thought={{ subject: 'Planning', description: 'Reading the repository layout…' }}
      />
    ),
  },
  {
    name: 'EmojiPicker',
    render: () => (
      <EmojiPicker value='🤖'>
        <Button>Pick emoji 🤖</Button>
      </EmojiPicker>
    ),
  },
  {
    name: 'MobileActionSheet',
    render: () => <ActionSheetDemo />,
  },
  {
    name: 'RuntimeSelectorPill',
    render: () => <RuntimeSelectorPill className='max-w-220px' label='claude-sonnet-5 · high' />,
  },
  {
    name: 'SiderItem',
    render: () => (
      <div className='w-240px flex flex-col gap-2px'>
        <SiderItem icon={<FolderOpen />} name='Selected conversation' selected />
        <SiderItem
          icon={<FolderOpen />}
          name='Pinned conversation'
          pinned
          menuItems={[{ key: 'rename', label: 'Rename', icon: <FolderOpen /> }]}
        />
      </div>
    ),
  },
  { name: 'FontSizeStepper', render: () => <StepperDemo /> },
  { name: 'ScaleControl', render: () => <ScaleDemo /> },
  {
    name: 'DirInputItem',
    render: () => (
      <Form layout='vertical' initialValues={{ workDir: '/Users/me/projects' }} className='w-420px'>
        <DirInputItem
          label='Work directory'
          field='workDir'
          browseLabel='Change work directory'
          onBrowse={async () => '/Users/me/other'}
        />
      </Form>
    ),
  },
  { name: 'WindowControls', render: () => <WindowControlsDemo /> },
  {
    name: 'UploadProgressBar',
    render: () => (
      <UploadProgressBar
        isUploading
        activeCount={2}
        overallPercent={63}
        uploads={[
          { id: 1, name: 'screenshot.png', percent: 90 },
          { id: 2, name: 'report.pdf', percent: 36 },
        ]}
        onAbort={noop}
      />
    ),
  },
  {
    name: 'FilePreview',
    render: () => (
      <div className='flex gap-12px'>
        <FilePreview path='/tmp/report.pdf' size={1_572_864} onRemove={noop} />
        <FilePreview path='/tmp/notes.md' size={2048} onRemove={noop} readonly />
      </div>
    ),
  },
  {
    name: 'ContextUsageIndicator',
    render: () => (
      <ContextUsageIndicator
        size={28}
        context_limit={200_000}
        tokenUsage={{
          total_tokens: 152_000,
          breakdown: { input_tokens: 120_000, output_tokens: 32_000 },
          cost: { amount: 0.42, currency: 'USD' },
        }}
      />
    ),
  },
  { name: 'TabBar', render: () => <TabsDemo /> },
  {
    name: 'TabContextMenu',
    render: () => <ContextMenuDemo />,
  },
  {
    name: 'AionModal',
    render: () => <ModalDemo />,
  },
];
