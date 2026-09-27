import type { DocPage } from '../types';

const page: DocPage = {
  title: 'AionSteps',
  group: 'Display',
  order: 2,
  description:
    'Arco `Steps` with the AionUi brand colors and finished-state styling. Declare steps with `AionSteps.Step`; every Arco Steps prop works.',
  components: ['AionSteps'],
  examples: [
    { file: 'Basic', title: 'Basic', description: 'Step through with the buttons; `current` is 1-based.' },
    { file: 'Vertical', title: 'Vertical', description: '`direction="vertical"` with descriptions.' },
  ],
};

export default page;
