'use client';

import { cn } from '@/lib';

//#region temp
const length = 4;
const dayActive = 0;
const placeActive = 0;
//#endregion

const Schedule = () => (
  <div className="p-7 gap-y-5 flex flex-col rounded-[20px] border border-gray_300 sticky top-4 bg-white">
    <div className="flex gap-x-3">
      {Array.from({ length: 2 }, (_, i) => (
        <div
          key={i}
          className={cn(
            'text-black text-[14px] leading-[24px] font-normal py-[3px] px-4 rounded-full bg-gray_200',
            dayActive === i && 'bg-p_600',
          )}
        >
          Ngày 1
        </div>
      ))}
    </div>

    <div>
      {Array.from({ length }, (_, i) => (
        <div key={i} className="py-[3px] flex gap-x-4">
          <div className="flex flex-col gap-y-[6px] items-center">
            <div className={cn("w-[30px] h-[30px] rounded-full bg-gray_200 flex justify-center items-center", placeActive === i && 'bg-p_300')}>
              <div className="text-[16px] font-normal leading-[30px]">{i + 1}</div>
            </div>

            {i !== length - 1 && <div className="w-[1px] bg-gray_300 min-h-[32px] h-full" />}
          </div>

          <div>
            <p className={cn("text-black text-[16px] leading-[24px] font-normal", placeActive === i && 'text-p_700 font-medium')}>Cột cờ Hà Nội</p>
            <p className="text-gray_500 text-[14px] leading-[24px] font-normal">
              28A Điện Biên Phủ, Điện Biên, Ba Đình, Hà Nội
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Schedule;
