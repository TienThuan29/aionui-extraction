import { Button, Message } from '@arco-design/web-react';
import { Camera, FolderOpen, Picture } from '@icon-park/react';
import { useState } from 'react';
import { MobileActionSheet } from '@aionui/ui';

export default function Example() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Attach…</Button>
      <MobileActionSheet
        open={open}
        title='Attach'
        onClose={() => setOpen(false)}
        entries={[
          {
            key: 'file',
            icon: <FolderOpen />,
            label: 'Upload from device',
            description: 'Images, PDFs, code',
            onClick: () => Message.info('Upload'),
          },
          { key: 'photo', icon: <Picture />, label: 'Photo library', onClick: () => Message.info('Photos') },
          { key: 'camera', icon: <Camera />, label: 'Take a photo', disabled: true },
        ]}
      />
    </>
  );
}
