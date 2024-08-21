'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { useAppContext } from '@/app/provider';
import { DialogAuth } from '@/components/dialogs';
import { ErrorIcon, TourLoadingIcon } from '@/components/icon';
import { Button } from '@/components/ui';
import { toast } from '@/hooks';
import { parseErrorMessage } from '@/lib';
import { getTourOpenState, setTourOpenState } from '@/lib/storage';
import { PROFILE_ROUTES } from '@/configs/routes';

import { ItemBuddy } from '../buddy/components';
import { useBuddies } from '../buddy/hooks';
import { useTour, useTours } from '../profile/hooks';
import { TourQuickDetail, TourQuickDetailFocusing } from '../search/components';
import { DayItem, TourHeader, getElementLocId } from './components';

type Params = {
  tour_id: string;
};

type SearchParams = {
  index?: string;
};

const RelatedBuddy = () => {
  const router = useRouter();
  const [{ data }] = useBuddies();

  if (!data) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="flex flex-col gap-y-4">
        <h3 className="text-[18px] md:text-[24px] font-normal text-black">
          Một số buddy bạn có thể tham khảo tại đây
        </h3>
      </div>

      <div className="w-full inline-flex flex-wrap justify-between gap-y-7 sm:gap-y-12 mt-8">
        {data.map(buddy => {
          return (
            <ItemBuddy
              key={buddy.id}
              item={buddy}
              onClick={() => {
                router.push(PROFILE_ROUTES.profileId(buddy.id));
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

const TourPage = ({ params, searchParams }: PageProps<Params, SearchParams>) => {
  const tourId = params.tour_id;
  const isTourNull = tourId === '0';
  const router = useRouter();

  const [{ tourSearches, profile }, { setTourSearches }] = useAppContext();

  const [, { createTour, mutate: mutateFavoriteTour, deleteTour }] = useTours(
    undefined,
    'favorite',
  );
  const [, { mutate: mutateMyTours }] = useTours(undefined, 'list');
  const [, { mutate: mutateHome }] = useTours(undefined, 'home');
  const [{ data: dataApi, loading, validating, error }, { mutate, likeTour }] = useTour(
    isTourNull ? null : tourId,
  );

  const openState = useRef(getTourOpenState(tourId));

  const [focusing, setFocusing] = useState<TourQuickDetailFocusing>({
    day: 0,
    index: 0,
  });

  const data = !isTourNull
    ? dataApi
    : searchParams.index
    ? tourSearches?.data[Number(searchParams.index)]
    : undefined;
  const saveTourId = isTourNull ? searchParams.index : tourId;

  useEffect(() => {
    return () => {
      if (openState.current && saveTourId && openState.current[0].length) {
        setTourOpenState(saveTourId, openState.current);
      }
    };
  }, [saveTourId]);

  if (loading || validating) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <TourLoadingIcon className="w-[300px] h-[300px]" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <ErrorIcon size={300} />
        <p>Có một vài lỗi xảy ra</p>
        <Button onClick={() => mutate()} className="px-[70px] mt-8">
          Thử lại
        </Button>
      </div>
    );
  }

  const onChangeValue = (v: string[], dayIndex: number) => {
    if (!openState.current) {
      openState.current = data.schedule.map((day, index) => {
        if (index === dayIndex) {
          return v;
        }
        return [day[0]?.name ?? ''];
      });
    } else {
      openState.current = openState.current.map((value, index) => {
        if (index !== dayIndex) {
          return value;
        }
        return v;
      });
    }
  };

  const onLike = async () => {
    if (!profile) {
      DialogAuth.open({
        mode: 'sign-in',
      });
      return;
    }

    try {
      let res: TypeTour;

      if (!data.id) {
        res = await createTour({
          name: data.name,
          description: data.description,
          schedule: data.schedule,
          type: 'favorite',
        });
      } else {
        const resLike = await likeTour();
        res = {
          ...data,
          is_liked: resLike.status === 'like',
        };
      }

      if (!isTourNull) {
        await mutate(res, { revalidate: false });
      }

      if (searchParams.index !== undefined) {
        const index = Number(searchParams.index);
        setTourSearches(pre => {
          if (!pre) {
            return undefined;
          }
          const newTours = pre.data.map((v, i) => {
            if (i !== index) {
              return v;
            }
            return res;
          });
          return {
            text: pre.text,
            data: newTours,
          };
        });
      }

      await mutateFavoriteTour(
        pre => {
          if (!pre) {
            if (res.is_liked) {
              return [res];
            }
            return pre;
          }

          if (res.is_liked) {
            return [res, ...pre];
          }

          return pre.filter(t => t.id !== res.id);
        },
        { revalidate: false },
      );
      await mutateMyTours(
        pre => {
          const find = pre?.find(item => item.id === res.id);
          if (find) {
            return pre?.map(item => {
              if (item.id !== res.id) {
                return item;
              }
              return res;
            });
          }
        },
        {
          revalidate: false,
        },
      );
      await mutateHome(
        pre => {
          const find = pre?.find(item => item.id === res.id);
          if (find) {
            return pre?.map(item => {
              if (item.id !== res.id) {
                return item;
              }
              return res;
            });
          }
        },
        {
          revalidate: false,
        },
      );
    } catch (err) {
      toast({
        variant: 'destructive',
        description: parseErrorMessage(err),
      });
    }
  };

  const onDelete = async () => {
    try {
      await deleteTour(data.id ?? '');
      await mutateMyTours(
        pre => {
          const find = pre?.find(item => item.id === data.id);
          if (find) {
            return pre?.filter(item => item.id !== data.id);
          }
        },
        {
          revalidate: false,
        },
      );
      await mutateFavoriteTour(
        pre => {
          const find = pre?.find(item => item.id === data.id);
          if (find) {
            return pre?.filter(item => item.id !== data.id);
          }
        },
        {
          revalidate: false,
        },
      );
      router.back();
    } catch (err) {
      toast({
        variant: 'destructive',
        description: parseErrorMessage(err),
      });
    }
  };

  return (
    <main className="relative inline-flex container flex-col gap-y-12 md:gap-y-[124px] mt-4 bg-transparent">
      <article className="flex flex-col gap-y-[56px]">
        <TourHeader tour={data} onLike={onLike} onDelete={onDelete} />

        <div className="flex flex-row gap-x-[78px]">
          <section className="flex flex-col gap-y-12 w-full">
            {data.schedule.map((day, i) => (
              <DayItem
                day={i + 1}
                profiles={day}
                onItemClick={index => setFocusing({ day: i, index })}
                defaultValue={openState.current?.[i]}
                onChangeValue={v => onChangeValue(v, i)}
              />
            ))}
          </section>

          <section className="hidden md:block">
            <TourQuickDetail
              tour={data}
              formatDescription={loc => loc.location}
              focusing={focusing}
              onChangeFocusing={v => {
                const element = document.getElementById(getElementLocId(v.day, v.index ?? 0));
                element?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
                setFocusing(v);
              }}
              className="w-[30vw] lg:w-[25vw] top-[20px]"
            />
          </section>
        </div>
      </article>

      {/* <section className="flex flex-1">
          <RelatedPlaces profiles={profiles} previewProfile={previewProfile} />
        </section> */}

      <RelatedBuddy />
    </main>
  );
};

export default TourPage;
