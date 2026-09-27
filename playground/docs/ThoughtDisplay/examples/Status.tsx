import { Message } from '@arco-design/web-react';
import { ThoughtDisplay } from '@aionui/ui';

export default function Example() {
  return (
    <div className='max-w-560px flex flex-col gap-32px'>
      <div>
        <ThoughtDisplay running />
        <div className='relative z-2 h-56px rounded-16px border border-solid border-b-base bg-1' />
      </div>
      <div>
        <ThoughtDisplay statusText='Agent failed to start' onRetryStart={() => Message.info('Retrying…')} />
        <div className='relative z-2 h-56px rounded-16px border border-solid border-b-base bg-1' />
      </div>
    </div>
  );
}
