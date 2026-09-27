import type { DocPage } from '../types';

const page: DocPage = {
  title: 'ContextUsageIndicator',
  group: 'Display',
  order: 4,
  description:
    'A small ring showing how much of the context window is used; hover for a popover with the token breakdown and cost. The ring turns warning above 70% and danger above 90%.',
  components: ['ContextUsageIndicator'],
  examples: [
    { file: 'Basic', title: 'Levels', description: 'Normal, warning and danger levels. Hover a ring for details.' },
    {
      file: 'NoLimit',
      title: 'Unknown context window',
      description: 'With `context_limit` 0 the ring stays empty and the popover shows the raw token count.',
    },
  ],
  notes: [
    'Numbers are formatted with the UiProvider `locale`. The helpers `formatTokenCount`, `formatPercentage` and `formatCostAmount` are exported too.',
  ],
};

export default page;
