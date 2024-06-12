import { Image } from '@/components/ui';
import { cn } from '@/lib';

interface TimelineColumnProps {
  steps: {
    title: string;
    description: string;
    image: string;
  }[];
  className?: string;
  showImage?: boolean;
  indexFocusing?: number;
  onChangeIndex?: (v: number) => void;
}

const Timeline = ({
  steps,
  className,
  showImage = true,
  indexFocusing,
  onChangeIndex,
}: TimelineColumnProps) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-y-7 items-start max-h-[400px] overflow-y-auto overflow-x-hidden',
        className,
      )}
    >
      {steps.map((step, index) => {
        const isFocusing = index === indexFocusing;

        return (
          <div
            className="relative flex items-start gap-4 w-full cursor-pointer"
            title={step.title}
            key={index}
            role="button"
            onClick={() => onChangeIndex?.(index)}
          >
            <div className="flex-col h-full hidden md:flex">
              <div className="relative -top-[4px] -left-[4px] z-10 p-[4px] bg-white rounded-full">
                <div
                  className={cn(
                    'flex items-center justify-center w-[30px] h-[30px] bg-gray_200 text-[16px] font-normal rounded-full',
                    isFocusing && 'bg-p_300',
                  )}
                >
                  {index + 1}
                </div>
              </div>
              {index !== steps.length - 1 && (
                <div className="absolute w-[1px] h-full top-[15px] left-[14px] bg-gray_300"></div>
              )}
            </div>

            <div className="flex gap-x-4 flex-1">
              {showImage && (
                <Image
                  src={step.image}
                  className="w-[48px] h-[48px] [&_>_img]:!object-cover rounded-[8px]"
                />
              )}
              <div className="flex flex-1 flex-col items-start">
                <h4
                  className={cn(
                    'text-[16px] leading-[24px] font-normal line-clamp-1',
                    isFocusing && 'text-p_700 font-medium',
                  )}
                >
                  {step.title}
                </h4>
                <div className="flex flex-wrap  items-center gap-2 text-[14px] text-black/[0.4]">
                  <span
                    className="whitespace-nowrap text-[14px] leading-[24px] font-normal text-gray_500"
                    title={step.description}
                  >
                    {step.description}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;
