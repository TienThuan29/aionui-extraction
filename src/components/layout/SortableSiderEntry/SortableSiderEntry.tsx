/**
 * @license
 * Copyright 2025 AionUi (aionui.com)
 * SPDX-License-Identifier: Apache-2.0
 */

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';

type SortableSiderEntryProps = {
  /** Unique id; must match an entry of the surrounding `SortableContext` `items`. */
  id: string;
  /** Temporarily exclude this entry from dragging. */
  disabled?: boolean;
  /** The draggable content (the whole entry is the drag handle). */
  children: React.ReactNode;
  /** `data-testid` on the wrapper. */
  testId?: string;
};

const SortableSiderEntry: React.FC<SortableSiderEntryProps> = ({ id, disabled = false, children, testId }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    disabled,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.45 : undefined,
    position: 'relative',
    zIndex: isDragging ? 1 : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} data-testid={testId} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

export default SortableSiderEntry;
