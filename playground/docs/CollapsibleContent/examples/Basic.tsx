import { CollapsibleContent } from '@aionui/ui';

export default function Example() {
  return (
    <div className='max-w-560px'>
      <CollapsibleContent maxHeight={80}>
        <pre className='m-0 text-12px leading-20px font-mono'>
          {Array.from({ length: 12 }, (_, i) => `[build] step ${i + 1}/12 finished in ${(i + 1) * 37}ms`).join('\n')}
        </pre>
      </CollapsibleContent>
    </div>
  );
}
