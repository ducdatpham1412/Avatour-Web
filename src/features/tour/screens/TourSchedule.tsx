import { PlusIcon, XIcon } from 'lucide-react';
import { ElementRef, useEffect, useRef } from 'react';

import { PencilIcon, TabView, WalletIcon } from '@/components';
import { DialogLocations } from '@/components/dialogs';
import { Button } from '@/components/ui';
import { cn, estTourPrice } from '@/lib';
import { formatTourPrice } from '@/lib/format';

import DayTour from './DayTour';
import HeaderCreateTour from './HeaderCreateTour';

interface Props {
  schedule: Array<TypeProfile[]>;
  onChangeSchedule: (sd: Array<TypeProfile[]>) => void;
  isEditing: boolean;
  onChangeEditing: () => void;
}

interface InfoBarProps {
  schedule: Props['schedule'];
  isEditing: boolean;
  onChangeEditing: () => void;
  className?: string;
}

const InfoBar = ({ className, isEditing, onChangeEditing, schedule }: InfoBarProps) => {
  const est = estTourPrice(schedule);
  const price = formatTourPrice(est.minCost, est.maxCost);

  const content = () => {
    if (isEditing) {
      return (
        <Button className="bg-blue px-[40px] text-white hover:bg-blue" onClick={onChangeEditing}>
          Lưu
        </Button>
      );
    }

    return (
      <>
        <WalletIcon size={18} />
        <p className="ml-[4px]">{price}</p>
        <p className="text-gray_500 mx-[2px]"> ・ </p>
        <button
          className="p-[8px] rounded-full bg-gray_200 hover:scale-[1.1] duration-300"
          role="button"
          onClick={onChangeEditing}
        >
          <PencilIcon size={17} />
        </button>
      </>
    );
  };

  return (
    <div className={cn('h-[35px] inline-flex flex-row items-center', className)}>{content()}</div>
  );
};

const TourSchedule = ({ schedule, onChangeSchedule, isEditing, onChangeEditing }: Props) => {
  const tabRef = useRef<ElementRef<typeof TabView>>(null);
  const locationsDialog = useRef<ElementRef<typeof DialogLocations>>(null);

  useEffect(() => {
    tabRef.current?.navigate(String(schedule.length - 1));
  }, [schedule.length]);

  const rightTrigger = () => {
    if (isEditing) {
      return undefined;
    }

    return {
      icon: <PlusIcon size={20} />,
      title: 'Thêm ngày',
      onPress: () => {
        const temp = [...schedule];
        temp.push([]);
        onChangeSchedule(temp);
      },
      className: 'bg-transparent',
    };
  };

  return (
    <div className="w-full h-full inline-flex flex-col">
      <HeaderCreateTour title="Bạn sẽ khám phá những địa điểm nào?" />

      <InfoBar
        schedule={schedule}
        isEditing={isEditing}
        onChangeEditing={onChangeEditing}
        className="md:hidden mt-2 self-end"
      />

      <div className="relative flex flex-1 pt-4">
        <TabView
          ref={tabRef}
          className="w-full h-full pb-0"
          listClassName="justify-start gap-[6px]"
          triggerClassName={isEditing ? 'pl-[20px] pr-[10px]' : 'px-[20px]'}
          contentClassName="h-[96%]" // TODO: Finding the way to h-full
          rightTrigger={rightTrigger()}
          tabs={schedule.map((day, idx) => {
            return {
              id: `${idx}`,
              title: `Ngày ${idx + 1}`,
              rightIcon: isEditing ? (
                <button
                  className="ml-[8px] bg-white rounded-full p-[2px]"
                  onClick={() => {
                    const update = schedule.filter((_, i) => i !== idx);
                    onChangeSchedule(update);
                  }}
                >
                  <XIcon size={8} />
                </button>
              ) : undefined,
              children: (
                <DayTour
                  locations={day}
                  isEditing={isEditing}
                  onChangeLocations={locs => {
                    const update = schedule.map((v, i) => {
                      if (i !== idx) {
                        return v;
                      }
                      return locs;
                    });
                    onChangeSchedule(update);
                  }}
                  onAddLocations={() =>
                    locationsDialog.current?.open({
                      currentLocs: day,
                      onSave: locs => {
                        const temp = [...schedule];
                        temp[idx] = locs;
                        onChangeSchedule(temp);
                      },
                    })
                  }
                />
              ),
            };
          })}
        />

        <InfoBar
          schedule={schedule}
          isEditing={isEditing}
          onChangeEditing={onChangeEditing}
          className="absolute top-4 right-0 hidden md:flex"
        />
      </div>

      <DialogLocations ref={locationsDialog} />
    </div>
  );
};

export default TourSchedule;
