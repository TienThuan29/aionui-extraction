import { HorizontalScroller } from '@aionui/ui';

export default function Example() {
  return (
    <div className='max-w-480px'>
      <HorizontalScroller>
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className='shrink-0 w-140px h-56px rounded-8px bg-2 border border-b-base flex-center text-13px'>
            file-{i + 1}.ts
          </div>
        ))}
      </HorizontalScroller>
    </div>
  );
}
