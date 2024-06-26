import { cn } from '@/lib';

interface Props {
  title: string;
  className?: string;
}

const TitleHeader = ({ title, className }: Props) => {
  return <p className={cn('text-[16px] sm:text-[24px]', className)}>{title}</p>;
};

export default TitleHeader;
