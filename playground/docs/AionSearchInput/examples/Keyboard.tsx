import { useState } from 'react';
import { AionSearchInput } from '@aionui/ui';

export default function Example() {
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState('');
  return (
    <div className='w-320px'>
      <AionSearchInput
        value={query}
        onChange={setQuery}
        onClear={() => {
          setQuery('');
          setSubmitted('');
        }}
        placeholder='Type and press Enter'
        inputProps={{
          'aria-label': 'Search the docs',
          onKeyDown: (e) => e.key === 'Enter' && setSubmitted(query),
        }}
      />
      <div className='text-13px text-t-secondary mt-8px'>Submitted: {submitted || '—'}</div>
    </div>
  );
}
