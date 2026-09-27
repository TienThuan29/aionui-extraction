import { Message } from '@arco-design/web-react';
import { useState } from 'react';
import { TabToolbar } from '@aionui/ui';

export default function Example() {
  const [viewMode, setViewMode] = useState<'source' | 'preview'>('preview');
  const [split, setSplit] = useState(false);
  return (
    <div className='max-w-720px border border-solid border-b-base rounded-8px overflow-hidden'>
      <TabToolbar
        content_type='markdown'
        isMarkdown
        isHTML={false}
        file_name='README.md'
        viewMode={viewMode}
        isSplitScreenEnabled={split}
        showOpenInSystemButton
        hasFilePath
        onViewModeChange={setViewMode}
        onSplitScreenToggle={() => setSplit((v) => !v)}
        onOpenInSystem={() => Message.info('Open in system app')}
        onDownload={() => Message.info('Download')}
        onClose={() => Message.info('Close panel')}
      />
      <div className='p-16px text-13px text-t-secondary'>
        View: {viewMode}
        {split && ' · split screen'}
      </div>
    </div>
  );
}
