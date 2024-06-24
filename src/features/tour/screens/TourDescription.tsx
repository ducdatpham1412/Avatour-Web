import { UseFormRegisterReturn } from 'react-hook-form';

import { Textarea } from '@/components/ui';

import HeaderCreateTour from './HeaderCreateTour';

interface Props {
  register: UseFormRegisterReturn<'description'>;
}

const TourDescription = ({ register }: Props) => {
  return (
    <div className="w-full h-full inline-flex justify-center items-center">
      <div className="w-[90%] md:w-[70%] lg:w-[65%] xl:w-[60%]">
        <HeaderCreateTour title="Bạn hãy thêm mô tả cho chuyến đi của mình nhé!" />

        <Textarea
          className="w-full border-[1px] border-gray_300 mt-[16px] px-[16px] py-[12px] rounded-[16px] h-[200px] text-[14px] text-start"
          placeholder="Một số lưu ý, Thời gian đẹp nhất,..."
          {...register}
        />
      </div>
    </div>
  );
};

export default TourDescription;
