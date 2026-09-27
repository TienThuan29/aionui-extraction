import { Button } from '@arco-design/web-react';
import { Plus } from '@icon-park/react';
import { useState } from 'react';
import { SettingsPageHeader, type SettingsPageTab } from '@aionui/ui';

const tabs: SettingsPageTab[] = [
  { key: 'all', label: 'All', count: 12 },
  { key: 'mine', label: 'Mine', count: 3 },
  { key: 'shared', label: 'Shared' },
];

export default function Example() {
  const [tab, setTab] = useState('all');
  return (
    <div className='max-w-720px'>
      <SettingsPageHeader
        sticky={false}
        title='Assistants'
        description='Manage the assistants available in chat.'
        actions={
          <Button type='primary' icon={<Plus />}>
            New
          </Button>
        }
        tabs={tabs}
        activeTab={tab}
        onTabChange={setTab}
      />
      <div className='py-16px text-13px text-t-secondary'>Showing: {tab}</div>
    </div>
  );
}
