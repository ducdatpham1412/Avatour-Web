'use client';
import { useAppContext } from '@/app/provider';

import { SearchInputBase, SuggestSearchItem } from '../../components';
import AppStoreBadge from './AppStoreBadge';
import GooglePlayBadge from './GooglePlayBadge';

const Body = () => {
  const [{ resource }] = useAppContext();

  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center min-h-[100vh] gap-y-7">
      <div className="flex flex-col items-center">
        <span className="text-p_600 text-[26px] sm:text-[36px] sm:leading-[44px] font-medium">
          Avatour xin chào,
        </span>
        <span className="text-black text-[20px] sm:text-[30px] sm:leading-[38px] font-normal text-center w-3/5 sm:w-auto">
          Bạn muốn khám phá địa điểm nào?
        </span>
      </div>

      <div className="min-h-[200px] w-full flex flex-col items-center gap-y-7">
        {!!resource && (
          <>
            <SearchInputBase />
            <div className="flex flex-wrap justify-center gap-3 px-5">
              {resource.top_searches.map((e, i) => (
                <SuggestSearchItem key={i}>{e}</SuggestSearchItem>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex justify-center gap-x-4 absolute bottom-[128px] left-0 right-0 px-5">
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
      </div>
    </div>
  );
};

export default Body;
