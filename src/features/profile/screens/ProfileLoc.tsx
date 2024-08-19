import { ClassValue } from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, ReactElement } from 'react';

import {
  BookUserIcon,
  ClockIcon,
  DiamondIcon,
  LocationIcon,
  LuckyGrassIcon,
  RewardIcon,
} from '@/components/icon';
import { Button, Image } from '@/components/ui';
import { ORDER_ROUTES, PROFILE_ROUTES } from '@/configs/routes';
import { serviceDataDetail } from '@/features/search/constants';
import { NameStars } from '@/features/tour/components';
import { checkOpenTime, cn, convertDecimalToTime, navigateNewTab, twConfigs } from '@/lib';
import { formatPrice, formatTourPrice } from '@/lib/format';

import { LocationTag } from '../components';
import { useProfile } from '../hooks';
import ChildrenLocs from './ChildrenLocs';
import NearLocs from './NearLocs';
import ToursHaveProfile from './ToursHaveProfile';

interface Props {
  userId: number;
}

interface InfoBlockProps {
  iconSize?: number;
  desc: string;
  moreDesc?: string;
  descClassName?: ClassValue;
  className?: ClassValue;
  circleColor?: string;
  flowerColor?: string;
}

interface TitleProps {
  title: string;
}

type BlockCardProps = {
  title: string;
  data: string[];
  renderItem: (v: string) => ReactElement;
  BottomElement?: ReactElement;
  className?: ClassValue;
};

const InfoBlock = ({
  iconSize = 36,
  desc,
  descClassName,
  moreDesc,
  className,
  circleColor = twConfigs.theme?.colors?.p_600 as string,
  flowerColor,
}: InfoBlockProps) => {
  return (
    <div className={cn('w-full p-[16px] border-[1px] border-gray_300 rounded-[12px]', className)}>
      <div className="inline-flex gap-[20px] items-center">
        <div
          className="relative rounded-full shrink-0"
          style={{ width: iconSize, height: iconSize, backgroundColor: circleColor }}
        >
          <LuckyGrassIcon
            className="absolute right-[-7px] top-[5px]"
            size={(31 / 36) * iconSize}
            color={flowerColor}
          />
        </div>
        <p className={cn(descClassName)}>{desc}</p>
      </div>
      {!!moreDesc && <p className="mt-2">{moreDesc}</p>}
    </div>
  );
};

const Card = ({ children, className }: PropsWithChildren & PropsWithClassName) => {
  return <div className={cn('inline-flex items-center w-full', className)}>{children}</div>;
};

const Title = ({ title }: TitleProps) => {
  return <p className="text-[18px] font-medium">{title}</p>;
};

const Line = () => {
  return <div className="w-full h-[1px] bg-gray_200" />;
};

const Block = ({ children }: PropsWithChildren) => {
  return <div className="w-full inline-flex flex-col gap-[16px]">{children}</div>;
};

const BlockCard = ({ title, data, renderItem, BottomElement, className }: BlockCardProps) => {
  return (
    <Block>
      <Title title={title} />
      <div className={cn('w-full inline-flex flex-col', className)}>{data.map(renderItem)}</div>
      {BottomElement}
    </Block>
  );
};

const ParentTag = ({ userId }: Props) => {
  const [{ data }] = useProfile(userId);

  if (!data?.info) {
    return null;
  }

  return (
    <div className="w-full">
      <p className="text-[16px] font-medium">Địa điểm này nằm trong:</p>
      <LocationTag
        img={data.link[0]?.img ?? data.avatar}
        name={data.name}
        des={data.services
          .slice(0, 2)
          .map(s => serviceDataDetail[s].name)
          .join(', ')}
        className="w-full mt-[12px] hover-scale"
        onClick={() => navigateNewTab(PROFILE_ROUTES.profileId(userId))}
      />
    </div>
  );
};

