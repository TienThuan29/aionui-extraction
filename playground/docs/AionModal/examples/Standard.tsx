import { Button, Input } from '@arco-design/web-react';
import { useState } from 'react';
import { AionModal } from '@aionui/ui';

export default function Example() {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  return (
    <>
      <Button onClick={() => setVisible(true)}>New workspace</Button>
      <AionModal
        variant='standard'
        visible={visible}
        header={{ title: 'New workspace', subtitle: 'Workspaces group related conversations.', showClose: true }}
        okText='Create'
        okButtonProps={{ disabled: !name }}
        onCancel={() => setVisible(false)}
        onOk={() => setVisible(false)}
      >
        <Input placeholder='Workspace name' value={name} onChange={setName} />
      </AionModal>
    </>
  );
}
