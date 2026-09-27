import type { DocPage } from '../types';

const page: DocPage = {
  title: 'AionSelect',
  group: 'Inputs',
  order: 1,
  description:
    'Arco `Select` with the AionUi border, radius and theme styles, and an extra 32px `middle` size (the default). The popup mounts on `document.body`.',
  components: ['AionSelect'],
  examples: [
    { file: 'Basic', title: 'Basic', description: 'Options as data; controlled value.' },
    {
      file: 'Multiple',
      title: 'Multiple and groups',
      description: '`mode="multiple"` with `AionSelect.OptGroup` and `AionSelect.Option` children.',
    },
    { file: 'Sizes', title: 'Sizes', description: '`mini`, `small`, `middle` (default), `default` and `large`.' },
  ],
  notes: ['Every Arco `Select` prop works as documented by Arco; only `size` is extended.'],
};

export default page;
