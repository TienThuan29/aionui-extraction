import { Alert } from '@arco-design/web-react';
import { CollapsibleContent } from '@aionui/ui';

export default function Example() {
  return (
    <Alert
      className='max-w-560px'
      type='warning'
      title='Command failed'
      content={
        <CollapsibleContent maxHeight={60} useMask>
          <div className='text-13px leading-20px'>
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i}>error TS2322: Type 'string' is not assignable to type 'number' (line {i * 7 + 3}).</div>
            ))}
          </div>
        </CollapsibleContent>
      }
    />
  );
}
