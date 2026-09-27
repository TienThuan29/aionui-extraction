import { Button, Switch } from '@arco-design/web-react';
import { AionSelect, PreferenceRow } from '@aionui/ui';

export default function Example() {
  return (
    <div className='max-w-560px divide-y divide-solid divide-[var(--bg-3)]'>
      <PreferenceRow label='Auto update' description='Download updates in the background.'>
        <Switch defaultChecked />
      </PreferenceRow>
      <PreferenceRow label='Language'>
        <AionSelect
          className='w-160px'
          defaultValue='en'
          options={[
            { label: 'English', value: 'en' },
            { label: 'Tiếng Việt', value: 'vi' },
          ]}
        />
      </PreferenceRow>
      <PreferenceRow label='Cache' description='128 MB of downloaded models and previews.'>
        <Button size='small'>Clear</Button>
      </PreferenceRow>
    </div>
  );
}
