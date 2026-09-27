import { Form } from '@arco-design/web-react';
import { render } from '@testing-library/react';
import type React from 'react';
import * as ui from '../src';
import * as md from '../src/markdown';

// Heavy renderers that jsdom cannot run; the smoke test only checks that components mount.
vi.mock('mermaid', () => ({
  default: { initialize: vi.fn(), render: vi.fn().mockResolvedValue({ svg: '<svg></svg>' }) },
}));
vi.mock('wavedrom', () => ({ default: { renderAny: () => ['svg', {}], onml: { stringify: () => '<svg></svg>' } } }));

const noop = () => {};

// Every component export of the core entry, rendered with minimal props and NO UiProvider.
const coreCases: Array<[string, React.ReactElement]> = [
  [
    'AionCollapse',
    <ui.AionCollapse key='c'>
      <ui.AionCollapse.Item name='a' header='A'>
        x
      </ui.AionCollapse.Item>
    </ui.AionCollapse>,
  ],
  ['AionSteps', <ui.AionSteps key='s' current={1} />],
  ['ShimmerText', <ui.ShimmerText key='t'>text</ui.ShimmerText>],
  ['CollapsibleContent', <ui.CollapsibleContent key='cc'>content</ui.CollapsibleContent>],
  ['ThoughtDisplay', <ui.ThoughtDisplay key='td' running thought={{ subject: 's', description: 'd' }} />],
  [
    'FileChangesPanel',
    <ui.FileChangesPanel
      key='f'
      title='Changes'
      files={[{ file_name: 'a.ts', fullPath: '/a.ts', insertions: 1, deletions: 0 }]}
    />,
  ],
  [
    'ContextUsageIndicator',
    <ui.ContextUsageIndicator key='u' tokenUsage={{ total_tokens: 1200 }} context_limit={10000} />,
  ],
  ['RuntimeSelectorPill', <ui.RuntimeSelectorPill key='r' className='pill' label='Model' />],
  ['AionSelect', <ui.AionSelect key='sel' options={[{ label: 'A', value: 'a' }]} />],
  ['AionSearchInput', <ui.AionSearchInput key='si' value='' onChange={noop} />],
  ['AionInlineSearchInput', <ui.AionInlineSearchInput key='isi' value='' onChange={noop} />],
  ['EmojiPicker', <ui.EmojiPicker key='e' />],
  [
    'FontSizeStepper',
    <ui.FontSizeStepper
      key='fs'
      value={14}
      min={10}
      max={20}
      step={1}
      defaultValue={14}
      resetLabel='Reset'
      onChange={noop}
    />,
  ],
  ['ScaleControl', <ui.ScaleControl key='sc' value={1} onChange={noop} />],
  [
    'DirInputItem',
    <Form key='d'>
      <ui.DirInputItem label='Dir' field='dir' onBrowse={async () => undefined} />
    </Form>,
  ],
  ['AionScrollArea', <ui.AionScrollArea key='sa'>x</ui.AionScrollArea>],
  ['AppLoader', <ui.AppLoader key='al' />],
  [
    'CollapseGroup',
    <ui.CollapseGroup key='cg' expanded onToggle={noop} header='Group'>
      x
    </ui.CollapseGroup>,
  ],
  ['FlexFullContainer', <ui.FlexFullContainer key='ff'>x</ui.FlexFullContainer>],
  ['HorizontalScroller', <ui.HorizontalScroller key='hs'>x</ui.HorizontalScroller>],
  [
    'Section',
    <ui.Section key='sec' id='s' title='Section' collapsed={false} onToggleCollapsed={noop}>
      x
    </ui.Section>,
  ],
  ['SiderItem', <ui.SiderItem key='sid' icon={<span />} name='Item' />],
  [
    'WindowControls',
    <ui.WindowControls key='w' isMaximized={false} onMinimize={noop} onToggleMaximize={noop} onClose={noop} />,
  ],
  [
    'AionModal',
    <ui.AionModal key='m' visible header='Title'>
      body
    </ui.AionModal>,
  ],
  [
    'MentionMenuShell',
    <ui.MentionMenuShell key='mm' activeIndex={0} itemCount={0} label='Files'>
      x
    </ui.MentionMenuShell>,
  ],
  [
    'SlashCommandMenu',
    <ui.SlashCommandMenu
      key='sl'
      title='Commands'
      items={[]}
      activeIndex={0}
      onHoverItem={noop}
      onSelectItem={noop}
      emptyText='None'
    />,
  ],
  ['MobileActionSheet', <ui.MobileActionSheet key='ma' open entries={[]} onClose={noop} />],
  [
    'PreferenceRow',
    <ui.PreferenceRow key='p' label='Pref'>
      x
    </ui.PreferenceRow>,
  ],
  ['SettingsPageHeader', <ui.SettingsPageHeader key='sph' title='Settings' />],
  [
    'SectionCard',
    <ui.SectionCard key='scd' title='Card'>
      x
    </ui.SectionCard>,
  ],
  [
    'UploadProgressBar',
    <ui.UploadProgressBar
      key='up'
      isUploading
      activeCount={1}
      overallPercent={40}
      uploads={[{ id: 1, name: 'a.png', percent: 40 }]}
    />,
  ],
  ['FilePreview', <ui.FilePreview key='fp' path='/tmp/a.txt' size={2048} onRemove={noop} />],
  [
    'TabBar',
    <ui.TabBar
      key='tb'
      tabs={[{ id: 't', title: 'a.ts' }]}
      activeTabId='t'
      onSwitchTab={noop}
      onCloseTab={noop}
      onContextMenu={noop}
      tabsContainerRef={{ current: document.createElement('div') }}
      tabFadeState={{ left: false, right: false }}
    />,
  ],
  ['ForkBranchIcon', <ui.ForkBranchIcon key='fb' />],
  ['ThemedLogo', <ui.ThemedLogo key='tl' src={null} alt='logo' />],
];

