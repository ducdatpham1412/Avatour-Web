import { StarIcon } from './icon';

interface Props {
  stars: number;
}

const NumberStars = ({ stars }: Props) => {
  return (
    <div className="inline-flex gap-[2px] items-center">
      <StarIcon size={20} />
      <p className="text-[12px] sm:text-[14px]">{stars}</p>
    </div>
  );
};

export default NumberStars;
