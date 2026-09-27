import type { DocPage } from '../types';

const page: DocPage = {
  title: 'ScaleControl',
  group: 'Inputs',
  order: 7,
  description:
    'An interface scale control: a slider with minus/plus buttons, the current percentage and a reset button. The slider applies its value on release, not while dragging.',
  components: ['ScaleControl'],
  examples: [
    { file: 'Basic', title: 'Basic', description: 'Scales the preview card; `onChange` may return a promise.' },
    { file: 'Range', title: 'Custom range', description: '`min`, `max`, `step` and `defaultValue` are configurable.' },
  ],
};

export default page;
