import { useState } from 'react';
import { AionCollapse } from '@aionui/ui';

const faq = [
  { key: 'install', q: 'How do I install it?', a: 'npm i @aionui/ui plus the peer dependencies.' },
  { key: 'theme', q: 'Does it support dark mode?', a: 'Yes; set data-theme and arco-theme to "dark".' },
  { key: 'labels', q: 'Can I translate the labels?', a: 'Pass labels to UiProvider.' },
];

export default function Example() {
  const [open, setOpen] = useState<string[]>(['install']);
  return (
    <div className='max-w-520px'>
      <AionCollapse accordion bordered activeKey={open} onChange={setOpen}>
        {faq.map(({ key, q, a }) => (
          <AionCollapse.Item key={key} name={key} header={q}>
            <div className='p-12px text-13px'>{a}</div>
          </AionCollapse.Item>
        ))}
      </AionCollapse>
      <div className='text-13px text-t-secondary mt-8px'>Open: {open.join(', ') || 'none'}</div>
    </div>
  );
}
