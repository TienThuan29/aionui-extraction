import { Message as Toast } from '@arco-design/web-react';
import { Delete, Edit, Message, Pushpin } from '@icon-park/react';
import { SiderItem, type SiderMenuItem } from '@aionui/ui';

const menuItems: SiderMenuItem[] = [
  { key: 'rename', label: 'Rename', icon: <Edit /> },
  { key: 'pin', label: 'Pin', icon: <Pushpin /> },
  { key: 'delete', label: 'Delete', icon: <Delete />, danger: true },
];

export default function Example() {
  return (
    <div className='w-260px'>
      <SiderItem
        icon={<Message />}
        name='Hover me'
        menuItems={menuItems}
        onMenuAction={(key) => Toast.info(`Menu action: ${key}`)}
      />
    </div>
  );
}
