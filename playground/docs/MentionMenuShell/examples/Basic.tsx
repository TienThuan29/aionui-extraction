import { Input } from '@arco-design/web-react';
import { FileCode } from '@icon-park/react';
import { useState } from 'react';
import { MentionMenuShell } from '@aionui/ui';

const files = [
  'src/index.ts',
  'src/App.tsx',
  'src/components/Button.tsx',
  'src/components/Modal.tsx',
  'src/hooks/useDebounce.ts',
  'src/utils/format.ts',
  'README.md',
  'package.json',
];

export default function Example() {
  const [active, setActive] = useState(0);
  return (
    <div className='w-420px'>
      <Input
        placeholder='Focus here and press ↑/↓'
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') setActive((i) => (i + 1) % files.length);
          if (e.key === 'ArrowUp') setActive((i) => (i - 1 + files.length) % files.length);
        }}
      />
      <div className='mt-8px'>
        <MentionMenuShell
          label='Files'
          title='Files'
          hint='Tab to insert'
          activeIndex={active}
          itemCount={files.length}
          maxHeight='180px'
          bodyClassName='flex flex-col gap-2px'
        >
          {files.map((path, index) => (
            <div
              key={path}
              role='option'
              aria-selected={index === active}
              onMouseEnter={() => setActive(index)}
              className={`flex items-center gap-8px px-10px py-6px rounded-8px text-13px cursor-pointer ${
                index === active ? 'bg-fill-2' : ''
              }`}
            >
              <FileCode />
              <div className='min-w-0'>
                <div className='font-medium'>{path.split('/').pop()}</div>
                <div className='text-12px text-t-secondary truncate'>{path}</div>
              </div>
            </div>
          ))}
        </MentionMenuShell>
      </div>
    </div>
  );
}
