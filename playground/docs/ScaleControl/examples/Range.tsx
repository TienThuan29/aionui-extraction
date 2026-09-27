import { useState } from 'react';
import { ScaleControl } from '@aionui/ui';

export default function Example() {
  const [scale, setScale] = useState(1.5);
  return (
    <div className='w-360px'>
      <ScaleControl value={scale} onChange={setScale} min={1} max={2} step={0.25} defaultValue={1.5} />
    </div>
  );
}
