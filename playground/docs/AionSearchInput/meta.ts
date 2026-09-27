import type { DocPage } from '../types';

const page: DocPage = {
  title: 'AionSearchInput',
  group: 'Inputs',
  order: 2,
  description:
    'The standard search bar: search icon, input and a round clear button. It only handles look and input; filtering and debouncing stay with you.',
  components: ['AionSearchInput'],
  examples: [
    { file: 'Basic', title: 'Filter a list', description: 'Controlled value; the list filters as you type.' },
    {
      file: 'Keyboard',
      title: 'Native input props',
      description: 'Pass `inputProps` for keyboard handlers and ARIA attributes; `onClear` replaces the default clear.',
    },
  ],
  notes: [
    'Use AionSearchInput for always-visible search bars and AionInlineSearchInput inside dropdowns.',
    'The clear button label comes from UiProvider `labels.clear`.',
  ],
};

export default page;
