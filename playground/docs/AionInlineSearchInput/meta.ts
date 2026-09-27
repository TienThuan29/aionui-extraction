import type { DocPage } from '../types';

const page: DocPage = {
  title: 'AionInlineSearchInput',
  group: 'Inputs',
  order: 3,
  description:
    'A light search field for the top of dropdown lists: gray fill, no border, no clear button. Same `value`/`onChange` API as AionSearchInput.',
  components: ['AionInlineSearchInput'],
  examples: [
    {
      file: 'InDropdown',
      title: 'Inside a dropdown',
      description: 'An Arco `Dropdown` whose list starts with a search field.',
    },
  ],
};

export default page;
