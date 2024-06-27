'use client';
import {
  ElementRef,
  ForwardedRef,
  createRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';

import { Dialog, DialogContent } from '@/components/ui/dialog';

import { ButtonClose } from '../buttons';
import SignIn from './SignIn';
import SignUp from './SignUp';

type Mode = 'sign-in' | 'sign-up';
type Params = {
  mode: Mode;
  canClose?: boolean;
};
type Ref = ForwardedRef<DialogRefs<Params>>;

const authRef = createRef<ElementRef<typeof DialogAuth>>();

const DialogAuth = forwardRef((_: any, ref: Ref) => {
  const [mode, setMode] = useState<Mode>('sign-in');
  const [open, setOpen] = useState(false);
  const [canClose, setCanClose] = useState(true);

  useImperativeHandle(
    ref ?? authRef,
    () => ({
      open: v => {
        if (v) {
          setMode(v.mode);
          setOpen(true);
          if (v.canClose === false) {
            setCanClose(false);
          } else {
            setCanClose(true);
          }
        }
      },
      close: () => {
        setOpen(false);
      },
    }),
    [mode],
  );

  const renderContent = () => {
    if (mode === 'sign-in') {
      return (
        <SignIn onChangeMode={() => setMode('sign-up')} onLoginSuccess={() => setOpen(false)} />
      );
    }
    return <SignUp onChangeMode={() => setMode('sign-in')} onSuccess={() => setOpen(false)} />;
  };

  return (
    <Dialog open={open}>
      <DialogContent closeButton={canClose ? <ButtonClose onClick={() => setOpen(false)} /> : null}>
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
});

export default Object.assign(DialogAuth, {
  open: (v: Params) => authRef.current?.open(v),
  close: () => authRef.current?.close(),
});
