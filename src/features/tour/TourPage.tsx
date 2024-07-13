'use client';

import { useMemo, useState } from 'react';

import { ErrorIcon, TourLoadingIcon } from '@/components/icon';
import { Button } from '@/components/ui';

import { useTour } from '../profile/hooks';
import { TourQuickDetail, TourQuickDetailFocusing } from '../search/components';
import { DayItem, RelatedPlaces, TourHeader, getElementLocId } from './components';

type Params = {
  tour_id: number;
};

type SearchParams = {
  t: string;
};

const TourPage = ({ searchParams, params }: PageProps<Params, SearchParams>) => {
  const dataSearchParams = useMemo(() => {
    if (!searchParams.t) {
      return undefined;
    }
    const storage = localStorage.getItem(searchParams.t);
    return storage ? (JSON.parse(storage) as TypeTour) : undefined;
  }, []);
  const [{ data: dataApi, loading, validating, error }, { mutate }] = useTour(
    searchParams.t ? null : params.tour_id,
  );

  const [focusing, setFocusing] = useState<TourQuickDetailFocusing>({
    day: 0,
    index: 0,
  });

  const data = dataSearchParams ?? dataApi;

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

  return (
    <main className="relative inline-flex container flex-col gap-y-12 md:gap-y-[124px] mt-4 pb-[100px]">
      <article className="flex flex-col gap-y-[56px]">
        <TourHeader tour={data} />

        <div className="flex flex-row gap-x-[78px]">
          <section className="flex flex-col gap-y-12 w-full">
            {data.schedule.map((profile, i) => (
              <DayItem
                day={i + 1}
                profiles={profile}
                onItemClick={index => setFocusing({ day: i, index })}
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
