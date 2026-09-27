import type { DocPage } from '../types';

const page: DocPage = {
  title: 'AionModal',
  group: 'Overlays',
  order: 1,
  description:
    'Arco `Modal` with the AionUi look: preset sizes, a header/footer configuration, a standard task-dialog layout, and sizes that follow the UiProvider font scale.',
  components: ['AionModal'],
  examples: [
    {
      file: 'Basic',
      title: 'Basic',
      description:
        'A string `header` gets a close button; without `footer` you get Cancel and OK wired to `onCancel`/`onOk`.',
    },
    {
      file: 'Standard',
      title: 'Standard layout',
      description:
        '`variant="standard"` adds padded header, body and footer with dividers; `header` can carry a subtitle.',
    },
    {
      file: 'CustomFooter',
      title: 'Custom footer and size',
      description: 'Pass any node as `footer` (or `null` for none) and a preset `size`.',
    },
  ],
  notes: [
    'Preset sizes: small 400×300, medium 600×400, large 800×600, xlarge 1000×700, full 90vw×90vh. `style.width`/`style.height` override them.',
    'The default button texts come from UiProvider `labels.cancel` and `labels.confirm`; `cancelText`/`okText` override them.',
    '`title` and `showCustomClose` still work but are deprecated; use `header`.',
  ],
};

export default page;
