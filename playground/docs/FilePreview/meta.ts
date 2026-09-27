import type { DocPage } from '../types';

const page: DocPage = {
  title: 'FilePreview',
  group: 'Files',
  order: 1,
  description:
    'An attachment chip: images show a 60px thumbnail (click to preview), other files show the name, extension and size. A × button removes it unless `readonly`.',
  components: ['FilePreview'],
  examples: [
    { file: 'Basic', title: 'Attachments', description: 'Files and an image; remove them with ×.' },
    {
      file: 'States',
      title: 'Loading, read-only and hint',
      description: 'Without `imageSrc` or `size` a placeholder shows; `hint` adds a tooltip.',
    },
  ],
  notes: ['Sizes are formatted with the UiProvider `locale`.'],
};

export default page;
