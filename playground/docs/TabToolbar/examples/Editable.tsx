import { Input, Message } from '@arco-design/web-react';
import { useState } from 'react';
import { TabToolbar } from '@aionui/ui';

const saved = 'export const answer = 42;';
const noop = () => {};

export default function Example() {
  const [text, setText] = useState(saved);
  const [lastSaved, setLastSaved] = useState(saved);
  const [refreshState, setRefreshState] = useState('updated');
  return (
    <div className='max-w-720px border border-solid border-b-base rounded-8px overflow-hidden'>
      <TabToolbar
        content_type='code'
        isMarkdown={false}
        isHTML={false}
        file_name='answer.ts'
        viewMode='source'
        isSplitScreenEnabled={false}
        showOpenInSystemButton
        hasFilePath
        showSave
        saveActionable={text !== lastSaved}
        onSave={() => {
          setLastSaved(text);
          Message.success('Saved');
        }}
        refreshState={refreshState}
        refreshActionable
        onRefresh={() => setRefreshState('idle')}
        onViewModeChange={noop}
        onSplitScreenToggle={noop}
        onOpenInSystem={noop}
        onDownload={noop}
        onClose={noop}
      />
      <Input.TextArea className='!border-none font-mono' autoSize value={text} onChange={setText} />
    </div>
  );
}
