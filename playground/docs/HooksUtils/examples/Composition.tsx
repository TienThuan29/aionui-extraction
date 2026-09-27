import { Input } from '@arco-design/web-react';
import { useState } from 'react';
import { useCompositionInput } from '@aionui/ui';

export default function Example() {
  const [text, setText] = useState('');
  const [sent, setSent] = useState<string[]>([]);
  const { compositionHandlers, createKeyDownHandler, isComposingState } = useCompositionInput();

  const send = () => {
    if (!text.trim()) return;
    setSent((list) => [...list, text]);
    setText('');
  };

  return (
    <div className='w-420px flex flex-col gap-8px text-13px'>
      <Input.TextArea
        autoSize
        placeholder='Enter to send, Shift+Enter for a new line'
        value={text}
        onChange={setText}
        onKeyDown={createKeyDownHandler(send)}
        {...compositionHandlers}
      />
      <div className='text-12px text-t-secondary'>{isComposingState ? 'Composing (IME)…' : 'Ready'}</div>
      {sent.map((message, i) => (
        <div key={i} className='whitespace-pre-wrap px-8px py-4px rounded-6px bg-2'>
          {message}
        </div>
      ))}
    </div>
  );
}
