import type { DocPage } from '../types';

const page: DocPage = {
  title: 'AionCollapse',
  group: 'Display',
  order: 1,
  description:
    'Collapsible panels with the AionUi look. Declare panels with `AionCollapse.Item`; use it controlled (`activeKey`) or uncontrolled (`defaultActiveKey`).',
  components: ['AionCollapse', 'AionCollapse.Item'],
  examples: [
    { file: 'Basic', title: 'Basic', description: 'Uncontrolled, bordered, with a disabled panel.' },
    {
      file: 'Accordion',
      title: 'Accordion',
      description: 'Only one panel open at a time; the key list is controlled.',
    },
    {
      file: 'CustomIcon',
      title: 'Custom icon',
      description: '`expandIcon` receives the open state; `expandIconPosition="right"` moves it.',
    },
  ],
};

export default page;
