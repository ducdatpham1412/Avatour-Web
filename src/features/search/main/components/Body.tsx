'use client';

import { useRef } from 'react';

import { useAppContext } from '@/app/provider';
import { DialogAuth } from '@/components/dialogs';
import { SEARCH_ROUTES, TOUR_ROUTES } from '@/configs/routes';
import { useMagazines } from '@/features/magazine/hooks';
import { ItemMagazine, ItemTour } from '@/features/profile/components';
import { useTours } from '@/features/profile/hooks';
import { toast, useAllTours, useRouter } from '@/hooks';
import { parseErrorMessage } from '@/lib/utils';

import { SearchInputBase } from '../../components';

const Body = () => {
  const router = useRouter();
  const text = useRef('');
  const [{ profile, resource }] = useAppContext();
  const { mutateLikeTour } = useAllTours();
  const [{ data: magazines }] = useMagazines();
  const [, { likeTour }] = useTours();

  const onLikeTour = async (tourId: string) => {
    if (!profile) {
      DialogAuth.open({
        mode: 'sign-in',
      });
      return;
    }

    try {
      const res = await likeTour(tourId);
      const isLiked = res.status === 'like';
      await mutateLikeTour(tourId, isLiked);
    } catch (err) {
      toast({
        variant: 'destructive',
        description: parseErrorMessage(err),
      });
    }
  };

  return (
    <div className="relative w-full inline-flex flex-col gap-y-6 items-center">
      <p className="mt-[12px]">
        <span className="text-p_600 text-[20px] md:text-[26px] sm:leading-[44px] font-medium">
          Avatour xin chào,
        </span>
        <span className="text-black text-[18px] md:text-[22px] sm:leading-[38px] font-normal text-center w-3/5 sm:w-auto">
          {' '}
          Bạn đã có lịch trình cho chuyến đi sắp tới chưa?
        </span>
      </p>

      <SearchInputBase
        onChangeValue={v => (text.current = v)}
        onSearch={() => router.push(SEARCH_ROUTES.searchResult(text.current))}
        className="w-[min(100%,_1000px)]"
      />

      <div className="w-[min(100%,_1000px)] inline-flex justify-between flex-wrap mt-4 gap-y-8">
        {resource?.favorite_tours.map(item => {
          return (
            <ItemTour
              key={item.id}
              item={item}
              onClick={() => router.push(TOUR_ROUTES.tourDetail(item.id))}
              className="lg:w-[48%]"
              onLike={() => onLikeTour(item.id ?? '')}
              showAvatar
            />
          );
        })}
      </div>

      {!!magazines?.length && (
        <div className="w-[min(100%,_1000px)] inline-flex flex-col items-start mt-[60px]">
          <p className="text-black text-[26px] font-medium">Tạp chí du lịch</p>
          <div className="flex flex-1 gap-y-10 flex-col mt-8">
            {magazines.map(m => {
              return <ItemMagazine key={m.id} item={m} />;
            })}
          </div>
        </div>
      )}

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
