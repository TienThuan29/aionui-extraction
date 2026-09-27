import { Folder, Setting as SettingRaw } from '@icon-park/react';
import { IconParkHOC } from '@aionui/ui';

// In your app, wrap once and reuse.
const Setting = IconParkHOC(SettingRaw);

export default function Example() {
  return (
    <div className='flex items-center gap-24px text-13px'>
      <span className='flex items-center gap-8px'>
        <Folder size={16} /> Plain icon-park
      </span>
      <span className='flex items-center gap-8px'>
        <Setting /> IconParkHOC defaults
      </span>
      <span className='flex items-center gap-8px'>
        <Setting size={20} fill='rgb(var(--primary-6))' /> Overridden
      </span>
    </div>
  );
}
