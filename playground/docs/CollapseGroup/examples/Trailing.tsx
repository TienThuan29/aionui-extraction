import { Button, Message } from '@arco-design/web-react';
import { More } from '@icon-park/react';
import { CollapseGroup } from '@aionui/ui';
import { useState } from 'react';

export default function Example() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className='w-280px'>
      <CollapseGroup
        expanded={expanded}
        onToggle={() => setExpanded((v) => !v)}
        header='design-system'
        trailing={
          <Button
            type='text'
            size='mini'
            aria-label='More'
            icon={<More />}
            onClick={() => Message.info('Menu opened (the group did not toggle)')}
          />
        }
      >
        <div className='py-4px pl-24px text-13px'>Tokens audit</div>
      </CollapseGroup>
    </div>
  );
}
