import { Button } from '@arco-design/web-react';
import { useState } from 'react';
import { AionModal } from '@aionui/ui';

export default function Example() {
  const [visible, setVisible] = useState(false);
  const close = () => setVisible(false);
  return (
    <>
      <Button onClick={() => setVisible(true)}>Show release notes</Button>
      <AionModal
        size='large'
        visible={visible}
        header='Release notes'
        onCancel={close}
        footer={{
          divider: true,
          render: () => (
            <div className='flex justify-between'>
              <Button type='text'>View on GitHub</Button>
              <Button type='primary' onClick={close}>
                Got it
              </Button>
            </div>
          ),
        }}
      >
        <div className='px-24px text-14px leading-24px'>
          <p>New: component documentation with live examples.</p>
          <p>Fixed: icon-park aliases in the build transform.</p>
        </div>
      </AionModal>
    </>
  );
}
