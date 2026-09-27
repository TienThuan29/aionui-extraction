import type { DocPage } from '../types';

const page: DocPage = {
  title: 'CollapsibleContent',
  group: 'Display',
  order: 3,
  description:
    'Caps long content at `maxHeight` behind a fade, with a "Show more" / "Show less" toggle. The toggle only appears when the content is actually taller.',
  components: ['CollapsibleContent'],
  examples: [
    { file: 'Basic', title: 'Basic', description: 'Long tool output collapsed to 80px.' },
    { file: 'Short', title: 'Short content', description: 'Content under `maxHeight` renders as-is, with no toggle.' },
    {
      file: 'Mask',
      title: 'On a colored background',
      description:
        '`useMask` fades with a CSS mask instead of a gradient, so it works on any background (for example inside an Alert).',
    },
  ],
  notes: ['The toggle texts come from UiProvider labels.'],
};

export default page;
