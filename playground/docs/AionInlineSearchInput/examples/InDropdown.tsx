import { Button, Dropdown } from '@arco-design/web-react';
import { Down } from '@icon-park/react';
import { useState } from 'react';
import { AionInlineSearchInput } from '@aionui/ui';

const projects = ['aionui', 'aionui-ui', 'design-system', 'docs-site', 'playground'];

export default function Example() {
  const [query, setQuery] = useState('');
  const [project, setProject] = useState(projects[0]);
  const matches = projects.filter((name) => name.includes(query.toLowerCase()));

  const list = (
    <div className='w-240px p-6px rounded-8px bg-1 border border-solid border-b-base shadow-lg'>
      <AionInlineSearchInput value={query} onChange={setQuery} placeholder='Find a project' autoFocus />
      <div className='mt-4px'>
        {matches.map((name) => (
          <div
            key={name}
            className='px-8px py-6px rounded-6px text-13px cursor-pointer hover:bg-fill-2'
            onClick={() => setProject(name)}
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Dropdown droplist={list} trigger='click' onVisibleChange={(visible) => visible && setQuery('')}>
      <Button>
        {project} <Down />
      </Button>
    </Dropdown>
  );
}
