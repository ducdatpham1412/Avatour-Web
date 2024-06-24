import { Image } from '@/components/ui';
import { cn } from '@/lib';

interface TimelineColumnProps {
  steps: {
    title: string;
    description: string;
    image: string;
  }[];
  showImage?: boolean;
  indexFocusing?: number;
  onChangeIndex?: (v: number) => void;
}

const Timeline = ({
  steps,
  showImage = true,
  indexFocusing,
  onChangeIndex,
}: TimelineColumnProps) => {
  return (
    <div className="w-full inline-flex flex-col gap-y-7 items-start max-h-[400px] overflow-y-auto beautiful-scrollbar">
      {steps.map((step, index) => {
        const isFocusing = index === indexFocusing;

        return (
          <div
            className="relative w-full inline-flex items-start gap-4 cursor-pointer"
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
              <div className="flex flex-1 flex-col items-start flex-shrink-0">
                <h4
                  className={cn(
                    'w-full text-[16px] leading-[24px] font-normal line-clamp-1',
                    isFocusing && 'text-p_700 font-medium',
                  )}
                >
                  {step.title}
                </h4>
                <p className="line-clamp-1 text-gray_500" title={step.description}>
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;
