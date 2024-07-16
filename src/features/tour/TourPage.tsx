'use client';

import { useEffect, useRef, useState } from 'react';

import { useAppContext } from '@/app/provider';
import { ErrorIcon, TourLoadingIcon } from '@/components/icon';
import { Button } from '@/components/ui';
import { toast } from '@/hooks';
import { parseErrorMessage } from '@/lib';
import { getTourOpenState, setTourOpenState } from '@/lib/storage';

import { useTour, useTours } from '../profile/hooks';
import { TourQuickDetail, TourQuickDetailFocusing } from '../search/components';
import { DayItem, RelatedPlaces, TourHeader, getElementLocId } from './components';

type Params = {
  tour_id: string;
};

type SearchParams = {
  index?: string;
};

const TourPage = ({ params, searchParams }: PageProps<Params, SearchParams>) => {
  const tourId = Number(params.tour_id);
  const [{ tourSearches }, { setTourSearches }] = useAppContext();
  const openState = useRef(getTourOpenState(tourId));
  const [, { createTour, mutate: mutateFavoriteTour }] = useTours(undefined, 'favorite');
  const [{ data: dataApi, loading, validating, error }, { mutate, likeTour }] = useTour(
    tourId === 0 ? null : tourId,
  );

  const [focusing, setFocusing] = useState<TourQuickDetailFocusing>({
    day: 0,
    index: 0,
  });

  const data = tourId
    ? dataApi
    : searchParams.index
    ? tourSearches?.data[Number(searchParams.index)]
    : undefined;

  useEffect(() => {
    return () => {
      if (openState.current) {
        setTourOpenState(tourId, openState.current);
      }
    };
  }, [tourId]);

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

  let previewProfile: TypeProfile | undefined = undefined;
  const profiles = data.schedule.reduce((pre, cur) => {
    if (pre.length >= 3) {
      if (!previewProfile) {
        previewProfile = cur[0];
      }
      return pre;
    }
    cur.every(p => {
      if (pre.length >= 3) {
        if (!previewProfile) {
          previewProfile = p;
        }
        return false;
      }
      if (p.link.length) {
        pre.push(p);
      } else if (!previewProfile) {
        previewProfile = p;
      }
      return true;
    });
    return pre;
  }, [] as TypeProfile[]);

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

      if (tourId) {
        await mutate(
          pre => {
            if (pre) {
              return res;
            }
          },
          { revalidate: false },
        );
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
    } catch (err) {
      toast({
        variant: 'destructive',
        description: parseErrorMessage(err),
      });
    }
  };

  return (
    <main className="relative inline-flex container flex-col gap-y-12 md:gap-y-[124px] mt-4 pb-[100px]">
      <article className="flex flex-col gap-y-[56px]">
        <TourHeader tour={data} onLike={onLike} />

        <div className="flex flex-row gap-x-[78px]">
          <section className="flex flex-col gap-y-12 w-full">
            {data.schedule.map((profile, i) => (
              <DayItem
                day={i + 1}
                profiles={profile}
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
              className="w-[30vw] lg:w-[25vw]"
            />
          </section>
        </div>
      </article>

      {!!previewProfile && (
        <section className="flex flex-1">
          <RelatedPlaces profiles={profiles} previewProfile={previewProfile} />
        </section>
      )}
    </main>
  );
};

export default TourPage;
