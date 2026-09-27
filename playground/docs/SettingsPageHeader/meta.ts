import type { DocPage } from '../types';

const page: DocPage = {
  title: 'SettingsPageHeader',
  group: 'Settings',
  order: 3,
  description:
    'The header of a settings page: title and description on the left, actions on the right, and optional underline tabs with count badges. It sticks to the top of its scroll container by default.',
  components: ['SettingsPageHeader'],
  examples: [
    { file: 'Basic', title: 'With tabs', description: 'Controlled tabs with counts, and a primary action.' },
    { file: 'Simple', title: 'Title only', description: 'Without tabs or actions.' },
  ],
  notes: [
    'Sticky mode uses negative top margins sized for AionUi settings pages; pass `sticky={false}` when the header sits elsewhere (as in these examples).',
  ],
};

export default page;
