import type { DocPage } from '../types';

const page: DocPage = {
  title: 'TabBar',
  group: 'Tabs',
  order: 1,
  description:
    'The tab strip of a preview panel: file and browser tabs with close buttons, unsaved and agent markers, fade edges when the strip overflows, and optional maximize, new-tab and close-panel buttons. Fully controlled.',
  components: ['TabBar'],
  examples: [
    {
      file: 'Basic',
      title: 'Basic',
      description:
        'Switch and close tabs; add browser tabs with +. `useTabOverflow` supplies `tabsContainerRef` and `tabFadeState`.',
    },
  ],
  notes: [
    'Get `tabsContainerRef` and `tabFadeState` from `useTabOverflow(deps)`; pass the tab list as a dependency so the fades update when tabs change.',
    'Tabs are capped at 180px so a long page title never hides the other tabs.',
    'Pair it with TabContextMenu (right-click) and TabToolbar (actions for the active tab).',
  ],
};

export default page;
