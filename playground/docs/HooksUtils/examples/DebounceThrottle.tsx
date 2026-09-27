import { Input } from '@arco-design/web-react';
import { useState } from 'react';
import { useDebounce, useThrottle } from '@aionui/ui';

export default function Example() {
  const [text, setText] = useState('');
  const [debounced, setDebounced] = useState({ value: '', calls: 0 });
  const [throttled, setThrottled] = useState({ value: '', calls: 0 });

  const onDebounced = useDebounce((value: string) => setDebounced((s) => ({ value, calls: s.calls + 1 })), 500, []);
  const onThrottled = useThrottle((value: string) => setThrottled((s) => ({ value, calls: s.calls + 1 })), 500, []);

  return (
    <div className='w-360px flex flex-col gap-8px text-13px'>
      <Input
        placeholder='Type quickly…'
        value={text}
        onChange={(value) => {
          setText(value);
          onDebounced(value);
          onThrottled(value);
        }}
      />
      <div>
        Debounced: “{debounced.value}” ({debounced.calls} calls)
      </div>
      <div>
        Throttled: “{throttled.value}” ({throttled.calls} calls)
      </div>
    </div>
  );
}
