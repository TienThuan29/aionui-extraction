import type { DocPage } from '../types';

const page: DocPage = {
  title: 'SlashCommandMenu',
  group: 'Overlays',
  order: 3,
  description:
    'The `/` command list shown above a chat input: command, description, optional badge and match highlighting, inside a MentionMenuShell. You own filtering, the active index and keyboard handling.',
  components: ['SlashCommandMenu'],
  examples: [
    {
      file: 'Basic',
      title: 'With an input',
      description: 'Type after `/` to filter; ↑/↓ move, Enter picks. Matched characters are highlighted.',
    },
    {
      file: 'States',
      title: 'Loading and empty',
      description: '`loading` shows `loadingText`; no items shows `emptyText`.',
    },
  ],
  notes: ['Position it yourself, for example `absolute bottom-[calc(100%+8px)]` above the input.'],
};

export default page;
