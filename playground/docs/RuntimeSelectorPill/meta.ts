import type { DocPage } from '../types';

const page: DocPage = {
  title: 'RuntimeSelectorPill',
  group: 'Display',
  order: 6,
  description:
    'A small round button for model/runtime pickers: optional leading and trailing nodes and a label that scrolls as a marquee on hover when it is too long. Use it as the trigger of a Dropdown.',
  components: ['RuntimeSelectorPill', 'MarqueePillLabel', 'RuntimeSelectorLoadingIndicator'],
  examples: [
    {
      file: 'Basic',
      title: 'Dropdown trigger',
      description: 'With a leading icon and a chevron; hover the long label.',
    },
    { file: 'Loading', title: 'Loading and disabled', description: '`loading` swaps the trailing node for a spinner.' },
  ],
  notes: [
    '`className` is required: set the maximum width there so the marquee has something to overflow.',
    'MarqueePillLabel and RuntimeSelectorLoadingIndicator are the label and spinner used inside the pill, exported for custom pills.',
  ],
};

export default page;
