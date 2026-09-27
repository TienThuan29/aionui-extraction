import { CollapseGroup } from '@aionui/ui';
import { useState } from 'react';

export default function Example() {
  const [expanded, setExpanded] = useState(true);
  return (
    <div className='w-280px'>
      <CollapseGroup expanded={expanded} onToggle={() => setExpanded((v) => !v)} header='my-project'>
        <div className='flex flex-col gap-4px py-4px pl-24px text-13px'>
          <span>Refactor the parser</span>
          <span>Write release notes</span>
          <span>Fix flaky test</span>
        </div>
      </CollapseGroup>
    </div>
  );
}
