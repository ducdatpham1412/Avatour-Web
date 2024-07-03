'use client';

import { ElementRef, ForwardedRef, forwardRef, useImperativeHandle, useRef, useState } from 'react';

import { formatDuration } from '@/lib/format';
import { useWindowSize } from '@/hooks';
import { Dialog, DialogContent } from '@/components/ui';
import { ButtonClose } from '@/components/buttons';

import { TourQuickDetail, TourQuickDetailFocusing } from '../../components';
import { serviceDataDetail } from '../../constants';
import { ItemTour } from '../components';

type SearchResultProps = {
  data: TypeTour[];
};

type DialogPreviewProps = {
  preview: TypeTour | undefined;
};

const DialogPreview = forwardRef(
  ({ preview }: DialogPreviewProps, ref: ForwardedRef<DialogRefs>) => {
    const [open, setOpen] = useState(false);
    const [focusing, setFocusing] = useState<TourQuickDetailFocusing>();

    useImperativeHandle(
      ref,
      () => ({
        open: () => setOpen(true),
        close: () => setOpen(false),
      }),
      [setOpen],
    );

    return (
      <Dialog open={open}>
        <DialogContent
          className="max-w-[unset] !w-[min-content] !p-0 !border-none !bg-transparent !rounded-[20px]"
          closeButton={<ButtonClose onClick={() => setOpen(false)} />}
        >
          <TourQuickDetail
            tour={preview}
            formatDescription={loc =>
              `${serviceDataDetail[loc.services[0]].name || loc.services[0]}・${formatDuration(
                loc.info?.duration ?? 0,
              )}`
            }
            focusing={focusing}
            onChangeFocusing={v => setFocusing(v)}
            className="w-[90vw] md:w-[80vw]"
          />
        </DialogContent>
      </Dialog>
    );
  },
);

const SearchResult = ({ data }: SearchResultProps) => {
  const { width } = useWindowSize();

  const previewRef = useRef<ElementRef<typeof DialogPreview>>(null);

  const [index, setIndex] = useState<number>();
  const [focusing, setFocusing] = useState<TourQuickDetailFocusing>();
  const [preview, setPreview] = useState<TypeTour>();

  return (
    <div className="flex flex-col gap-y-2">
      <span className="text-[14px] sm:text-[16px] leading-[24px] text-black">
        {data.length} kết quả
      </span>

      <div className="relative flex items-start gap-x-8">
        <div className="flex-grow flex flex-col gap-y-6 lg:gap-y-2 pb-[100px]">
          {data.map((location, idx) => (
            <ItemTour
              key={location.id}
              item={location}
              isActive={index === idx}
              onHover={() => {
                setFocusing(undefined);
                setIndex(idx);
              }}
              onPreview={() => {
                setPreview(location);
                previewRef.current?.open();
              }}
            />
          ))}
        </div>
        <div className="hidden lg:contents">
          <TourQuickDetail
            tour={index !== undefined ? data[index] : undefined}
            formatDescription={loc =>
              `${serviceDataDetail[loc.services[0]].name || loc.services[0]}・${formatDuration(
                loc.info?.duration ?? 0,
              )}`
            }
            focusing={focusing}
            onChangeFocusing={v => setFocusing(v)}
            className={`w-[30vw] lg:w-[25vw]`}
            style={{ minWidth: width * 0.25 }}
          />
        </div>
      </div>

      {/* <button className="self-center text-[16px] leading-[24px] font-medium text-black p-[12px_24px] rounded-full bg-p_600 mt-12 w-[160px] md:w-[180px]">
        Xem thêm
      </button> */}

      <DialogPreview ref={previewRef} preview={preview} />
    </div>
  );
};

export default SearchResult;
