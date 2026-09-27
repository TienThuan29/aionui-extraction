import { useState } from 'react';
import { ScaleControl } from '@aionui/ui';

export default function Example() {
  const [scale, setScale] = useState(1);
  return (
    <div className='w-360px'>
      <ScaleControl value={scale} onChange={setScale} />
      <div className='mt-12px p-12px rounded-8px bg-2 origin-top-left' style={{ transform: `scale(${scale})` }}>
        Preview at {Math.round(scale * 100)}%
      </div>
    </div>
  );
}
