import { AionScrollArea } from '@aionui/ui';

export default function Example() {
  return (
    <AionScrollArea className='h-160px w-320px border border-b-base rounded-8px p-12px'>
      {Array.from({ length: 30 }, (_, i) => (
        <div key={i} className='text-13px leading-22px'>
          Line {i + 1}
        </div>
      ))}
    </AionScrollArea>
  );
}
