import { useState } from 'react';
import { AionSelect } from '@aionui/ui';

const models = [
  { label: 'Claude Sonnet', value: 'sonnet' },
  { label: 'Claude Opus', value: 'opus' },
  { label: 'Claude Haiku', value: 'haiku' },
];

export default function Example() {
  const [model, setModel] = useState('sonnet');
  return (
    <div className='flex items-center gap-12px'>
      <AionSelect className='w-240px' options={models} value={model} onChange={setModel} />
      <span className='text-13px text-t-secondary'>Selected: {model}</span>
    </div>
  );
}
