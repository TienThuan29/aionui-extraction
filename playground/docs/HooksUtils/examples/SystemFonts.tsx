import { Button } from '@arco-design/web-react';
import { AionSelect, useSystemFonts } from '@aionui/ui';

export default function Example() {
  const { fonts, status, load } = useSystemFonts();
  return (
    <div className='flex items-center gap-12px text-13px'>
      <Button onClick={load} loading={status === 'loading'}>
        Load system fonts
      </Button>
      <span className='text-t-secondary'>
        {status}
        {status === 'ready' && ` · ${fonts.length} families`}
      </span>
      {fonts.length > 0 && (
        <AionSelect
          className='w-240px'
          showSearch
          placeholder='Pick a font'
          options={fonts.map((family) => ({
            label: <span style={{ fontFamily: family }}>{family}</span>,
            value: family,
          }))}
        />
      )}
    </div>
  );
}
