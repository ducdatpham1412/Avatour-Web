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
      defaultSrc="https://media.istockphoto.com/id/864417828/vector/vietnamese-flag.jpg?s=612x612&w=0&k=20&c=xVk7OhKcyDwQz1oY7hPcXTqxviz9KGW9tJAeDEhmgz8="
      style={{ width: size, height: size }}
    />
  );
};

export default Avatar;
