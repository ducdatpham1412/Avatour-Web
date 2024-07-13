import { Image } from '@/components/ui';
import { cn } from '@/lib';

interface Props extends PropsWithClassName {
  img: string;
  name: string;
  des: string;
  size?: number;
  onClick?: () => void;
}

const LocationTag = ({ img, name, des, className, size = 48, onClick }: Props) => {
  return (
    <button
      className={cn(
        'rounded-[12px] border-[1px] border-gray_300 p-[12px] inline-flex gap-[16px]',
        className,
      )}
      onClick={onClick}
    >
      <Image src={img} style={{ width: size, height: size }} className="rounded-[10px]" />
      <div className="flex flex-1 flex-col items-start">
        <p>{name}</p>
        <p className="text-gray_500">{des}</p>
      </div>
    </button>
  );
};

export default LocationTag;
