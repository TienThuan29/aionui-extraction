import type { DocPage } from '../types';

const page: DocPage = {
  title: 'FlexFullContainer',
  group: 'Layout',
  order: 5,
  description:
    'Fills the remaining space of a flex column with an absolutely positioned box, so children can use height: 100% (editors, virtual lists) without growing the column.',
  components: ['FlexFullContainer'],
  examples: [
    {
      file: 'Basic',
      title: 'Basic',
      description: 'A fixed header, then a body that takes exactly the rest of the column.',
    },
  ],
  notes: ['The parent must be a flex column with a bounded height.'],
};

export default page;
