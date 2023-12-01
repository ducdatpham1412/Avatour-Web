import { FunctionComponent, ReactElement, useState } from 'react';

import { REQUEST_STATUS } from '@/configs/constants';
import { useToast } from '@/hooks';
import { confirmRequest } from '@/api/admin/requests';
import { ToastAction } from '@/components/ui';

export type WrappedRequestModalProps<T extends keyof TypeAuthRequest> = {
  data: TypeGetRequestResponse & { type: TypeAuthRequest[T] };
  children: ReactElement;
  open: boolean;
  active: boolean;
  openOpenChange: (e: boolean) => void;
  submiting: boolean;
  onConfirm: () => Promise<void>;
};

const withRequest = <T extends keyof TypeAuthRequest>(
  Component: (props: WrappedRequestModalProps<T>) => JSX.Element,
) =>
  function ({
    data,
    children,
    onUpdate,
  }: Pick<WrappedRequestModalProps<T>, 'data' | 'children'> & { onUpdate: () => Promise<void> }) {
    const [open, setOpen] = useState(false);
    const toast = useToast().toast;
    const [submiting, setSubmiting] = useState(false);
    const canActive = data.status === REQUEST_STATUS.active;

    async function onConfirm() {
      setSubmiting(true);
      try {
        const { error } = await confirmRequest(data.id);
        console.log('error', error);

        if (!error) {
          await onUpdate();
          toast({
            title: 'Thông báo',
            description: 'Xác nhận request thành công',
          });
        } else {
          toast({
            title: 'Xác nhận request thất bại',
            description: error.message,
            variant: 'destructive',
            action: (
              <ToastAction onClick={() => onConfirm()} altText="Try again">
                Thử lại
              </ToastAction>
            ),
          });
        }
      } catch (error) {
        //error
      }
      setSubmiting(false);
    }

    function onOpenChange(e: boolean) {
      setOpen(e);
    }

    return (
      <Component
        active={canActive}
        data={data}
        open={open}
        openOpenChange={onOpenChange}
        submiting={submiting}
        onConfirm={onConfirm}
      >
        {children}
      </Component>
    );
  };

export default withRequest;
