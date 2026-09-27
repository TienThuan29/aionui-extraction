import type { DocPage } from '../types';

const page: DocPage = {
  title: 'EmojiPicker',
  group: 'Inputs',
  order: 5,
  description:
    'A popover emoji grid with categories and recently used emojis, opened by clicking its child. Optionally adds a tab of image avatars.',
  components: ['EmojiPicker'],
  examples: [
    { file: 'Basic', title: 'Basic', description: 'The child is the trigger; the chosen emoji replaces it.' },
    {
      file: 'Avatars',
      title: 'Built-in avatars',
      description: 'With `builtinAvatars`, a second tab lists images; choosing one passes its `src` to `onChange`.',
    },
  ],
  notes: [
    'Recently used emojis are stored in `localStorage` under `aionui.emoji.recent`.',
    'Tab and category labels come from UiProvider labels.',
  ],
};

export default page;
