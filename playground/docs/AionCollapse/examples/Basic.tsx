import { AionCollapse } from '@aionui/ui';

export default function Example() {
  return (
    <AionCollapse bordered defaultActiveKey='general' className='max-w-520px'>
      <AionCollapse.Item name='general' header='General'>
        <div className='p-12px text-13px'>Language, theme and startup behavior.</div>
      </AionCollapse.Item>
      <AionCollapse.Item name='models' header='Models'>
        <div className='p-12px text-13px'>Default model and API keys.</div>
      </AionCollapse.Item>
      <AionCollapse.Item name='beta' header='Beta features (coming soon)' disabled>
        <div className='p-12px text-13px'>Nothing here yet.</div>
      </AionCollapse.Item>
    </AionCollapse>
  );
}