const ProfileLoc = ({ userId }: Props) => {
  const router = useRouter();
  const [{ data }] = useProfile(userId);

  if (
    !data ||
    (data.account_type !== 'location' &&
      data.account_type !== 'shop' &&
      data.account_type !== 'buddy')
  ) {
    return null;
  }

  const isOpen =
    checkOpenTime({ startTime: data.info.start_time, endTime: data.info.end_time }) === 'open';
  const isBuddy = data.account_type === 'buddy';

  const renderContentTag = () => {
    return (
      <>
        {!!data.parent && <ParentTag userId={data.parent} />}

        {!!data.info.tag && (
          <div className="w-full rounded-[12px] p-[16px] bg-p_50 border-p_600 border-[1px] inline-flex items-center">
            <RewardIcon />
            <p className="text-p_800 font-medium ml-[8px]">{data.info.tag}</p>
          </div>
        )}

        {!!data.info.value && (
          <div className="w-full inline-flex flex-col gap-[12px]">
            <div className="inline-flex items-center">
              <div className="p-[4px] bg-blue rounded-full">
                <DiamondIcon />
              </div>
              <p className="text-blue font-medium ml-[8px]">Giá trị nhận được từ chuyến đi</p>
            </div>

            <InfoBlock desc={data.info.value} />
          </div>
        )}
      </>
    );
  };

  return (
    <main className="w-full pb-[100px] inline-flex flex-col gap-[20px] md:gap-[48px]">
      <NameStars
        name={data.name}
        stars={5}
        ratings={0}
        className="mt-[24px]"
        nameClassName="text-[18px] md:text-[30px]"
      />

      <div className="w-full inline-flex gap-x-[16px] px-[2px] h-[40vw]">
        <Image
          src={data.link[0]?.img ?? data.avatar}
          className="w-[70%] rounded-[16px] hover-slow"
        />
        <div className="flex flex-1 flex-col gap-y-[16px]">
          <Image
            src={data.link[1]?.img ?? data.avatar}
            className="w-full rounded-[16px] hover-slow"
          />
          <Image
            src={data.link[2]?.img ?? data.avatar}
            className="w-full rounded-[16px] hover-slow"
          />
          <Image
            src={data.link[3]?.img ?? data.avatar}
            className="w-full rounded-[16px] hover-slow"
          />
        </div>
      </div>

      <div className="w-full flex-col md:flex-row gap-x-[100px] gap-[48px] md:gap-[48px] inline-flex">
        <div className="w-full md:hidden inline-flex flex-col gap-y-[20px] mt-[28px]">
          {renderContentTag()}
        </div>

        <div className="w-full md:w-[62%] inline-flex flex-col gap-[24px]">
          <p style={{ fontSize: isBuddy ? 14 : 16 }}>{data.description}</p>

          <Line />

          <BlockCard
            title="Loại hình du lịch"
            data={data.services}
            className="flex-row flex-wrap"
            renderItem={s => {
              const dataService = serviceDataDetail[s as Service];
              return (
                <Card key={s} className="w-[30%] mr-2">
                  <dataService.icon />
                  <p className="ml-[10px]">{dataService.name}</p>
                </Card>
              );
            }}
          />

          <Line />

          <Block>
            <Title title="Thông tin cơ bản" />

            <div className="inline-flex gap-[10px]">
              <LocationIcon color={twConfigs.theme?.colors?.black as string} />
              <div>
                <p>{data.location}</p>
                {!!data.info.gg_map && (
                  <Link
                    className="underline font-medium text-blue"
                    href={data.info.gg_map}
                    target="_blank"
                  >
                    Mở bản đồ
                  </Link>
                )}
              </div>
            </div>

            <div className="inline-flex gap-[10px]">
              <ClockIcon color={twConfigs.theme?.colors?.black as string} />
              <div>
                <p
                  className="font-medium"
                  style={{
                    color: (isOpen
                      ? twConfigs.theme?.colors?.green
                      : twConfigs.theme?.colors?.red) as string,
                  }}
                >
                  {isOpen ? 'Đang mở cửa' : 'Đang đóng cửa'}
                  <span className="font-medium">{` (${convertDecimalToTime(
                    data.info.start_time,
                  )} - ${convertDecimalToTime(data.info.end_time)})`}</span>
                </p>
                <div className="inline-flex items-center">
                  {!!data.info.best_hours && (
                    <>
                      <article className="max-w-[300px]">{data.info.best_hours}</article>
                      <p className="text-[20px] font-extrabold">・</p>
                    </>
                  )}
                  <span>Trải nghiệm: {data.info.duration}h</span>
                </div>
              </div>
            </div>

            <div className="relative inline-flex gap-[16px] flex-col md:flex-row">
              <InfoBlock
                desc={`${
                  isBuddy
                    ? `${formatPrice(data.info.min_cost)} - ${formatPrice(data.info.max_cost)}vnd`
                    : formatTourPrice(data.info.min_cost, data.info.max_cost)
                }`}
                descClassName="font-medium text-p_700"
                moreDesc={data.info.info_cost}
                className="w-auto"
                circleColor={twConfigs.theme?.colors?.blue as string}
                flowerColor={twConfigs.theme?.colors?.p_600 as string}
              />
              {!!data.info.best_time && <InfoBlock desc={data.info.best_time} className="w-auto" />}
            </div>
          </Block>

          {isBuddy && (
            <Button
              className="w-full md:w-[70%] inline-flex gap-2"
              onClick={() => router.push(ORDER_ROUTES.buddy(data.id))}
            >
              <BookUserIcon size={20} />
              <p className="font-medium">Đặt lịch ngay</p>
            </Button>
          )}

          <Line />

          <BlockCard
            title="Hoạt động tại địa điểm"
            data={data.info.activities}
            renderItem={at => {
              return (
                <Card key={at}>
                  <span className="text-[40px] leading-none">・</span>
                  <p>{at}</p>
                </Card>
              );
            }}
            BottomElement={<ChildrenLocs userId={userId} />}
          />

          <Line />

          <BlockCard
            title="Cơ sở vật chất"
            data={data.info.facilities}
            renderItem={fa => {
              return (
                <Card key={fa}>
                  <span className="text-[40px] leading-none">・</span>
                  <p>{fa}</p>
                </Card>
              );
            }}
          />

          <Line />

          <BlockCard
            title="Nên mang gì theo"
            data={data.info.take_away}
            renderItem={fa => {
              return (
                <Card key={fa}>
                  <span className="text-[40px] leading-none">・</span>
                  <p>{fa}</p>
                </Card>
              );
            }}
          />

          <Line />

          <BlockCard
            title="Trang phục"
            data={data.info.dresses}
            renderItem={dr => {
              return (
                <Card key={dr}>
                  <span className="text-[40px] leading-none">・</span>
                  <p>{dr}</p>
                </Card>
              );
            }}
          />

          <Line />
        </div>

        <div className="flex-1 flex-col gap-[40px] hidden md:flex">{renderContentTag()}</div>
      </div>

      <div className="w-full">
        <Title title="Các lịch trình bao gồm địa điểm này" />
        <ToursHaveProfile userId={userId} />
      </div>

      <div className="w-full">
        <Title title="Các địa điểm gần đó" />
        <NearLocs userId={userId} />
      </div>
    </main>
  );
};

export default ProfileLoc;