describe('smoke: core entry renders without a provider', () => {
  it.each(coreCases)('%s mounts', (_name, element) => {
    const { unmount } = render(element);
    unmount();
  });

  it('wraps icon-park icons with AionUi defaults (size 16, stroke 3)', () => {
    const { container } = render(
      <ui.CollapseGroup expanded onToggle={noop} header='Group'>
        x
      </ui.CollapseGroup>
    );
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('16');
    expect(container.querySelector('[stroke-width="3"]')).not.toBeNull();
  });
});

const markdownCases: Array<[string, React.ReactElement]> = [
  ['Markdown', <md.Markdown key='md'>{'# Title\n\nSome **bold** text and `code`.'}</md.Markdown>],
  [
    'CodeBlock',
    <md.CodeBlock key='cb' className='language-ts'>
      {'const a = 1;'}
    </md.CodeBlock>,
  ],
  ['MermaidBlock', <md.MermaidBlock key='mb' code='graph TD; A-->B' />],
  ['WavedromBlock', <md.WavedromBlock key='wb' code='{ signal: [] }' />],
  ['DiagramZoomOverlay', <md.DiagramZoomOverlay key='dz' svg='<svg></svg>' ariaLabel='Diagram' onClose={noop} />],
  ['ShadowView', <md.ShadowView key='sv'>x</md.ShadowView>],
  [
    'LocalFileLink',
    <md.LocalFileLink key='lf' reference={{ filePath: '/a.ts', rawReference: '/a.ts' }}>
      a.ts
    </md.LocalFileLink>,
  ],
  ['Diff2Html', <md.Diff2Html key='dh' diff={'--- a/a.ts\n+++ b/a.ts\n@@ -1 +1 @@\n-a\n+b\n'} />],
];

describe('smoke: markdown entry renders without a provider or host', () => {
  it.each(markdownCases)('%s mounts', (_name, element) => {
    const { unmount } = render(element);
    unmount();
  });

  it('hides host-only actions when no host callbacks are provided', () => {
    const { queryByTestId } = render(<md.MermaidBlock code='graph TD; A-->B' />);
    expect(queryByTestId('mermaid-open-in-panel')).toBeNull();
  });
});
