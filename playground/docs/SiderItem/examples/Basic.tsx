import { Message } from '@icon-park/react';
import { SiderItem } from '@aionui/ui';
import { useState } from 'react';

const conversations = ['Refactor the parser', 'Release notes for 0.2', 'A very long conversation title that truncates'];

export default function Example() {
  const [selected, setSelected] = useState(conversations[0]);
  return (
    <div className='w-260px flex flex-col gap-2px'>
      {conversations.map((name, index) => (
        <SiderItem
          key={name}
          icon={<Message />}
          name={name}
          selected={name === selected}
          pinned={index === 1}
          onClick={() => setSelected(name)}
        />
      ))}
    </div>
  );
}
