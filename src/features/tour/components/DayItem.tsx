'use client';

import * as Accordion from '@radix-ui/react-accordion';

import { Icon } from '@/components/icon';
import { Image } from '@/components/ui';

import TruncatedText from './TruncatedText';

interface DayItemProps {
  day: number;
}

const DayItem = ({ day }: DayItemProps) => (
  <div className="flex flex-col">
    <div className="flex gap-x-3 items-center">
      <div className="w-3 h-3 rounded-full bg-p_600" />
      <div className="text-p_700 text-[18px] font-medium leading-[28px]">
        Ngày {day}
      </div>
    </div>

    <Accordion.Root
      className="flex flex-col w-full"
      type="multiple"
      defaultValue={["item-0"]}
    >
      {Array.from({ length: 3 }, (_, i) => (
        <Accordion.Item
          value={`item-${i}`}
          key={i}
          className="py-5 md:py-6 border-b w-full overflow-hidden"
        >
          <Accordion.Header className="">
            <Accordion.Trigger className="group w-full">
              <div className="flex items-start md:items-center justify-between w-full">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-x-2 gap-y-[6px]">
                  <div className="flex items-center gap-x-2">
                    <Icon name="museum" size={24} />
                    <h2 className="text-[16px] text-black leading-[24px] md:text-[18px] md:leading-[28px] font-medium">
                      Hooàng Thành Thăng Long
                    </h2>
                  </div>

                  <div className="hidden md:block w-[1px] h-7 bg-gray_300" />

                  <div className="flex items-center gap-x-2">
                    <div className="flex items-center gap-x-[2px]">
                      <Icon name="star" size={24} />
                      <div className="text-[14px] text-black leading-[24px] font-light">5</div>
                    </div>
                    <div className='text-black text-[14px] leading-[24px] font-light'> • </div>
                    <div className="text-[14px] text-black leading-[24px] font-light underline">
                      2k+ đánh giá
                    </div>
                  </div>
                </div>

                <div className="rotate-180 group-data-[state=open]:rotate-0 duration-200">
                  <Icon name="arrow-up" size={24} />
                </div>
              </div>
            </Accordion.Trigger>
          </Accordion.Header>

          <Accordion.Content className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden">
            <div className="flex flex-col pt-3 gap-y-3">
              <Image
                src={
                  'https://s3-alpha-sig.figma.com/img/759c/4dd4/3fd8a3b12185fcb2933888b8fade83c5?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=htkDNiFQRr9yzvGAlB1PlVwf9t5ULBnZPWSWIEY9XJfpoLgT4rqrMxX5Aieq0K4pgnTav8x6dF1RAUiJc4Eoa5ES43U4X8ZdPqW~5rXLvceeyHRoSKzyb5Yje~77lU8HB-TDMuDnYbJpOpv3BKrBq1PZlNIZcRtERkCgZ60y7KL53l43x4vSIngg4lUzu9XfQu2VU3qv-cxHnHgHSfAiitOm3ydKe~YZc4KWnfm9o1j7XC~ZRohHbK3KH9qWmRXrP-51RpRBQ~KDUezlee7GNh2h32L6RbjSLPurkm9xIo5VUCYZQCxH4dwjYc0hKCCUaVZzMmmfA-dU9u4XVZ8gcQ__'
                }
                className="w-full [&_>_img]:!object-cover aspect-[16/9] rounded-[16px]"
              />

              <div className="flex flex-col md:flex-row items-start md:items-center gap-y-1 gap-x-9">
                <div className="gap-x-[6px] flex items-center">
                  <Icon name="museum" size={20} color="#9A9A9A" />

                  <div className="text-gray_500 text-[14px] leading-[24px] font-light">
                    Di tích lịch sử • Check-in
                  </div>
                </div>

                <div className="gap-x-[6px] flex items-center">
                  <Icon name="clock" size={20} />

                  <div className="text-gray_500 text-[14px] leading-[24px] font-light">
                    Mở cửa 7h - 21h • Trải nghiệm 1h
                  </div>
                </div>
              </div>

              <TruncatedText className="text-black whitespace-pre-line font-light text-[15px] leading-[24px] md:text-[16px] md:leading-[28px]">
                Hoàng thành Thăng Long là quần thể công trình kiến trúc đồ sộ được các triều vua xây
                dựng trong nhiều giai đoạn lịch sử và trở thành di tích quan trọng bậc nhất trong hệ
                thống các di tích Việt Nam. Hoàng thành Thăng Long là quần thể công trình kiến trúc
                đồ sộ được các triều vua xây dựng trong nhiều giai đoạn lịch sử và trở thành di tích
                quan trọng bậc nhất trong hệ thống các di tích Việt Nam
              </TruncatedText>

              <div className="text-black font-medium text-[15px] md:text-[16px] leading-[24px]">
                {'Chi phí: '}
                <span className="text-p_700">20.000 đ - 100.000 đ</span>
              </div>
            </div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  </div>
);

export default DayItem;
