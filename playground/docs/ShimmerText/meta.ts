import type { DocPage } from '../types';

const page: DocPage = {
  title: 'ShimmerText',
  group: 'Display',
  order: 7,
  description: 'Text with a light sweep animating across it, for "thinking" and loading states.',
  components: ['ShimmerText'],
  examples: [
    { file: 'Basic', title: 'Basic', description: 'Default 3-second sweep.' },
    {
      file: 'Speed',
      title: 'Speed and hover',
      description: '`duration` in seconds; `pauseOnHover` stops it under the pointer.',
    },
  ],
};

export default page;
