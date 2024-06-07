'use client';

import { useMemo, useState } from 'react';

import { useRouter } from '@/hooks';

import { DayItem, RelatedPlaces, Schedule, TourHeader } from './components';
import type { TourProps } from './types';

interface TourPageProps extends TourProps {
  searchParams: Record<string, any>;
}

const TourPage = ({ searchParams }: TourPageProps) => {
  const router = useRouter();
  const [locationSelected, setLocationSelected] = useState({ day: 1, index: 0 });

  const [data] = useState(
    () =>
      (searchParams.t
        ? JSON.parse(localStorage.getItem(searchParams.t) ?? '{}')
        : {}) as TypeTour,
  );

  const tourName = useMemo(
    () =>
      !data.name
        ? `${data.schedule[0]?.[0].name} -> ${data.schedule.at(-1)?.at(-1)?.name}`
        : data.name,
    [data.name],
  );

  if (!Object.keys(data).length) {
    router.replace('/search');
    return null;
  }

  return (
    <main className="flex flex-col gap-y-12 md:gap-y-[124px]">
      <article className="flex flex-col gap-y-[56px]">
        <TourHeader
          tags={['Văn hoá', 'Lịch sử']}
          title={tourName}
          description={data.description}
          cost={data.min_cost}
          duration={data.schedule.length}
        />

        <div className="flex flex-row gap-x-[78px]">
          <section className="flex flex-col gap-y-12 w-full">
            {data.schedule.map((profile, i) => (
              <DayItem
                day={i + 1}
                profiles={profile}
                onItemClick={index => setLocationSelected({ day: i + 1, index })}
              />
            ))}
          </section>

          <section className="hidden md:block w-[max(60%,_432px)]">
            <Schedule locationSelected={locationSelected} schedule={data.schedule} />
          </section>
        </div>
      </article>

      <section className="flex flex-1">
        <RelatedPlaces />
      </section>
    </main>
  );
};

export default TourPage;
