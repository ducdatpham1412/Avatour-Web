import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CSSProperties } from 'react';

import { NumberStars, TagBuddy } from '@/components';
import { MenuIcon, TrashCanIcon } from '@/components/icon';
import { Image } from '@/components/ui';
import { serviceDataDetail } from '@/features/search/constants';
import { navigateNewTab, twConfigs } from '@/lib';
import { PROFILE_ROUTES } from '@/configs/routes';

interface Props {
  item: TypeProfile;
  imageSize: number;
  containerWidth: string;
  isEditing: boolean;
  onDelete: () => void;
}

const ItemLocationCreateTour = ({
  item,
  imageSize,
  containerWidth,
  isEditing,
  onDelete,
}: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });

  const style: CSSProperties = {
    transition,
    transform: CSS.Transform.toString(transform),
    width: containerWidth,
  };

  const Icon = serviceDataDetail[item.services[0]].icon || serviceDataDetail['other-backpack'].icon;

  return (
    <div
      style={style}
      className="inline-flex flex-row sm:flex-col gap-[14px] sm:gap-[6px]"
      role={isEditing ? undefined : 'button'}
      onClick={() => {
        if (!isEditing) {
          navigateNewTab(PROFILE_ROUTES.profileId(item.id));
        }
      }}
    >
      <div className="relative" style={{ width: imageSize, height: imageSize }}>
        <Image
          src={item.avatar}
          style={{
            width: imageSize,
            height: imageSize,
            borderRadius: '20px',
          }}
        />
        {isEditing && (
          <>
            <div className="absolute top-0 left-0 w-full h-full rounded-[20px] bg-gradient-to-b from-transparent to-black opacity-60" />
            <button
              className="absolute top-[8px] right-[8px] sm:top-[14px] sm:right-[14px] bg-white rounded-full p-[6px] backdrop-blur-[2px] hover:scale-95 duration-300"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.70)' }}
              onClick={onDelete}
            >
              <TrashCanIcon className="w-[16px] h-[16px] sm:w-[24px] sm:h-[24px]" />
            </button>
            <div
              ref={setNodeRef}
              className="absolute w-[30px] h-[30px] inline-flex items-center justify-center hover-scale my-auto left-0 top-0 bottom-0 sm:mx-auto sm:bottom-0 sm:left-0 sm:right-0 sm:top-auto"
              {...attributes}
              {...listeners}
            >
              <MenuIcon color="white" />
            </div>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-center sm:justify-start gap-[6px] sm:gap-[8px]">
        <div className="w-full inline-flex gap-[6px] items-center">
          <p
            className="text-[14px] max-w-[80%] line-clamp-2"
            // role="button"
          >
            {item.name}
          </p>
          <NumberStars stars={5} />
        </div>

        <div className="w-full inline-flex gap-[6px] items-center">
          <Icon color={twConfigs.theme?.colors?.gray_500 as string} size={16} />
          <div className="flex flex-1 items-center overflow-hidden">
            {item.services.map((s, i) => {
              const isLast = i === item.services.length - 1;

              return (
                <p key={s} className="text-gray_500 text-[14px] shrink-0">
                  {serviceDataDetail[s].name || ''}
                  {isLast ? '' : '・'}
                </p>
              );
            })}
          </div>
        </div>

        {item.account_type === 'buddy' && <TagBuddy className="self-start px-[20px]" />}
      </div>
    </div>
  );
};

export default ItemLocationCreateTour;
