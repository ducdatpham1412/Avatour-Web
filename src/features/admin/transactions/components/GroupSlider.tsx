import { memo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import GroupCard from './GroupCard';

type GroupSliderProps = {
  data: TypeJoinPersonal[] | undefined;
};

const GroupSlider = memo(({ data }: GroupSliderProps) => (
  <div className="min-h-[160px] w-full">
    <Swiper className="w-full h-full" slidesPerView={2} spaceBetween={16}>
      {data?.map(group => (
        <SwiperSlide className="!bg-transparent">
          <GroupCard data={group} />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
));

export { GroupSlider as default, type GroupSliderProps };
