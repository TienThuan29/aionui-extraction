import { AionScrollArea, FlexFullContainer } from '@aionui/ui';

export default function Example() {
  return (
    <div className='h-240px w-360px flex flex-col border border-b-base rounded-8px overflow-hidden'>
      <div className='h-40px shrink-0 px-12px flex items-center border-b border-b-base text-13px font-600'>
        Header (40px)
      </div>
      <FlexFullContainer>
        <AionScrollArea className='h-full p-12px'>
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className='text-13px leading-22px'>
              Row {i + 1}
            </div>
          ))}
        </AionScrollArea>
      </FlexFullContainer>
    </div>
  );
}
