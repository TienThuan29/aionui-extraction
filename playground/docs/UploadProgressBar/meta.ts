import type { DocPage } from '../types';

const page: DocPage = {
  title: 'UploadProgressBar',
  group: 'Files',
  order: 2,
  description:
    'Overall and per-file upload progress, with an optional cancel button per file. You own the upload state; it renders nothing when `isUploading` is false.',
  components: ['UploadProgressBar'],
  examples: [
    {
      file: 'Basic',
      title: 'Simulated uploads',
      description: 'Progress advances on a timer; cancel removes a file. Restart when all are done.',
    },
  ],
};

export default page;
