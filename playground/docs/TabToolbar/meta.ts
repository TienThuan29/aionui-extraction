import type { DocPage } from '../types';

const page: DocPage = {
  title: 'TabToolbar',
  group: 'Tabs',
  order: 3,
  description:
    'The action bar under a preview tab: source/preview toggle and split screen for Markdown, HTML and diffs, HTML inspect mode, refresh, save, open in system app, download and close. Which buttons show depends on the content flags you pass.',
  components: ['TabToolbar'],
  examples: [
    { file: 'Markdown', title: 'Markdown file', description: 'View mode and split screen are controlled.' },
    {
      file: 'Editable',
      title: 'Editable code with refresh',
      description: '`showSave` + `saveActionable` for unsaved edits; `refreshState="updated"` highlights refresh.',
    },
    {
      file: 'Html',
      title: 'HTML with inspect mode',
      description: 'Passing `onInspectModeToggle` adds the inspect button for HTML.',
    },
  ],
  notes: [
    'With `hasNoRenderableContent` the content actions hide, but "open in system" and download stay: they are the only way to reach the file.',
    'Download is hidden for code and Markdown files already on disk (`hasFilePath`): a copy would be redundant. Generated content and other types keep it.',
  ],
};

export default page;
