'use client';
import { ForwardedRef, forwardRef, useImperativeHandle, useState } from 'react';

import { Dialog, DialogContent } from '@/components/ui/dialog';

import { ButtonClose } from '../buttons';
import SignIn from './SignIn';
import SignUp from './SignUp';

type Mode = 'sign-in' | 'sign-up';

type Ref = ForwardedRef<DialogRefs<{ mode: Mode }>>;

const DialogAuth = forwardRef((_: any, ref: Ref) => {
  const [mode, setMode] = useState<Mode>('sign-in');
  const [open, setOpen] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      open: v => {
        setMode(v.mode);
        setOpen(true);
      },
      close: () => null,
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
      <DialogContent closeButton={<ButtonClose onClick={() => setOpen(false)} />}>
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
});

export default DialogAuth;
