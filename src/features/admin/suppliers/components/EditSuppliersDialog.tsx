import { useRouter } from 'next/navigation';
import { ReactElement, useCallback, useMemo, useState } from 'react';

import { updateSupplier } from '@/api';
import { Icon } from '@/components/icon';
import { ToastAction } from '@/components/ui';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks';
import { logger } from '@/lib';

import { editSupplierFields } from '../constants';
import { SupplierData } from '../types';
import EditSuppliersForm from './SuppliersForm';

type EditSuppliersDialogProps = {
  open?: boolean;
  onOpenChange?: (status: boolean) => void;
  children?: ReactElement;
  data?: TypeProfile;
};

const EditSuppliersDialog: React.FC<EditSuppliersDialogProps> = ({
  children,
  onOpenChange,
  open,
  data,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const toast = useToast().toast;
  const router = useRouter();

  const currentOpen = useMemo(() => open ?? dialogOpen, [open, dialogOpen]);

  const toggleDialog = useCallback((status: boolean) => {
    setDialogOpen(status);
    onOpenChange?.(status);
  }, []);

  const closeButton = useMemo(
    () => (
      <div className="p-[10px] bg-white rounded-full border-[1px]">
        <Icon name="close" size={22.6} />
      </div>
    ),
    [],
  );

  const onSubmit = useCallback(async (formData: SupplierData, type: 'update' | 'create') => {
    if (Object.keys(formData).length === 0) {
      toast({
        title: 'Thông báo',
        description: 'Bạn chưa thay đổi gì',
      });
      return;
    }
    if (type === 'update') {
      try {
        if (formData.services && Array.isArray(formData.services)) {
          const serviceOptions = editSupplierFields.services.options?.map(o => o.id) ?? [];
          formData.services = formData.services.filter(service => serviceOptions.includes(service));
        }
        const { error } = await updateSupplier(data!.id, formData);
        if (error) {
          throw error;
        }
        toast({
          title: 'Thông báo',
          description: 'Cập nhật Supplier thành công',
        });
        router.refresh();
      } catch (error) {
        logger.error(error);
        toast({
          title: 'Thông báo',
          description: 'Cập nhật Supplier thất bại',
          variant: 'destructive',
          action: (
            <ToastAction onClick={() => onSubmit(formData, type)} altText="Try again">
              Thử lại
            </ToastAction>
          ),
        });
        router.refresh();
      }
    }
  }, []);

  return (
    <Dialog open={currentOpen} onOpenChange={toggleDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        closeButton={closeButton}
        className="xl:w-[1305px] xl:h-min xl:max-h-[calc(100vh_-_40px)] xl:!rounded-[20px] !rounded-none xl w-full h-full max-w-full max-h-full bg-background overflow-hidden p-0"
      >
        <DialogHeader className="h-0" />
        <EditSuppliersForm defaultValues={data} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export { type EditSuppliersDialogProps };
export default EditSuppliersDialog;
