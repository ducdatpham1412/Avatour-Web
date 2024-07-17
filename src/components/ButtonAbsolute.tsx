import { ReactElement } from 'react';

import { twConfigs } from '@/lib/utils';

import { HeartFillIcon, HeartIcon } from './icon';

interface Props {
  isLiked?: boolean;
  onClick?: () => void;
  icon?: ReactElement;
}

const ButtonAbsolute = ({ isLiked, onClick, icon }: Props) => {
  return (
    <button
      className="absolute top-[8px] right-[8px] sm:top-[14px] sm:right-[14px] bg-white rounded-full p-[6px] backdrop-blur-[2px] hover:scale-105 duration-300"
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.70)' }}
      onClick={e => {
        e.stopPropagation();
        onClick?.();
      }}
    >
      {icon ??
        (isLiked ? (
          <HeartFillIcon color={twConfigs.theme?.colors?.red as string} />
        ) : (
          <HeartIcon />
        ))}
    </button>
  );
};

export default ButtonAbsolute;
