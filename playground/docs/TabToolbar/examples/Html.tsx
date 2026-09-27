import { useState } from 'react';
import { TabToolbar } from '@aionui/ui';

const noop = () => {};

export default function Example() {
  const [viewMode, setViewMode] = useState<'source' | 'preview'>('preview');
  const [inspect, setInspect] = useState(false);
  return (
    <div className='max-w-720px border border-solid border-b-base rounded-8px overflow-hidden'>
      <TabToolbar
        content_type='html'
        isMarkdown={false}
        isHTML
        file_name='landing.html'
        viewMode={viewMode}
        isSplitScreenEnabled={false}
        showOpenInSystemButton={false}
        hasFilePath={false}
        inspectMode={inspect}
        onInspectModeToggle={() => setInspect((v) => !v)}
        onViewModeChange={setViewMode}
        onSplitScreenToggle={noop}
        onOpenInSystem={noop}
        onDownload={noop}
        onClose={noop}
      />
      <div className='p-16px text-13px text-t-secondary'>
        View: {viewMode} · inspect {inspect ? 'on' : 'off'}
      </div>
    </div>
  );
}
