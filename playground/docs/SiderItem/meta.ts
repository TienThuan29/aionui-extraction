import type { DocPage } from '../types';

const page: DocPage = {
  title: 'SiderItem',
  group: 'Layout',
  order: 7,
  description:
    'A sidebar row with an icon, a truncated name, an optional pin marker and a "more" menu that appears on hover.',
  components: ['SiderItem'],
  examples: [
    { file: 'Basic', title: 'Basic', description: 'Selected and pinned states.' },
    {
      file: 'WithMenu',
      title: 'Menu actions',
      description: 'Hover a row to reveal the menu; onMenuAction receives the chosen key.',
    },
    {
      file: 'Mobile',
      title: 'Mobile',
      description: 'With UiProvider isMobile the menu button is always visible, since touch screens have no hover.',
    },
  ],
};

export default page;
