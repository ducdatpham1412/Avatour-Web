'use client';
import React, {
  ForwardedRef,
  forwardRef,
  PropsWithChildren,
  useImperativeHandle,
  useState,
} from 'react';
import { ClassValue } from 'clsx';

import { cn } from '@/lib';

import { Dialog, DialogContent } from '../ui';
import { ButtonClose } from '../buttons';

type Props = PropsWithChildren & {
  canClose?: boolean;
  className?: ClassValue;
};

const DialogContainer = forwardRef(
  ({ children, canClose = true, className }: Props, ref: ForwardedRef<DialogRefs>) => {
    const [open, setOpen] = useState(false);

    useImperativeHandle(
      ref,
      () => ({
        open: () => {
          setOpen(true);
        },
        close: () => {
          setOpen(false);
        },
      }),
      [setOpen],
    );

    return (
      <Dialog open={open}>
        <DialogContent
          closeButton={canClose ? <ButtonClose onClick={() => setOpen(false)} /> : null}
          className={cn('max-w-full', className)}
        >
          {children}
        </DialogContent>
      </Dialog>
    );
  },
);

export default DialogContainer;
