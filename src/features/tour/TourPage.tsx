'use client';

import { useMemo, useState } from 'react';

import { useRouter } from '@/hooks';

import { TourQuickDetail, TourQuickDetailFocusing } from '../search/components';
import { DayItem, RelatedPlaces, TourHeader, getElementLocId } from './components';
import type { TourProps } from './types';

interface TourPageProps extends TourProps {
  searchParams: {
    t: string;
  };
}

const TourPage = ({ searchParams }: TourPageProps) => {
  const router = useRouter();
  const [focusing, setFocusing] = useState<TourQuickDetailFocusing>({
    day: 0,
    index: 0,
  });

  const data = useMemo(
    () =>
      (searchParams.t ? JSON.parse(localStorage.getItem(searchParams.t) ?? '{}') : {}) as TypeTour,
    [],
  );

  if (!Object.keys(data).length) {
    router.replace('/search');
    return null;
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
    <main className="flex flex-col gap-y-12 md:gap-y-[124px]">
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

          <section className="hidden md:block w-[max(60%,_432px)]">
            <TourQuickDetail
              tour={data}
              formatDescription={loc => loc.location}
              focusing={focusing}
              onChangeFocusing={v => {
                const element = document.getElementById(getElementLocId(v.day, v.index ?? 0));
                element?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
                setFocusing(v);
              }}
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
