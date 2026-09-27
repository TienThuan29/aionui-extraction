import type { DocPage } from '../types';

const page: DocPage = {
  title: 'MobileActionSheet',
  group: 'Overlays',
  order: 2,
  description:
    'A bottom sheet for touch layouts. Entries run an action and close, or open a submenu of options (single-select, multi-select or plain actions).',
  components: ['MobileActionSheet'],
  examples: [
    { file: 'Basic', title: 'Actions', description: 'Entries with `onClick` run it and close the sheet.' },
    {
      file: 'Submenus',
      title: 'Submenus',
      description:
        'A radio submenu closes on choice; `multiSelect` toggles checkboxes and stays open. `meta` shows the current value.',
    },
  ],
  notes: ['The sheet renders in a portal on `document.body`, with a backdrop that closes it.'],
};

export default page;
