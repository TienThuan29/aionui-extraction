import { Minus, Plus } from '@icon-park/react';
import { AionCollapse } from '@aionui/ui';

export default function Example() {
  return (
    <AionCollapse
      className='max-w-520px'
      expandIconPosition='right'
      expandIcon={(active) => (active ? <Minus /> : <Plus />)}
    >
      <AionCollapse.Item name='a' header='Show details'>
        <div className='p-12px text-13px'>Details appear here.</div>
      </AionCollapse.Item>
    </AionCollapse>
  );
}
