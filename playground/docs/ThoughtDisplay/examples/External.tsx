import { useState } from 'react';
import { ThoughtDisplay } from '@aionui/ui';

export default function Example() {
  // Started 95 seconds ago, for example as reported by a server.
  const [startedAtMs] = useState(() => Date.now() - 95_000);
  return (
    <div className='max-w-560px'>
      <ThoughtDisplay running externalElapsedSource startedAtMs={startedAtMs} statusText='Team member is working' />
      <div className='relative z-2 h-56px rounded-16px border border-solid border-b-base bg-1' />
    </div>
  );
}
