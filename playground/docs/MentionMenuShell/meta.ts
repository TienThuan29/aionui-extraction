import type { DocPage } from '../types';

const page: DocPage = {
  title: 'MentionMenuShell',
  group: 'Overlays',
  order: 4,
  description:
    'The floating frame shared by command and mention menus: glass surface, optional header, and a height-capped scroll region that keeps the active option in view. Render your own options inside it.',
  components: ['MentionMenuShell'],
  examples: [
    {
      file: 'Basic',
      title: 'Custom options',
      description:
        'Options are yours; give each `role="option"` and the active one `aria-selected`. ↑/↓ in the input scroll the list along.',
    },
    {
      file: 'Paging',
      title: 'Load more on scroll',
      description: '`onReachEnd` fires near the bottom; guard against duplicate calls while a page is loading.',
    },
  ],
  notes: [
    'Always render options inside the shell, never as its siblings: the height cap is what keeps a menu anchored above an input from growing off-screen.',
  ],
};

export default page;
