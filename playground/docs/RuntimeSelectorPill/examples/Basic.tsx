import { Dropdown, Menu } from '@arco-design/web-react';
import { Brain, Down } from '@icon-park/react';
import { useState } from 'react';
import { RuntimeSelectorPill } from '@aionui/ui';

const models = ['claude-sonnet-5', 'claude-opus-5-5 · extended thinking · high effort', 'claude-haiku-4-5'];

export default function Example() {
  const [model, setModel] = useState(models[1]);
  return (
    <Dropdown
      trigger='click'
      droplist={
        <Menu onClickMenuItem={setModel}>
          {models.map((m) => (
            <Menu.Item key={m}>{m}</Menu.Item>
          ))}
        </Menu>
      }
    >
      <RuntimeSelectorPill className='max-w-220px' leading={<Brain />} label={model} trailing={<Down />} />
    </Dropdown>
  );
}
