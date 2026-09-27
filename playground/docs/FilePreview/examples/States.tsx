import { FilePreview } from '@aionui/ui';

const noop = () => {};

export default function Example() {
  return (
    <div className='flex flex-wrap items-center gap-12px'>
      <FilePreview path='/tmp/loading.png' onRemove={noop} />
      <FilePreview path='/tmp/measuring.zip' onRemove={noop} />
      <FilePreview path='/tmp/sent.ts' size={3_200} onRemove={noop} readonly />
      <FilePreview path='/tmp/large-video.mp4' size={52_428_800} onRemove={noop} hint='Sent as a file path' />
    </div>
  );
}
