import type { DocPage } from '../types';

const page: DocPage = {
  title: 'TabContextMenu',
  group: 'Tabs',
  order: 2,
  description:
    'The right-click menu of a tab: close this/left/right/others/unmodified/all, copy the absolute or workspace-relative path, and reveal in the file manager. It positions itself inside the viewport and closes on outside click or Escape.',
  components: ['TabContextMenu'],
  examples: [
    {
      file: 'Basic',
      title: 'With TabBar',
      description:
        'Right-click a tab. Path actions are enabled per tab by `canCopyPath`, `canCopyRelativePath` and `canRevealInFolder`.',
    },
  ],
  notes: [
    'Disabled entries stay visible (greyed out) so the menu keeps its shape.',
    'Shortcut hints use ⌘ on macOS (detected from the user agent; override with `isMac`). Labels come from UiProvider.',
  ],
};

export default page;
