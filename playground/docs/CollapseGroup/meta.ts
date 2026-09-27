import type { DocPage } from '../types';

const page: DocPage = {
  title: 'CollapseGroup',
  group: 'Layout',
  order: 1,
  description:
    'A folder-style collapsible group for sidebar lists (for example a workspace with its conversations). It is controlled: you own the expanded state.',
  components: ['CollapseGroup'],
  examples: [
    { file: 'Basic', title: 'Basic', description: 'Toggle with the header; the content renders only while expanded.' },
    {
      file: 'Trailing',
      title: 'Trailing actions',
      description: 'Put buttons in the trailing slot. Clicking them does not toggle the group.',
    },
    {
      file: 'SiderCollapsed',
      title: 'Collapsed sidebar',
      description: 'With siderCollapsed the header hides and the content loses its indent, for an icon-only sidebar.',
    },
  ],
};

export default page;
