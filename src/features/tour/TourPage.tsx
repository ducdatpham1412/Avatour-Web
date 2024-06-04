import { DayItem, RelatedPlaces, Schedule, TourHeader } from './components';
import type { TourProps } from './types';

interface TourPageProps extends TourProps {
  searchParams: Record<string, any>;
}

const TourPage = ({ params }: TourPageProps) => (
    <main className="flex flex-col gap-y-12 md:gap-y-[124px]">
      <article className="flex flex-col gap-y-[56px]">
        <TourHeader
          tags={['Văn hoá', 'Lịch sử']}
          title={'Dòng chảy ngàn năm lịch sử Hà Nội, một nghìn năm văn hiến'}
          description={
            'Khám phá lịch sử Hà Nội là một cuộc hành trình hấp dẫn để tìm hiểu về quá khứ của dân tộc Việt Nam cũng như giúp bạn thấy được sự phát triển của một thành phố hiện đại, năng động sau biết bao nhiêu biến cố đã xảy ra trong những năm tháng đầy khó khăn, khổ ải.\n\nKhám phá lịch sử Hà Nội là một cuộc hành trình hấp dẫn để tìm hiểu về quá khứ của dân tộc Việt Nam cũng như giúp bạn thấy được sự phát triển của một thành phố hiện đại, năng động sau biết bao nhiêu biến cố đã xảy ra trong những năm tháng đầy khó khăn, khổ ải.'
          }
        />

        <div className="flex flex-row gap-x-[78px]">
          <section className="flex flex-col gap-y-12 w-full">
            <DayItem day={1} />
            <DayItem day={2} />
          </section>

          <section className="hidden md:block w-[max(60%,_432px)]">
            <Schedule />
          </section>
        </div>
      </article>

      <section className="flex flex-1">
        <RelatedPlaces />
      </section>
    </main>
  );

export default TourPage;
