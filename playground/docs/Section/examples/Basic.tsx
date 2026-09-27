import { Button } from '@arco-design/web-react';
import { Refresh } from '@icon-park/react';
import { Section } from '@aionui/ui';
import { useState } from 'react';

export default function Example() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className='w-360px border border-b-base rounded-8px'>
      <Section
        id='changes'
        title='Changes'
        badge={<span>3</span>}
        collapsed={collapsed}
        onToggleCollapsed={() => setCollapsed((v) => !v)}
        actions={<Button type='text' size='mini' aria-label='Refresh' icon={<Refresh />} />}
      >
        <div className='px-12px py-8px text-13px flex flex-col gap-4px'>
          <span>src/index.ts</span>
          <span>src/App.tsx</span>
          <span>README.md</span>
        </div>
      </Section>
    </div>
  );
}
