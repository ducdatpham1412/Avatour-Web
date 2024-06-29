import {
  ForwardedRef,
  ReactElement,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import { addSupplier, deleteOrActiveSupplier, updateSupplier } from '@/api/admin';
import { useAppContext } from '@/app/provider';
import { ButtonClose } from '@/components/buttons';
import { ToastAction } from '@/components/ui';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks';
import { logger, parseErrorMessage } from '@/lib';

import { useSuppliers } from '../../hooks';
import { SupplierData } from '../types';
import SuppliersForm, { OnSubmitSupplierForm } from './SuppliersForm';

type EditSuppliersDialogProps = {
  open?: boolean;
  onOpenChange?: (status: boolean) => void;
  children?: ReactElement;
  data?: TypeProfile;
  type: 'update' | 'create';
};

const EditSuppliersDialog = forwardRef(
  (
    { children, onOpenChange, open, data, type }: EditSuppliersDialogProps,
    ref: ForwardedRef<DialogRefs>,
  ) => {
    const { toast } = useToast();
    const [{ resource }] = useAppContext();
    const [, { mutate }] = useSuppliers();

    const hasChangedStatus = useRef(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    useImperativeHandle(
      ref,
      () => ({
        open: () => setDialogOpen(true),
        close: () => setDialogOpen(false),
      }),
      [setDialogOpen],
    );

    const toggleDialog = (status: boolean) => {
      setDialogOpen(status);
      onOpenChange?.(status);

      if (status) {
        hasChangedStatus.current = false;
      } else {
        if (hasChangedStatus.current) {
          mutate().catch(console.log);
        }
      }
    };

    const onDeleteOrActive = async () => {
      if (data) {
        try {
          await deleteOrActiveSupplier(data.id);
          hasChangedStatus.current = true;
        } catch (err) {
          toast({
            description: parseErrorMessage(err),
            variant: 'destructive',
          });
        }
      }
    };

    const onSubmit = async (formData: SupplierData): Promise<OnSubmitSupplierForm> => {
      if (!resource) {
        return 'error';
      }

      if (Object.keys(formData).length === 0) {
        toast({
          description: type === 'update' ? 'Bạn chưa thay đổi gì' : 'Bạn chưa nhập gì',
        });
        return 'error';
      }

      if (formData.services && Array.isArray(formData.services)) {
        formData.services = formData.services.filter(s => resource.cats.includes(s));

        if (!formData.services.length) {
          toast({
            description: 'Chưa chọn loại hình',
            variant: 'destructive',
          });
          return 'error';
        }
      }

      if (type === 'update') {
        if (!data) {
          return 'error';
        }

        try {
          await updateSupplier(data.id, formData);
          toast({
            description: 'Chỉnh sửa thành công',
          });
          mutate().catch(console.log);
          return 'update-success';
        } catch (err) {
          logger.error(err);
          toast({
            description: parseErrorMessage(err),
            variant: 'destructive',
            action: (
              <ToastAction onClick={() => onSubmit(formData)} altText="Try again">
                Thử lại
              </ToastAction>
            ),
          });
        }

        return 'error';
      }

      /**
       * Create new supplier
       */
      try {
        await addSupplier(formData);
        toast({
          description: 'Thêm địa điểm thành công',
        });
        mutate().catch(console.log);

        return 'create-success';
      } catch (err) {
        toast({
          description: parseErrorMessage(err),
          variant: 'destructive',
          action: (
            <ToastAction onClick={() => onSubmit(formData)} altText="Try again">
              Thử lại
            </ToastAction>
          ),
        });
      }

      return 'error';
    };

    return (
      <Dialog open={open ?? dialogOpen} onOpenChange={toggleDialog}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent
          closeButton={<ButtonClose />}
          className="xl:w-[1305px] xl:h-min xl:max-h-[calc(100vh_-_40px)] xl:!rounded-[20px] !rounded-none xl w-full h-full max-w-full max-h-full bg-background overflow-hidden p-0"
        >
          <DialogHeader className="h-0" />
          <SuppliersForm
            defaultValues={
              data ?? {
                link: [],
              }
            }
            onSubmit={onSubmit}
            onDeleteOrActive={onDeleteOrActive}
            titleButton={type === 'create' ? 'Thêm mới' : 'Cập nhật'}
          />
        </DialogContent>
      </Dialog>
    );
  },
);

export { type EditSuppliersDialogProps };
export default EditSuppliersDialog;
