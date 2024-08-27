'use client';
import {
  ElementRef,
  ForwardedRef,
  createRef,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import { Dialog, DialogContent } from '@/components/ui/dialog';

import { ButtonClose } from '../buttons';
import { Button } from '../ui';

type Params = {
  title: string;
  onConfirm: () => void;
  onReject?: () => void;
};
type Ref = ForwardedRef<DialogRefs<Params>>;

const confirmRef = createRef<ElementRef<typeof DialogConfirm>>();

const DialogConfirm = forwardRef((_: any, ref: Ref) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const onConfirm = useRef<() => void>();

  useImperativeHandle(
    ref ?? confirmRef,
    () => ({
      open: v => {
        if (v) {
          setTitle(v.title);
          onConfirm.current = v.onConfirm;
          setOpen(true);
        }
      },
      close: () => {
        setOpen(false);
      },
    }),
    [setTitle],
  );

  return (
    <Dialog open={open}>
      <DialogContent closeButton={<ButtonClose onClick={() => setOpen(false)} />}>
        <div className="w-full inline-flex flex-col gap-8 mt-8 items-center">
          <p className="text-[20px] text-center">{title}</p>
          <div className="w-[90%] inline-flex flex-row gap-2">
            <Button variant="outline" className="flex-1" onClick={() => setOpen(false)}>
              Quay lại
            </Button>
            <Button className="flex-1" onClick={onConfirm.current}>
              Tiếp tục
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
});

export default Object.assign(DialogConfirm, {
  open: (v: Params) => confirmRef.current?.open(v),
  close: () => confirmRef.current?.close(),
});
