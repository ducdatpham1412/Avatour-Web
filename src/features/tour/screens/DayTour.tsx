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
  horizontalListSortingStrategy,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { PlusIcon } from 'lucide-react';
import { DetailedHTMLProps, HTMLAttributes, useEffect, useMemo, useRef } from 'react';

import { CONTAINER_WIDTH } from '@/configs/constants';
import { useWindowSize } from '@/hooks';
import { cn, twConfigs } from '@/lib';

import { ItemLocationCreateTour } from '../components';

interface Props {
  locations: TypeProfile[];
  onChangeLocations: (locs: TypeProfile[]) => void;
  onAddLocations: () => void;
  isEditing: boolean;
}

const Comp = ({
  children,
  id,
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  return (
    <div className="relative w-full h-full">
      <div className="absolute w-full h-full sm:inline-flex sm:items-center pt-4">
        <div
          className={cn(
            'w-full h-full sm:h-auto [&>div]:flex-shrink-0 inline-flex flex-col sm:flex-row gap-[24px] overflow-y-scroll sm:overflow-y-hidden sm:overflow-x-scroll sm:my-auto pb-[40px] sm:pb-[40px] beautiful-scrollbar',
          )}
          id={id}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

const DayTour = ({ locations, onChangeLocations, onAddLocations, isEditing }: Props) => {
  const { width } = useWindowSize();
  //   const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
  //   const bind = useDrag(({ down, movement: [mx, my] }) => {
  //     api.start({ x: down ? mx : 0, y: down ? my : 0, immediate: down });
  //   });

  const beforeLength = useRef(locations.length);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const size = useMemo(() => {
    if (!width) {
      return window.innerWidth;
    }

    if (width <= CONTAINER_WIDTH.sm) {
      return 120;
    }

    if (width <= CONTAINER_WIDTH.md) {
      return 170;
    }

    return width * 0.19;
  }, [width]);

  const containerItem = width <= CONTAINER_WIDTH.sm ? '100%' : `${size}px`;

  useEffect(() => {
    if (locations.length > beforeLength.current) {
      const handle = document.getElementById('id_locations');
      if (handle) {
        handle.scrollTo({ left: handle.scrollWidth, behavior: 'smooth' });
      }
      beforeLength.current = locations.length;
    } else {
      beforeLength.current = locations.length;
    }
  }, [locations.length]);

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    if (active.id === over?.id) return;

    const activeIndex = locations.findIndex(loc => loc.id === active.id);
    const overIndex = locations.findIndex(loc => loc.id === over?.id);

    const newLocations = locations.filter((_, idx) => idx !== activeIndex);
    const activeLoc = locations[activeIndex];

    const left = newLocations.slice(0, overIndex);
    const right = newLocations.slice(overIndex, newLocations.length);

    onChangeLocations([...left, activeLoc, ...right]);
  };

  return (
    <Comp id="id_locations">
      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={onDragEnd}>
        <SortableContext
          items={locations.map(loc => loc.id)}
          strategy={
            width >= CONTAINER_WIDTH.sm
              ? horizontalListSortingStrategy
              : verticalListSortingStrategy
          }
        >
          {locations.map(loc => {
            return (
              <ItemLocationCreateTour
                item={loc}
                imageSize={size}
                containerWidth={containerItem}
                isEditing={isEditing}
                onDelete={() => {
                  onChangeLocations(locations.filter(l => l.id !== loc.id));
                }}
              />
            );
          })}
          {!isEditing && (
            <div
              style={{
                width: containerItem,
                height: size,
                // transform: `translate(${x}px, ${y}px)`
              }}
              className="border-[1.5px] border-dotted border-gray_500 rounded-[12px] inline-flex flex-col items-center justify-center hover:scale-x-[1.02] duration-300"
              role="button"
              id="drag"
              // {...bind()}
              onClick={onAddLocations}
            >
              <PlusIcon color={twConfigs.theme?.colors?.gray_500 as string} />
              <p className="text-gray_500 text-[14px] sm:text-[12px] md:text-[14px] lg:text-[16px]">
                Thêm địa điểm
              </p>
            </div>
          )}
        </SortableContext>
      </DndContext>
    </Comp>
  );
};

export default DayTour;
