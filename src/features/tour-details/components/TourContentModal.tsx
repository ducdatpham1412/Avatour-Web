'use client';

import { useCallback, useState, type PropsWithChildren } from 'react';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui';

interface TourContentModalProps {
  title: string;
  content: string;
}

const CloseIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M28 16C28 22.6274 22.6274 28 16 28C9.37258 28 4 22.6274 4 16C4 9.37258 9.37258 4 16 4C22.6274 4 28 9.37258 28 16Z"
      fill="#ECECEC"
      stroke="#ECECEC"
      stroke-width="1.92"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M12 12L20 20M20 12L12 20"
      stroke="#9A9A9A"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const TourContentModal = ({
  title,
  content,
  children,
}: PropsWithChildren<TourContentModalProps>) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDialog = useCallback(() => setIsOpen(prev => !prev), []);

  return (
    <Dialog open={isOpen} onOpenChange={toggleDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent closeButton={<></>} className="!rounded-[16px] py-11 px-10 !max-w-[calc(100vw_-_40px)] md:!max-w-[40vw] !max-h-[80vh]">
        <div className="absolute top-3 right-3 cursor-pointer" onClick={toggleDialog}>
          <CloseIcon />
        </div>

        <div className='flex flex-col gap-y-6'>
          <h1 className="text-[32px] leading-[44px] font-normal">
            Dòng chảy ngàn năm lịch sử Hà Nội, một nghìn năm văn hiến
          </h1>
          <p className="text-[16px] leading-[28px] font-light">
            Khám phá lịch sử Hà Nội là một cuộc hành trình hấp dẫn để tìm hiểu về quá khứ của dân
            tộc Việt Nam cũng như giúp bạn thấy được sự phát triển của một thành phố hiện đại, năng
            động sau biết bao nhiêu biến cố đã xảy ra trong những năm tháng đầy khó khăn, khổ ải.
            Khám phá lịch sử Hà Nội là một cuộc hành trình hấp dẫn để tìm hiểu về quá khứ của dân
            tộc Việt Nam cũng như giúp bạn thấy được sự phát triển của một thành phố hiện đại, năng
            động sau biết bao nhiêu biến cố đã xảy ra trong những năm tháng đầy khó khăn, khổ ải.

            Khám phá lịch sử Hà Nội là một cuộc hành trình hấp dẫn để tìm hiểu về quá khứ của dân
            tộc Việt Nam cũng như giúp bạn thấy được sự phát triển của một thành phố hiện đại, năng
            động sau biết bao nhiêu biến cố đã xảy ra trong những năm tháng đầy khó khăn, khổ ải.
            Khám phá lịch sử Hà Nội là một cuộc hành trình hấp dẫn để tìm hiểu về quá khứ của dân
            tộc Việt Nam cũng như giúp bạn thấy được sự phát triển của một thành phố hiện đại, năng
            động sau biết bao nhiêu biến cố đã xảy ra trong những năm tháng đầy khó khăn, khổ ải.

            Khám phá lịch sử Hà Nội là một cuộc hành trình hấp dẫn để tìm hiểu về quá khứ của dân
            tộc Việt Nam cũng như giúp bạn thấy được sự phát triển của một thành phố hiện đại, năng
            động sau biết bao nhiêu biến cố đã xảy ra trong những năm tháng đầy khó khăn, khổ ải.
            Khám phá lịch sử Hà Nội là một cuộc hành trình hấp dẫn để tìm hiểu về quá khứ của dân
            tộc Việt Nam cũng như giúp bạn thấy được sự phát triển của một thành phố hiện đại, năng
            động sau biết bao nhiêu biến cố đã xảy ra trong những năm tháng đầy khó khăn, khổ ải.

            Khám phá lịch sử Hà Nội là một cuộc hành trình hấp dẫn để tìm hiểu về quá khứ của dân
            tộc Việt Nam cũng như giúp bạn thấy được sự phát triển của một thành phố hiện đại, năng
            động sau biết bao nhiêu biến cố đã xảy ra trong những năm tháng đầy khó khăn, khổ ải.
            Khám phá lịch sử Hà Nội là một cuộc hành trình hấp dẫn để tìm hiểu về quá khứ của dân
            tộc Việt Nam cũng như giúp bạn thấy được sự phát triển của một thành phố hiện đại, năng
            động sau biết bao nhiêu biến cố đã xảy ra trong những năm tháng đầy khó khăn, khổ ải.

            Khám phá lịch sử Hà Nội là một cuộc hành trình hấp dẫn để tìm hiểu về quá khứ của dân
            tộc Việt Nam cũng như giúp bạn thấy được sự phát triển của một thành phố hiện đại, năng
            động sau biết bao nhiêu biến cố đã xảy ra trong những năm tháng đầy khó khăn, khổ ải.
            Khám phá lịch sử Hà Nội là một cuộc hành trình hấp dẫn để tìm hiểu về quá khứ của dân
            tộc Việt Nam cũng như giúp bạn thấy được sự phát triển của một thành phố hiện đại, năng
            động sau biết bao nhiêu biến cố đã xảy ra trong những năm tháng đầy khó khăn, khổ ải.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TourContentModal;
