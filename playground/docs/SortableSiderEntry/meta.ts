import type { DocPage } from '../types';

const page: DocPage = {
  title: 'SortableSiderEntry',
  group: 'Layout',
  order: 8,
  description:
    'Makes any sidebar entry draggable inside a @dnd-kit SortableContext. You own the order; update it in the DndContext onDragEnd handler.',
  components: ['SortableSiderEntry'],
  examples: [{ file: 'Basic', title: 'Reorder a list', description: 'Drag the rows to reorder them.' }],
  notes: ['Requires the @dnd-kit/core, @dnd-kit/sortable and @dnd-kit/utilities peer dependencies.'],
};

export default page;
