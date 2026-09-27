import type { DocPage } from '../types';

const page: DocPage = {
  title: 'FontSizeStepper',
  group: 'Inputs',
  order: 6,
  description:
    'A compact integer stepper for font sizes: minus, the current value, plus and a reset button. Fully controlled; values are clamped to `min`–`max`.',
  components: ['FontSizeStepper'],
  examples: [{ file: 'Basic', title: 'Basic', description: 'Drives the font size of the preview text.' }],
  notes: ['The minus/plus aria-labels come from UiProvider `labels.fontSizeDecrease` and `labels.fontSizeIncrease`.'],
};

export default page;
