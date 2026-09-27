import type { DocPage } from '../types';

const page: DocPage = {
  title: 'FileChangesPanel',
  group: 'Display',
  order: 5,
  description:
    'A collapsible list of files changed in a conversation, with insertion/deletion counts and a Preview button per file.',
  components: ['FileChangesPanel'],
  examples: [
    {
      file: 'Basic',
      title: 'Basic',
      description: '`onFileClick` handles Preview; with `onDiffClick` the +/- counts become clickable too.',
    },
  ],
  notes: ['The Preview label comes from UiProvider `labels.preview`.'],
};

export default page;
