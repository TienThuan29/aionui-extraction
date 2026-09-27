import { Button } from '@arco-design/web-react';
import { useState } from 'react';
import { AionSteps } from '@aionui/ui';

const steps = ['Install', 'Configure', 'Done'];

export default function Example() {
  const [current, setCurrent] = useState(1);
  return (
    <div className='max-w-560px'>
      <AionSteps current={current}>
        {steps.map((title) => (
          <AionSteps.Step key={title} title={title} />
        ))}
      </AionSteps>
      <div className='flex gap-8px mt-16px'>
        <Button disabled={current <= 1} onClick={() => setCurrent((c) => c - 1)}>
          Back
        </Button>
        <Button type='primary' disabled={current > steps.length} onClick={() => setCurrent((c) => c + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
}
