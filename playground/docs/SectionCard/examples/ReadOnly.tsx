import { ConfigRow, ReadonlySelectionField, SectionCard } from '@aionui/ui';

export default function Example() {
  return (
    <div className='max-w-560px'>
      <SectionCard
        title='Runtime'
        legend={{ label: 'Applies next session', tone: 'next' }}
        readOnly
        readOnlyLabel='Managed by your team'
      >
        <div className='flex flex-col gap-12px'>
          <ConfigRow label='Model'>
            <ReadonlySelectionField value='claude-sonnet-5' />
          </ConfigRow>
          <ConfigRow label='Workspace' hint='Set by the team owner.'>
            <ReadonlySelectionField value='/srv/team/shared' />
          </ConfigRow>
        </div>
      </SectionCard>
    </div>
  );
}
