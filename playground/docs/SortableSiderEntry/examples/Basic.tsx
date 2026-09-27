import { DndContext, PointerSensor, closestCenter, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { FolderOpen } from '@icon-park/react';
import { SiderItem, SortableSiderEntry, restrictToVerticalAxis } from '@aionui/ui';
import { useState } from 'react';

export default function Example() {
  const [items, setItems] = useState(['Assistants', 'Scheduled tasks', 'Teams', 'Archive']);
  // A small activation distance keeps plain clicks working.
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;
    setItems((current) => arrayMove(current, current.indexOf(String(active.id)), current.indexOf(String(over.id))));
  };

  return (
    <div className='w-260px'>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={onDragEnd}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((name) => (
            <SortableSiderEntry key={name} id={name}>
              <SiderItem icon={<FolderOpen />} name={name} />
            </SortableSiderEntry>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
