import { calcTravelDuration } from '@/lib';

import TruncatedText from './TruncatedText';
import { formatCurrency } from '../utils';

interface TourHeaderProps {
  tags: string[];
  title: string;
  description: string;
  cost: number;
  duration: number;
}

const TourHeader = ({ tags, title, description, cost, duration }: TourHeaderProps) => (
  <header className="flex flex-col">
    <div className="text-gray_500 text-[14px] font-normal leading-[24px]">{tags.join(' | ')}</div>

    <section className="flex flex-col md:flex-row items-start gap-y-6 md:gap-x-[min(20%,_254px)] justify-between">
      <div className="flex flex-col gap-y-5">
        <h1 className="text-[24px] leading-[36px] md:text-[32px] md:leading-[44px] font-normal text-black">
          {title}
        </h1>
        {!!description && (
          <TruncatedText
            headerTitle={title}
            fullContentInModal
            className="text-black whitespace-pre-line font-light text-[15px] leading-[24px] md:text-[16px] md:leading-[28px]"
          >
            {description}
          </TruncatedText>
        )}
      </div>

      <div className="flex flex-col items-start md:items-end p-4 gap-y-0.5 border border-p_600 rounded-[16px] bg-p_50 w-full md:w-auto">
        <span className="whitespace-nowrap text-[16px] leading-[24px] md:text-[24px] md:leading-[36px] font-medium text-p_700">
          Chỉ từ {formatCurrency(cost)}/người
        </span>
        <span className="text-[16px] text-black leading-[24px] md:text-[20px] font-medium md:leading-[28px]">
          {calcTravelDuration(duration, false)}
        </span>
      </div>
    </section>
  </header>
);

export default TourHeader;
