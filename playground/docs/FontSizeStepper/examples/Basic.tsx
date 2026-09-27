import { useState } from 'react';
import { FontSizeStepper } from '@aionui/ui';

export default function Example() {
  const [size, setSize] = useState(14);
  return (
    <div className='flex items-center gap-24px w-420px'>
      <span style={{ fontSize: size }}>Chat text</span>
      <FontSizeStepper
        value={size}
        min={10}
        max={24}
        step={1}
        defaultValue={14}
        resetLabel='Reset'
        onChange={setSize}
      />
    </div>
  );
}
