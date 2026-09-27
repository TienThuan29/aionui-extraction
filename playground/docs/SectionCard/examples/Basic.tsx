import { Button, Input } from '@arco-design/web-react';
import { ConfigRow, FieldLabel, SectionCard } from '@aionui/ui';

export default function Example() {
  return (
    <div className='max-w-560px'>
      <SectionCard
        title='Identity'
        legend={{ label: 'Applies now', tone: 'now' }}
        extra={
          <Button size='mini' type='text'>
            Reset
          </Button>
        }
      >
        <div className='flex flex-col gap-12px'>
          <ConfigRow label='Name' hint='Shown in the sidebar.'>
            <Input defaultValue='Research assistant' />
          </ConfigRow>
          <ConfigRow label='Description'>
            <Input.TextArea defaultValue='Finds and summarizes papers.' autoSize />
          </ConfigRow>
          <div className='flex items-start gap-12px'>
            <FieldLabel required>API key</FieldLabel>
            <Input.Password className='flex-1' placeholder='sk-…' />
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
