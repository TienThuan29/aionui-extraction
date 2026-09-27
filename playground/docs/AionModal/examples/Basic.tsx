import { Button } from '@arco-design/web-react';
import { useState } from 'react';
import { AionModal } from '@aionui/ui';

export default function Example() {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button onClick={() => setVisible(true)}>Open modal</Button>
      <AionModal
        visible={visible}
        header='Delete assistant?'
        onCancel={() => setVisible(false)}
        onOk={() => setVisible(false)}
      >
        <div className='p-24px text-14px'>This removes the assistant and its conversation history.</div>
      </AionModal>
    </>
  );
}
