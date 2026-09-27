import type { DocPage } from '../types';

const page: DocPage = {
  title: 'AppLoader',
  group: 'Layout',
  order: 6,
  description: 'A centered full-viewport spinner for app boot or route-level loading states.',
  components: ['AppLoader'],
  examples: [
    {
      file: 'Basic',
      title: 'Basic',
      description: 'It fills the viewport (min-height: 100vh), so this example shows it as an overlay for two seconds.',
    },
  ],
};

export default page;
