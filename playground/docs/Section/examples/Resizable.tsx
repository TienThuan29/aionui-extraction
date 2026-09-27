import { Section, SectionDivider } from '@aionui/ui';
import { useRef, useState } from 'react';

const DEFAULT_HEIGHT = 96;

export default function Example() {
  const [height, setHeight] = useState(DEFAULT_HEIGHT);
  // Height when the current drag started; onDrag reports the total distance since then.
  const dragStart = useRef(DEFAULT_HEIGHT);

  return (
    <div className='w-360px h-300px border border-b-base rounded-8px flex flex-col overflow-hidden'>
      <div style={{ height }} className='shrink-0 overflow-auto'>
        <Section id='repos' title='Repositories' collapsed={false} onToggleCollapsed={() => {}}>
          <div className='px-12px py-8px text-13px'>aionui-ui · main</div>
        </Section>
      </div>
      <SectionDivider
        onDrag={(delta) => setHeight(Math.max(40, Math.min(220, dragStart.current + delta)))}
        onDragEnd={() => {
          dragStart.current = height;
        }}
        onDoubleReset={() => {
          setHeight(DEFAULT_HEIGHT);
          dragStart.current = DEFAULT_HEIGHT;
        }}
      />
      <div className='flex-1 min-h-0 overflow-auto'>
        <Section id='changes' title='Changes' collapsed={false} onToggleCollapsed={() => {}}>
          <div className='px-12px py-8px text-13px'>src/index.ts</div>
        </Section>
      </div>
    </div>
  );
}
