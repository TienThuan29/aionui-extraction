import { Button, Switch } from '@arco-design/web-react';
import { Folder, Setting } from '@icon-park/react';
import type React from 'react';
import { useState } from 'react';
import {
  AionCollapse,
  AionInlineSearchInput,
  AionScrollArea,
  AionSelect,
  AionSteps,
  AppLoader,
  CollapseGroup,
  ConfigRow,
  FieldLabel,
  ForkBranchIcon,
  HorizontalScroller,
  MentionMenuShell,
  PreferenceRow,
  ProviderLogo,
  ReadonlySelectionField,
  Section,
  SectionCard,
  SettingsPageHeader,
  ShimmerText,
  SlashCommandMenu,
  ThemedLogo,
} from '../../src';
import { decoupledDemos } from './demosDecoupled';
import { markdownDemos } from './demosMarkdown';

export type Demo = { name: string; render: () => React.ReactNode };

const Row: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className='flex flex-wrap items-center gap-12px mb-16px'>{children}</div>
);

const Chip: React.FC<{ i: number }> = ({ i }) => (
  <div className='shrink-0 w-140px h-56px rounded-8px bg-2 border border-b-base flex-center text-13px'>file-{i}.ts</div>
);

const SLASH_ITEMS = [
  { key: 'help', label: '/help', description: 'Show available commands' },
  { key: 'clear', label: '/clear', description: 'Clear the conversation', badge: 'builtin' },
  { key: 'model', label: '/model', description: 'Switch model' },
];

const LOGO_SVG =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><circle cx='12' cy='12' r='10' fill='black'/></svg>";

function CollapseGroupDemo() {
  const [expanded, setExpanded] = useState(true);
  return (
    <CollapseGroup expanded={expanded} onToggle={() => setExpanded((v) => !v)} header='my-workspace'>
      <div className='pl-24px py-8px text-13px text-t-secondary'>conversation A · conversation B</div>
    </CollapseGroup>
  );
}

function SectionDemo() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Section
      id='changes'
      title='Changes'
      badge={<span>3</span>}
      collapsed={collapsed}
      onToggleCollapsed={() => setCollapsed((v) => !v)}
    >
      <div className='p-12px text-13px'>src/index.ts · src/App.tsx · README.md</div>
    </Section>
  );
}

function SearchDemo() {
  const [value, setValue] = useState('');
  return <AionInlineSearchInput value={value} onChange={setValue} placeholder='Search…' />;
}

function SlashDemo() {
  const [active, setActive] = useState(0);
  return (
    <div className='relative w-420px'>
      <SlashCommandMenu
        title='Commands'
        hint='↑↓ to navigate'
        items={SLASH_ITEMS}
        activeIndex={active}
        onHoverItem={setActive}
        onSelectItem={() => {}}
        emptyText='No commands'
      />
    </div>
  );
}

function SettingsHeaderDemo() {
  const [tab, setTab] = useState('all');
  return (
    <SettingsPageHeader
      title='Assistants'
      description='Manage the assistants available in chat.'
      actions={<Button type='primary'>New</Button>}
      tabs={[
        { key: 'all', label: 'All', count: 12 },
        { key: 'mine', label: 'Mine', count: 3 },
      ]}
      activeTab={tab}
      onTabChange={setTab}
    />
  );
}

// One entry per exported component; added as components migrate.
const genericDemos: Demo[] = [
  {
    name: 'AionCollapse',
    render: () => (
      <AionCollapse defaultActiveKey='a' bordered>
        <AionCollapse.Item name='a' header='First panel'>
          <div className='p-12px'>Panel content</div>
        </AionCollapse.Item>
        <AionCollapse.Item name='b' header='Second panel'>
          <div className='p-12px'>More content</div>
        </AionCollapse.Item>
      </AionCollapse>
    ),
  },
  {
    name: 'AionSteps',
    render: () => (
      <AionSteps current={2}>
        <AionSteps.Step title='Install' />
        <AionSteps.Step title='Configure' />
        <AionSteps.Step title='Done' />
      </AionSteps>
    ),
  },
  { name: 'ShimmerText', render: () => <ShimmerText className='text-16px'>Thinking about your request…</ShimmerText> },
  {
    name: 'AionScrollArea',
    render: () => (
      <AionScrollArea className='h-160px border border-b-base rounded-8px p-12px'>
        {Array.from({ length: 30 }, (_, i) => (
          <div key={i} className='text-13px'>
            Line {i + 1}
          </div>
        ))}
      </AionScrollArea>
    ),
  },
  {
    name: 'HorizontalScroller',
    render: () => (
      <HorizontalScroller>
        {Array.from({ length: 12 }, (_, i) => (
          <Chip key={i} i={i} />
        ))}
      </HorizontalScroller>
    ),
  },
  {
    name: 'AppLoader',
    render: () => (
      <div className='h-120px relative'>
        <AppLoader />
      </div>
    ),
  },
  { name: 'CollapseGroup', render: () => <CollapseGroupDemo /> },
  { name: 'Section', render: () => <SectionDemo /> },
  {
    name: 'AionSelect',
    render: () => (
      <AionSelect
        className='w-240px'
        defaultValue='gpt'
        options={[
          { label: 'GPT', value: 'gpt' },
          { label: 'Claude', value: 'claude' },
        ]}
      />
    ),
  },
  { name: 'AionInlineSearchInput', render: () => <SearchDemo /> },
  {
    name: 'MentionMenuShell',
    render: () => (
      <div className='relative w-420px'>
        <MentionMenuShell activeIndex={0} itemCount={2} label='Files' title='Files' hint='Tab to insert'>
          <div className='px-12px py-6px text-13px'>src/index.ts</div>
          <div className='px-12px py-6px text-13px'>src/App.tsx</div>
        </MentionMenuShell>
      </div>
    ),
  },
  { name: 'SlashCommandMenu', render: () => <SlashDemo /> },
  {
    name: 'PreferenceRow',
    render: () => (
      <PreferenceRow label='Auto update' description='Download updates in the background.'>
        <Switch defaultChecked />
      </PreferenceRow>
    ),
  },
  { name: 'SettingsPageHeader', render: () => <SettingsHeaderDemo /> },
  {
    name: 'SectionCard',
    render: () => (
      <SectionCard title='Identity' legend={{ label: 'Applies now', tone: 'now' }}>
        <ConfigRow label={<FieldLabel required>Name</FieldLabel>} hint='Shown in the sidebar'>
          <ReadonlySelectionField value='Research assistant' />
        </ConfigRow>
      </SectionCard>
    ),
  },
  {
    name: 'Icons',
    render: () => (
      <>
        <Row>
          <Folder /> <Setting /> <ForkBranchIcon />{' '}
          <span className='text-13px text-t-secondary'>icon-park via IconParkHOC</span>
        </Row>
        <Row>
          <ThemedLogo src={LOGO_SVG} alt='logo' className='w-32px h-32px' />
          <ProviderLogo logo={LOGO_SVG} name='Provider' size={24} />
          <span className='text-13px text-t-secondary'>ThemedLogo tints monochrome logos in dark mode</span>
        </Row>
      </>
    ),
  },
];

export const demos: Demo[] = [...genericDemos, ...decoupledDemos, ...markdownDemos];
