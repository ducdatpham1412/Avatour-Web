import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Dispatch, SetStateAction } from 'react';

import { ItemContentMagazine } from '../components';

interface Props {
  contents: MagazineContent[];
  setContents: Dispatch<SetStateAction<MagazineContent[]>>;
}

const Contents = ({ contents, setContents }: Props) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    if (active.id === over?.id) {
      return;
    }

    const activeIndex = contents.findIndex(c => c.id === active.id);
    const overIndex = contents.findIndex(c => c.id === over?.id);

    const newContents = contents.filter(c => c.id !== active.id);
    const activeContent = contents[activeIndex];

    const left = newContents.slice(0, overIndex);
    const right = newContents.slice(overIndex, newContents.length);

    setContents([...left, activeContent, ...right]);
  };

  return (
    <div className="w-full">
      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={onDragEnd}>
        <SortableContext
          items={contents.map(c => c.id ?? '')}
          strategy={verticalListSortingStrategy}
        >
          {contents.map((c, i) => {
            return (
              <ItemContentMagazine
                key={c.id}
                content={c}
                onChange={v => {
                  setContents(pre => {
                    pre[i] = v;
                    return [...pre];
                  });
                }}
                onDelete={() => {
                  setContents(pre => {
                    pre.splice(i, 1);
                    return [...pre];
                  });
                }}
              />
            );
          })}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default Contents;
