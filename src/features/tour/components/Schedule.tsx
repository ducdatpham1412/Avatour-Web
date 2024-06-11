'use client';

import { cn } from '@/lib';

interface ScheduleProps {
  locationSelected: { day: number; index: number };
  schedule: TypeTour['schedule'];
}

const Schedule = ({ locationSelected, schedule }: ScheduleProps) => (
  <div className="p-7 gap-y-5 flex flex-col rounded-[20px] border border-gray_300 sticky top-4 bg-white">
    <div className="flex gap-x-3">
      {Array.from({ length: schedule.length }, (_, i) => (
        <div
          key={i}
          className={cn(
            'text-black text-[14px] leading-[24px] font-normal py-[3px] px-4 rounded-full bg-gray_200',
            locationSelected.day === i + 1 && 'bg-p_600',
          )}
        >
          Ngày {i + 1}
        </div>
      ))}
    </div>

    <div>
      {schedule[locationSelected.day - 1].map((p, i, arr) => (
        <div key={i} className="py-[3px] flex gap-x-4">
          <div className="flex flex-col gap-y-[6px] items-center">
            <div
              className={cn(
                'w-[30px] h-[30px] rounded-full bg-gray_200 flex justify-center items-center',
                locationSelected.index === i && 'bg-p_300',
              )}
            >
              <div className="text-[16px] font-normal leading-[30px]">{i + 1}</div>
            </div>

            {i !== arr.length - 1 && <div className="w-[1px] bg-gray_300 min-h-[32px] h-full" />}
          </div>

          <div>
            <p
              className={cn(
                'text-black text-[16px] leading-[24px] font-normal',
                locationSelected.index === i && 'text-p_700 font-medium',
              )}
            >
              {p.name}
            </p>
            <p className="text-gray_500 text-[14px] leading-[24px] font-normal">{p.location}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Schedule;
