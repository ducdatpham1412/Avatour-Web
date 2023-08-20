import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('bg-gray_200', className)} {...props}>
      <div className="w-full h-full relative isolate space-y-5 overflow-hidden bg-white/5 p-4 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray_400/20 before:to-transparent"></div>
    </div>
  );
}

export { Skeleton };
