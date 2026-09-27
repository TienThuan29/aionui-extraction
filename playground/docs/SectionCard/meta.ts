import type { DocPage } from '../types';

const page: DocPage = {
  title: 'SectionCard',
  group: 'Settings',
  order: 2,
  description:
    'A card for one section of a configuration form, with a title, an optional legend pill and a header slot. Fill it with ConfigRows: a fixed-width FieldLabel column and the field.',
  components: ['SectionCard', 'ConfigRow', 'FieldLabel', 'ReadonlySelectionField'],
  examples: [
    { file: 'Basic', title: 'Form section', description: 'ConfigRows with inputs, a hint and a legend.' },
    {
      file: 'ReadOnly',
      title: 'Read-only',
      description:
        '`readOnly` with `readOnlyLabel` adds a pill; ReadonlySelectionField shows values that cannot change.',
    },
  ],
  notes: [
    'ConfigRow wraps its `label` in a FieldLabel. Use FieldLabel yourself for custom rows, for example with `required`.',
  ],
};

export default page;
