import { useState } from 'react';
import { AionSearchInput } from '@aionui/ui';

const conversations = ['Refactor the parser', 'Release notes for 0.2', 'Fix flaky test', 'Plan the docs site'];

export default function Example() {
  const [query, setQuery] = useState('');
  const matches = conversations.filter((title) => title.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className='w-320px'>
      <AionSearchInput value={query} onChange={setQuery} placeholder='Search conversations' />
      <ul className='text-13px mt-8px mb-0 pl-20px'>
        {matches.map((title) => (
          <li key={title}>{title}</li>
        ))}
      </ul>
    </div>
  );
}
