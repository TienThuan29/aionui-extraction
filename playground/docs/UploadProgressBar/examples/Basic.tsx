import { Button } from '@arco-design/web-react';
import { useEffect, useState } from 'react';
import { UploadProgressBar, type UploadProgressItem } from '@aionui/ui';

const start: UploadProgressItem[] = [
  { id: 1, name: 'screenshot.png', percent: 10 },
  { id: 2, name: 'report.pdf', percent: 0 },
  { id: 3, name: 'dataset.csv', percent: 0 },
];

export default function Example() {
  const [uploads, setUploads] = useState(start);

  useEffect(() => {
    const timer = setInterval(() => {
      setUploads((list) =>
        list
          .map((u) => ({ ...u, percent: Math.min(100, u.percent + Math.round(Math.random() * 12)) }))
          .filter((u) => u.percent < 100)
      );
    }, 400);
    return () => clearInterval(timer);
  }, []);

  const overall = uploads.length ? Math.round(uploads.reduce((sum, u) => sum + u.percent, 0) / uploads.length) : 100;

  return (
    <div className='max-w-420px'>
      <UploadProgressBar
        isUploading={uploads.length > 0}
        activeCount={uploads.length}
        overallPercent={overall}
        uploads={uploads}
        onAbort={(id) => setUploads((list) => list.filter((u) => u.id !== id))}
      />
      {uploads.length === 0 && <Button onClick={() => setUploads(start)}>Upload again</Button>}
    </div>
  );
}
