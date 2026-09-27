import { AionScrollArea } from '@aionui/ui';

export default function Example() {
  return (
    <AionScrollArea direction='x' className='w-320px border border-b-base rounded-8px p-12px'>
      <div className='flex gap-8px w-max'>
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className='w-80px h-48px rounded-6px bg-2 flex-center text-13px'>
            Card {i + 1}
          </div>
        ))}
      </div>
    </AionScrollArea>
  );
}
