'use client';

import { TourLoadingIcon } from '@/components/icon';

const SearchLoading = () => (
  <div className="flex items-center justify-center h-[400px]">
    <div className="w-[300px] h-[300px] flex flex-col items-center">
      <TourLoadingIcon />
      <span className="text-[20px] text-gray-500">Đang tìm kiếm</span>
    </div>
  </div>
);

export default SearchLoading;
