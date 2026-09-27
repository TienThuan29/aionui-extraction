import type { DocPage } from '../types';

const page: DocPage = {
  title: 'Section',
  group: 'Layout',
  order: 2,
  description:
    'A collapsible panel section with a title, a dimmed badge and a header action slot, like the sections of a source-control side panel. SectionDivider is a drag handle for resizing stacked sections.',
  components: ['Section', 'SectionDivider'],
  examples: [
    {
      file: 'Basic',
      title: 'Basic',
      description: 'Badge after the title, actions on the right. Clicks on actions do not collapse the section.',
    },
    {
      file: 'Resizable',
      title: 'Resizable stack',
      description: 'Drag the divider to resize the upper section; double-click it to reset.',
    },
  ],
};

export default page;
