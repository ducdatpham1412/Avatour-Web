import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { Button } from '@/components/ui';
import { Form } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { USER_STATUS } from '@/configs/constants';
import { useAppContext } from '@/app/provider';
import { SupplierData } from '@/api/admin';

import { editSupplierFields } from '../constants';
import AvatarPreview from './AvatarPreview';
import InputField from './InputField';
import ListField from './ListField';
import SupplierChecklistField from './SupplierChecklistField';

export type OnSubmitSupplierForm = 'create-success' | 'error' | 'update-success';

interface Props {
  defaultValues?: SupplierData;
  onSubmit: (data: SupplierData) => Promise<OnSubmitSupplierForm>;
  onDeleteOrActive?: () => void;
  titleButton: string;
}

const SuppliersForm = ({ defaultValues, onSubmit, onDeleteOrActive, titleButton }: Props) => {
  const [{ resource }] = useAppContext();
  const [submitting, setSubmitting] = useState(false);

  const controller = useForm<SupplierData>({
    defaultValues,
    mode: 'onSubmit',
  });

  const status = useWatch({
    control: controller.control,
    name: 'status',
  });

  if (!resource) {
    return;
  }

  const fields = editSupplierFields(resource.cats);

  const handleSubmit = async (data: SupplierData) => {
    setSubmitting(true);
    try {
      const res = await onSubmit(data);
      if (res === 'create-success') {
        controller.reset();
      } else if (res === 'update-success') {
        controller.reset(controller.getValues());
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      {...controller}
      onSubmit={handleSubmit}
      className="p-6 overflow-y-auto beautiful-scrollbar"
      onlyDirty
    >
      <div className="flex items-stretch gap-10">
        <div className="flex items-start h-full">
          <AvatarPreview defaultValue={defaultValues?.avatar} control={controller.control} />
        </div>
        <div className="flex flex-col flex-grow gap-1">
          <div className="flex gap-5 flex-grow pr-8 items-center">
            <InputField
              {...fields.name}
              className="flex-grow font-medium"
              control={controller.control}
            />
            <InputField {...fields.avatar} className="flex-grow" control={controller.control} />
            {status !== undefined && (
              <Switch
                checked={status === USER_STATUS.active}
                onCheckedChange={v => {
                  controller.setValue('status', v ? USER_STATUS.active : USER_STATUS.notActive);
                  onDeleteOrActive?.();
                }}
              />
            )}
          </div>
          <div className="flex gap-5 flex-grow pr-8">
            <InputField
              {...fields.location}
              //   className="w-[calc(50%_-_1.25em_/_2)]"
              className="w-[65%]"
              control={controller.control}
            />
            <div className="flex flex-grow gap-5">
              <InputField {...fields.lat_lng} className="flex-grow" control={controller.control} />
            </div>
          </div>
          <div className="flex gap-5 flex-grow pr-20">
            <InputField {...fields.duration} className="flex-grow" control={controller.control} />

            <InputField {...fields.min_cost} className="flex-grow" control={controller.control} />
            <InputField {...fields.max_cost} className="flex-grow" control={controller.control} />
            <InputField {...fields.start_time} className="flex-grow" control={controller.control} />
            <InputField {...fields.end_time} className="flex-grow" control={controller.control} />
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <InputField {...fields.email} className="flex-grow" control={controller.control} />
        <InputField {...fields.phone} className="flex-grow" control={controller.control} />
        <InputField {...fields.gg_map} className="flex-grow" control={controller.control} />
        <InputField {...fields.ward} className="grow-0" control={controller.control} />
      </div>

      <div>
        <SupplierChecklistField {...fields.account_type} control={controller.control} />
      </div>

      <div className="flex mt-3">
        <SupplierChecklistField {...fields.services} control={controller.control} multiple />
      </div>

      <div className="flex mt-3">
        <InputField
          {...fields.description}
          className="flex-grow"
          type="textarea"
          control={controller.control}
        />
      </div>

      <div>
        <ListField {...fields.link} className="flex-grow" control={controller.control} />
      </div>

      <div className="flex justify-center mt-10">
        <Button
          type="submit"
          loading={submitting}
          className="w-[330px] h-[40px] rounded-full font-bold"
        >
          {titleButton}
        </Button>
      </div>
    </Form>
  );
};

export default SuppliersForm;
