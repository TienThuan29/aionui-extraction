import { SettingsPageHeader } from '@aionui/ui';

export default function Example() {
  return (
    <SettingsPageHeader
      sticky={false}
      title='Appearance'
      description={
        <>
          Theme, font size and interface scale. <a href='#/ScaleControl'>See ScaleControl</a>.
        </>
      }
    />
  );
}
