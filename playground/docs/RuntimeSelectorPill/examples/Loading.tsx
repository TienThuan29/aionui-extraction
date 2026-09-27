import { Down } from '@icon-park/react';
import { RuntimeSelectorPill } from '@aionui/ui';

export default function Example() {
  return (
    <div className='flex gap-12px'>
      <RuntimeSelectorPill className='max-w-200px' label='Connecting…' trailing={<Down />} loading />
      <RuntimeSelectorPill className='max-w-200px' label='Offline' trailing={<Down />} disabled />
    </div>
  );
}
