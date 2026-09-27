import { Delete, Edit, Message } from '@icon-park/react';
import { SiderItem, UiProvider } from '@aionui/ui';

export default function Example() {
  return (
    <UiProvider isMobile>
      <div className='w-260px'>
        <SiderItem
          icon={<Message />}
          name='Menu always visible'
          menuItems={[
            { key: 'rename', label: 'Rename', icon: <Edit /> },
            { key: 'delete', label: 'Delete', icon: <Delete />, danger: true },
          ]}
        />
      </div>
    </UiProvider>
  );
}
