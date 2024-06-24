'use client';
import {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { SearchInputBase } from '@/features/search/components';
import { useLocations } from '@/hooks';
import { removeVietnameseTones, search, twConfigs } from '@/lib';

import NumberStars from '../NumberStars';
import { ButtonClose } from '../buttons';
import { TourLoadingIcon } from '../icon';
import CheckCircle from '../icon/CheckCircle';
import CloseIcon from '../icon/CloseIcon';
import { Button, Image } from '../ui';

type Refs = ForwardedRef<DialogRefs<ContentProps>>;

interface ContentProps {
  currentLocs: TypeProfile[];
  onSave: (locs: TypeProfile[]) => void;
}

interface ItemLocationProps {
  item: TypeProfile;
  status: 'chosen' | 'not-chosen';
  onClick: () => void;
}

const ItemLocation = ({ item, status, onClick }: ItemLocationProps) => {
  return (
    <div
      className="w-full inline-flex gap-[16px]"
      title={item.name}
      role="button"
      onClick={onClick}
    >
      <Image
        src={item.avatar}
        className="w-[40px] h-[40px] sm:w-[70px] sm:h-[70px] rounded-[8px] self-center"
      />

      <div className="flex flex-1 flex-col justify-center scale-hover">
        <div className="w-full inline-flex items-center gap-[8px]">
          <p className="flex-1 text-[14px] sm:text-[16px] line-clamp-1">{item.name}</p>
          <NumberStars stars={5} />
        </div>
        <p className="line-clamp-1 text-gray_500 text-[12px] sm:text-[14px">{item.location}</p>
      </div>

      <div className="w-[15%] inline-flex items-center justify-end">
        {status === 'chosen' && <CheckCircle size={20} />}
      </div>
    </div>
  );
};

const Content = ({ currentLocs, onSave }: ContentProps) => {
  const [{ data, loading, error }] = useLocations();
  const timeOut = useRef<NodeJS.Timeout>();
  const [displayLocs, setDisplayLocs] = useState<TypeProfile[]>([]);
  const [chosenLocs, setChosenLocs] = useState<TypeProfile[]>(currentLocs);

  const isNull = loading || !data || error;
  const dataSearch = useMemo(() => {
    return data
      ? data.map(loc => removeVietnameseTones(`${loc.name} ${loc.location}`.toLowerCase()))
      : [];
  }, [data]);

  useEffect(() => {
    if (data && !displayLocs.length) {
      setDisplayLocs(data);
    }
  }, [data, setDisplayLocs]);

  const renderContent = () => {
    if (isNull) {
      return <TourLoadingIcon className="w-[200px] h-[200px] mx-auto mt-[10vh]" />;
    }

    return (
      <>
        {displayLocs.map(loc => {
          const isChosen = !!chosenLocs.find(l => l.id === loc.id);
          return (
            <ItemLocation
              item={loc}
              status={isChosen ? 'chosen' : 'not-chosen'}
              key={loc.id}
              onClick={() => {
                if (isChosen) {
                  setChosenLocs(pre => pre.filter(l => l.id !== loc.id));
                } else {
                  setChosenLocs(pre => pre.concat(loc));
                }
              }}
            />
          );
        })}
      </>
    );
  };

  const onSearch = useCallback(
    (text: string) => {
      if (data) {
        if (!text) {
          setDisplayLocs(data);
          return;
        }

        const indices = search(dataSearch, text);
        const temp = data.filter((_, idx) => indices.includes(idx));
        setDisplayLocs(temp);
      }
    },
    [data, setDisplayLocs],
  );

  return (
    <>
      <SearchInputBase
        className="p-[12px] sm:py-[12px] w-[100%]"
        inputClassName="text-[14px] sm:text-[14px]"
        placeholder="Tìm theo tên địa điểm hoặc khu vực"
        onChangeValue={v => {
          clearTimeout(timeOut.current);
          timeOut.current = setTimeout(() => {
            onSearch(v);
          }, 100);
        }}
      />

      {!!chosenLocs.length && (
        <div className="w-full inline-flex flex-wrap gap-[12px] max-h-[10vh] overflow-y-auto beautiful-scrollbar">
          {chosenLocs.map(loc => {
            return (
              <div className="pl-[8px] py-[4px] rounded-full bg-p_100 border-p_300 border-[1px] inline-flex items-center">
                <p>{loc.name}</p>
                <div
                  className="px-[8px]"
                  role="button"
                  onClick={() => setChosenLocs(pre => pre.filter(l => l.id !== loc.id))}
                >
                  <CloseIcon size={10} color={twConfigs.theme?.colors?.gray_500 as string} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="w-full h-[52vh] overflow-y-auto beautiful-scrollbar inline-flex flex-col gap-[20px] px-[4px]">
        {renderContent()}
      </div>

      <Button className="w-[70%] mx-auto" disabled={!!isNull} onClick={() => onSave(chosenLocs)}>
        Lưu
      </Button>
    </>
  );
};

const DialogLocations = forwardRef((_: any, ref: Refs) => {
  const content = useRef<ContentProps>();
  const [open, setOpen] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      open: v => {
        if (v) {
          content.current = v;
          setOpen(true);
        }
      },
      close: () => null,
    }),
    [],
  );

  return (
    <Dialog
      open={open}
      onOpenChange={v => {
        if (!v) {
          content.current = undefined;
        }
      }}
    >
      <DialogContent
        closeButton={<ButtonClose onClick={() => setOpen(false)} />}
        className="w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] max-w-full"
      >
        <p className="text-[20px]">Thêm địa điểm</p>
        <Content
          onSave={locs => {
            content.current?.onSave(locs);
            setOpen(false);
          }}
          currentLocs={content.current?.currentLocs ?? []}
        />
      </DialogContent>
    </Dialog>
  );
});

export default DialogLocations;
