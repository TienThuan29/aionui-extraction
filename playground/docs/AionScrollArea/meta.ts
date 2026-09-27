import type { DocPage } from '../types';

const page: DocPage = {
  title: 'AionScrollArea',
  group: 'Layout',
  order: 3,
  description:
    'A div that scrolls in one or both directions with the thin AionUi scrollbar. It accepts every div attribute.',
  components: ['AionScrollArea'],
  examples: [
    { file: 'Vertical', title: 'Vertical', description: 'The default direction.' },
    { file: 'Horizontal', title: 'Horizontal', description: "direction='x' scrolls sideways." },
  ],
  notes: ['The thin scrollbar styling comes from arco-theme.css; without it the platform scrollbar is used.'],
};

export default page;
