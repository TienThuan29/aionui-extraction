import { ThoughtDisplay } from '@aionui/ui';

export default function Example() {
  return (
    <div className='max-w-560px'>
      <ThoughtDisplay running thought={{ subject: 'Planning', description: 'Reading the repository layout…' }} />
      <div className='relative z-2 h-56px rounded-16px border border-solid border-b-base bg-1' />
    </div>
  );
}
