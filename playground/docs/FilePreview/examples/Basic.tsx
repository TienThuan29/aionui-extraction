import { Button } from '@arco-design/web-react';
import { useState } from 'react';
import { FilePreview } from '@aionui/ui';

const thumbnail =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60'><rect width='60' height='60' fill='%233b82f6'/><circle cx='42' cy='18' r='8' fill='%23fde047'/><path d='M0 60 L22 30 L40 60 Z' fill='%2322c55e'/></svg>";

const initial = [
  { path: '/tmp/report.pdf', size: 1_572_864 },
  { path: '/tmp/notes.md', size: 2048 },
  { path: '/tmp/screenshot.svg', size: 48_000, imageSrc: thumbnail },
];

export default function Example() {
  const [files, setFiles] = useState(initial);
  return (
    <div className='flex flex-wrap items-center gap-12px'>
      {files.map((file) => (
        <FilePreview
          key={file.path}
          {...file}
          onRemove={() => setFiles((list) => list.filter((f) => f.path !== file.path))}
        />
      ))}
      {files.length === 0 && <Button onClick={() => setFiles(initial)}>Reset</Button>}
    </div>
  );
}
