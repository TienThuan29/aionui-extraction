import { WindowControls } from '@aionui/ui';
import { useState } from 'react';

export default function Example() {
  const [isMaximized, setIsMaximized] = useState(false);
  const [lastAction, setLastAction] = useState('none');

  return (
    <div className='w-480px'>
      <div className='flex items-center h-36px border border-b-base rounded-8px overflow-hidden'>
        <span className='flex-1 px-12px text-13px text-t-secondary'>Last action: {lastAction}</span>
        <WindowControls
          isMaximized={isMaximized}
          onMinimize={() => setLastAction('minimize')}
          onToggleMaximize={() => {
            setIsMaximized((v) => !v);
            setLastAction(isMaximized ? 'restore' : 'maximize');
          }}
          onClose={() => setLastAction('close')}
        />
      </div>
    </div>
  );
}
