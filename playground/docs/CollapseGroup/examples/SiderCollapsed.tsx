import { Switch } from '@arco-design/web-react';
import { Message as MessageIcon } from '@icon-park/react';
import { CollapseGroup } from '@aionui/ui';
import { useState } from 'react';

export default function Example() {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <div className='flex flex-col gap-12px'>
      <label className='flex items-center gap-8px text-13px'>
        <Switch size='small' checked={collapsed} onChange={setCollapsed} /> Collapsed sidebar
      </label>
      <div className={collapsed ? 'w-56px' : 'w-280px'}>
        <CollapseGroup expanded onToggle={() => {}} header='my-project' siderCollapsed={collapsed}>
          <div className='flex flex-col gap-8px py-4px'>
            <MessageIcon />
            <MessageIcon />
          </div>
        </CollapseGroup>
      </div>
    </div>
  );
}
