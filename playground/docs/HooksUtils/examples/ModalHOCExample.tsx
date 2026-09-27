import { Button, Modal } from '@arco-design/web-react';
import { ModalHOC } from '@aionui/ui';

// The body receives your props plus `modalProps` (visible, onCancel) and `modalCtrl.close()`.
const RenameModal = ModalHOC<{ name: string }>(
  ({ name, modalProps, modalCtrl }) => (
    <Modal {...modalProps} title='Rename' onOk={() => modalCtrl.close()}>
      Rename “{name}”?
    </Modal>
  ),
  { okText: 'Rename' }
);

export default function Example() {
  const [modal, element] = RenameModal.useModal({ name: 'Untitled' });
  return (
    <div className='flex gap-8px'>
      <Button onClick={() => modal.open()}>Rename “Untitled”</Button>
      <Button onClick={() => modal.open({ name: 'Release notes' })}>Rename “Release notes”</Button>
      {element}
    </div>
  );
}
