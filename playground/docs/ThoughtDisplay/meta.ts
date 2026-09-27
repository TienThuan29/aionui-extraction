import type { DocPage } from '../types';

const page: DocPage = {
  title: 'ThoughtDisplay',
  group: 'Display',
  order: 8,
  description:
    'The status strip above a chat input while an agent works: a spinner, the current thought (subject tag and description) or a status text, and the elapsed time. Renders nothing when idle.',
  components: ['ThoughtDisplay'],
  examples: [
    { file: 'Basic', title: 'Thought', description: 'A running thought; the timer counts from mount.' },
    {
      file: 'Status',
      title: 'Status only',
      description:
        'Without `thought`, the row shows `statusText` (or "Processing"); `onRetryStart` adds a retry button.',
    },
    {
      file: 'External',
      title: 'External start time',
      description:
        'With `externalElapsedSource`, elapsed time counts from `startedAtMs`, so a remount keeps the count.',
    },
  ],
  notes: [
    'It is drawn to sit behind the top edge of the input (negative bottom margin); give the input a higher z-index.',
    'Time units and default texts come from UiProvider labels.',
  ],
};

export default page;
