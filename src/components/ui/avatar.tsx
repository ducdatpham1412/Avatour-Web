import { cn } from '@/lib';

import { Image } from './image';

interface Props {
  src: string;
  size?: number;
  className?: string;
}

const Avatar = ({ src, size = 35, className }: Props) => {
  return (
    <Image
      src={src}
      className={cn('rounded-full', className)}
      defaultSrc="https://vietflag.vn/ckfinder/userfiles/images/tin-tuc/quoc-ky-viet-nam-1.jpg"
      style={{ width: size, height: size }}
    />
  );
};

export default Avatar;
