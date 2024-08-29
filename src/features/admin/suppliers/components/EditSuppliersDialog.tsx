import {
  ForwardedRef,
  ReactElement,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import {
  SupplierData,
  SupplierDataParams,
  addSupplier,
  deleteOrActiveSupplier,
  updateSupplier,
} from '@/api/admin';
import { useAppContext } from '@/app/provider';
import { ButtonClose } from '@/components/buttons';
import { ToastAction } from '@/components/ui';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks';
import { logger, parseErrorMessage } from '@/lib';
import { validateIsNumber } from '@/lib/validate';

import { useSuppliers } from '../../hooks';
import SuppliersForm, { OnSubmitSupplierForm } from './SuppliersForm';
import SupplierPrompt from './SupplierPrompt';

type EditSuppliersDialogProps = {
  open?: boolean;
  onOpenChange?: (status: boolean) => void;
  children?: ReactElement;
  type: 'update' | 'create';
};

type DialogOpen = {
  data?: TypeProfile;
  mode?: 'prompt' | 'form';
};

const EditSuppliersDialog = forwardRef(
  (
    { children, onOpenChange, open, type }: EditSuppliersDialogProps,
    ref: ForwardedRef<DialogRefs<DialogOpen>>,
  ) => {
    const { toast } = useToast();
    const [{ resource }] = useAppContext();
    const [, { mutate }] = useSuppliers();

    const hasChangedStatus = useRef(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [data, setData] = useState<TypeProfile>();
    const [jsonPrompt, setJsonPrompt] = useState<SupplierData>();
    const [mode, setMode] = useState<DialogOpen['mode']>('form');

    useImperativeHandle(
      ref,
      () => ({
        open: v => {
          setData(v?.data);
          setMode(v?.mode ?? 'form');
          setJsonPrompt(undefined);
          setDialogOpen(true);
        },
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
          mutate().catch(logger.log);
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

        const updateFormData: Partial<SupplierDataParams> = Object.assign(formData, {
          lat: undefined,
          lng: undefined,
        });
        if (formData.lat_lng) {
          const [lat, lng] = formData.lat_lng.split(', ').map(v => {
            if (validateIsNumber(v)) {
              return Number(v);
            }
            return undefined;
          });
          if (!lat || !lng) {
            toast({
              description: 'Chưa nhập lat, lng',
              variant: 'destructive',
            });
            return 'error';
          }
          delete formData.lat_lng;
          updateFormData.lat = lat;
          updateFormData.lng = lng;
        }
        if (formData.parent !== undefined) {
          formData.parent = formData.parent || null;
        }

        try {
          await updateSupplier(data.id, updateFormData);
          toast({
            description: 'Chỉnh sửa thành công',
          });
          mutate().catch(logger.log);
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
      if (!formData.lat_lng) {
        toast({
          description: 'Chưa nhập lat lng',
          variant: 'destructive',
        });
        return 'error';
      }

      const [lat, lng] = formData.lat_lng.split(', ').map(v => {
        if (validateIsNumber(v, { isDecimal: true })) {
          return Number(v);
        }
        return undefined;
      });
      if (!lat || !lng) {
        return 'error';
      }

      delete formData.lat_lng;
      const createFormData: SupplierDataParams = Object.assign(formData, { lat, lng });

      try {
        await addSupplier(createFormData);
        toast({
          description: 'Thêm địa điểm thành công',
        });
        mutate().catch(logger.log);

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

    const renderContent = () => {
      if (mode === 'form') {
        if (jsonPrompt) {
          return (
            <SuppliersForm
              defaultValues={{ link: [] }}
              values={{ ...jsonPrompt, account_type: 'location' }}
              onSubmit={onSubmit}
              onDeleteOrActive={onDeleteOrActive}
              titleButton={type === 'create' ? 'Thêm mới' : 'Cập nhật'}
            />
          );
        }

        if (
          !data ||
          data.account_type === 'location' ||
          data.account_type === 'shop' ||
          data.account_type === 'buddy'
        ) {
          return (
            <SuppliersForm
              defaultValues={
                data
                  ? {
                      id: data.id,
                      email: data.email,
                      phone: data.phone,
                      name: data.name,
                      description: data.description,
                      avatar: data.avatar,
                      services: data.services,
                      link: data.link,
                      status: data.status,
                      account_type: data.account_type,
                      parent: data.parent,
                      // Location
                      location: data.location,
                      ward: data.info.ward,
                      gg_map: data.info.gg_map,
                      lat_lng: `${data.info.lat}, ${data.info.lng}`,
                      // Cost
                      min_cost: data.info.min_cost,
                      max_cost: data.info.max_cost,
                      info_cost: data.info.info_cost,
                      currencies: data.info.currencies,
                      // Time
                      duration: data.info.duration,
                      start_time: data.info.start_time,
                      end_time: data.info.end_time,
                      best_hours: data.info.best_hours,
                      best_time: data.info.best_time,
                      // Other info
                      value: data.info.value,
                      tag: data.info.tag,
                      facilities: data.info.facilities,
                      take_away: data.info.take_away,
                      dresses: data.info.dresses,
                      activities: data.info.activities,
                    }
                  : {
                      link: [],
                    }
              }
              onSubmit={onSubmit}
              onDeleteOrActive={onDeleteOrActive}
              titleButton={type === 'create' ? 'Thêm mới' : 'Cập nhật'}
            />
          );
        }

        return null;
      }

      return (
        <SupplierPrompt
          onSubmit={v => {
            setJsonPrompt(v);
            setMode('form');
          }}
        />
      );
    };

    return (
      <Dialog open={open ?? dialogOpen} onOpenChange={toggleDialog}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent
          closeButton={<ButtonClose />}
          className="xl:w-[1305px] xl:h-min xl:max-h-[calc(100vh_-_40px)] xl:!rounded-[20px] !rounded-none xl w-full h-full max-w-full max-h-full bg-background overflow-hidden p-0"
        >
          <DialogHeader className="h-0" />
          {renderContent()}
        </DialogContent>
      </Dialog>
    );
  },
);

export { type EditSuppliersDialogProps };
export default EditSuppliersDialog;
