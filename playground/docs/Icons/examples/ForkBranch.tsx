import { Button } from '@arco-design/web-react';
import { ForkBranchIcon } from '@aionui/ui';

export default function Example() {
  return (
    <div className='flex items-center gap-16px'>
      <ForkBranchIcon />
      <ForkBranchIcon size={24} />
      <ForkBranchIcon size={32} fill='rgb(var(--primary-6))' />
      <Button icon={<ForkBranchIcon />}>Fork conversation</Button>
    </div>
  );
}
