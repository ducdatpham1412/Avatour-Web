import { useRouter } from 'next/navigation';
import { ReactElement, useCallback, useState } from 'react';

import { addSupplier, updateSupplier } from '@/api/admin';
import { Icon } from '@/components/icon';
import { ToastAction } from '@/components/ui';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks';
import { logger, parseErrorMessage } from '@/lib';

import { editSupplierFields } from '../constants';
import { SupplierData } from '../types';
import EditSuppliersForm, { OnSubmitSupplierForm } from './SuppliersForm';

type EditSuppliersDialogProps = {
  open?: boolean;
  onOpenChange?: (status: boolean) => void;
  children?: ReactElement;
  data?: TypeProfile;
  type: 'update' | 'create';
};

const CloseButton = (
  <div className="p-[10px] bg-white rounded-full border-[1px]">
    <Icon name="close" size={22.6} />
  </div>
);

const EditSuppliersDialog = ({
  children,
  onOpenChange,
  open,
  data,
  type,
}: EditSuppliersDialogProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);

  const toggleDialog = useCallback((status: boolean) => {
    setDialogOpen(status);
    onOpenChange?.(status);
  }, []);

  const onSubmit = async (formData: SupplierData): Promise<OnSubmitSupplierForm> => {
    if (Object.keys(formData).length === 0) {
      toast({
        description: type === 'update' ? 'Bạn chưa thay đổi gì' : 'Bạn chưa nhập gì',
      });
      return 'error';
    }

    if (formData.services && Array.isArray(formData.services)) {
      const services = editSupplierFields.services.options?.map(o => o.id) ?? [];
      formData.services = formData.services.filter(s => services.includes(s));

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
        router.refresh();

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
    }

    /**
     * Create new supplier
     */
    try {
      await addSupplier(formData);
      toast({
        description: 'Thêm địa điểm thành công',
      });
      router.refresh();

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
        closeButton={CloseButton}
        className="xl:w-[1305px] xl:h-min xl:max-h-[calc(100vh_-_40px)] xl:!rounded-[20px] !rounded-none xl w-full h-full max-w-full max-h-full bg-background overflow-hidden p-0"
      >
        <DialogHeader className="h-0" />
        <EditSuppliersForm
          defaultValues={
            data ?? {
              link: [],
            }
          }
          onSubmit={onSubmit}
          titleButton={type === 'create' ? 'Thêm mới' : 'Cập nhật'}
        />
      </DialogContent>
    </Dialog>
  );
};

export { type EditSuppliersDialogProps };
export default EditSuppliersDialog;
