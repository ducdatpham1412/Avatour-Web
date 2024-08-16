'use client';

import { useRef } from 'react';

import { SEARCH_ROUTES, TOUR_ROUTES } from '@/configs/routes';
import { ItemTour } from '@/features/profile/components';
import { useTours } from '@/features/profile/hooks';
import { useRouter } from '@/hooks';

import { SearchInputBase } from '../../components';

const Body = () => {
  const router = useRouter();
  const text = useRef('');
  const [{ data: tours }] = useTours(undefined, 'home');

  return (
    <div className="relative inline-flex flex-col items-center w-full gap-y-6">
      <div className="flex flex-col items-center">
        <p>
          <span className="text-p_600 text-[16px] md:text-[26px] sm:leading-[44px] font-medium">
            Avatour xin chào,
          </span>
          <span className="text-black text-[14px] md:text-[22px] sm:leading-[38px] font-normal text-center w-3/5 sm:w-auto">
            {' '}
            Bạn đã có lịch trình cho chuyến đi sắp tới chưa?
          </span>
        </p>
      </div>

      <SearchInputBase
        onChangeValue={v => (text.current = v)}
        onSearch={() => router.push(SEARCH_ROUTES.searchResult(text.current))}
      />

      <div className="w-[min(90%,_1000px)] inline-flex justify-between flex-wrap mt-2 gap-y-8 pb-[200px]">
        {tours?.map(item => {
          return (
            <ItemTour
              key={item.id}
              item={item}
              onClick={() => router.push(TOUR_ROUTES.tourDetail(item.id))}
              className="lg:w-[48%]"
            />
          );
        })}
      </div>

      {/* <div className="min-h-[200px] w-full flex flex-col items-center gap-y-7">
        {!!resource && (
          <>
            <SearchInputBase
              onChangeValue={v => (text.current = v)}
              onSearch={() => router.push(SEARCH_ROUTES.searchResult(text.current))}
            />
            <div className="flex flex-wrap justify-center gap-3 px-5">
              {resource.top_searches.map((e, i) => (
                <SuggestSearchItem key={i}>{e}</SuggestSearchItem>
              ))}
            </div>
          </>
        )}
      </div> */}

      {/* <div className="flex justify-center gap-x-4 absolute bottom-[128px] left-0 right-0 px-5">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://play.google.com/store/apps/details?id=com.doffy.android.production&hl=en"
          className="cursor-pointer"
        >
          <GooglePlayBadge />
        </a>

        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://apps.apple.com/vn/app/avatour-kh%C3%A1m-ph%C3%A1-ch%E1%BA%A5t-b%E1%BA%A3n-%C4%91%E1%BB%8Ba/id6449328273"
          className="cursor-pointer"
        >
          <AppStoreBadge />
        </a>
      </div> */}
    </div>
  );
};

export default Body;
