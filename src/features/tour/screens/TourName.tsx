import { UseFormRegisterReturn } from 'react-hook-form';

import { Input } from '@/components/ui';

import HeaderCreateTour from './HeaderCreateTour';

interface Props {
  onNext: () => void;
  register: UseFormRegisterReturn<'name'>;
  errorMessage: string | undefined;
}

const TourName = ({ onNext, register, errorMessage }: Props) => {
  return (
    <div className="w-full h-full inline-flex justify-center items-center">
      <div className="w-[90%] md:w-[70%] lg:w-[65%] xl:w-[60%] animate-zoom-out">
        <HeaderCreateTour title="Chuyến đi của bạn là gì?" />

        <Input
          className="border-gray_300 mt-[16px] px-[16px] rounded-full h-14 text-[14px]"
          placeholder="Mùa hè tại Đà Nẵng"
          onKeyDown={e => {
            if (e.key === 'Enter') {
              onNext();
            }
          }}
          useForm
          {...register}
          errorMessage={errorMessage}
          renderError={() => {
            return (
              <div className="text-sm text-red mt-2 ml-2 h-[30px]">
                <p>{errorMessage}</p>
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};

export default TourName;
