import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { Button } from '@/components/ui';
import { Form } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { USER_STATUS } from '@/configs/constants';

import { editSupplierFields } from '../constants';
import { SupplierData } from '../types';
import AvatarPreview from './AvatarPreview';
import InputField from './InputField';
import ListField from './ListField';
import SupplierChecklistField from './SupplierChecklistField';

export type OnSubmitSupplierForm = 'create-success' | 'error' | 'update-success';

interface EditSuppliersFormProps {
  defaultValues?: SupplierData;
  onSubmit: (data: SupplierData) => Promise<OnSubmitSupplierForm>;
  onDeleteOrActive?: () => void;
  titleButton: string;
}

const EditSuppliersForm = ({
  defaultValues,
  onSubmit,
  onDeleteOrActive,
  titleButton,
}: EditSuppliersFormProps) => {
  const [submitting, setSubmitting] = useState(false);

  const controller = useForm<SupplierData>({
    defaultValues,
    mode: 'onSubmit',
  });

  const status = useWatch({
    control: controller.control,
    name: 'status',
  });

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
      className="p-6 overflow-y-auto beautìul-scrollbar"
      onlyDirty
    >
      <div className="flex items-stretch gap-10">
        <div className="flex items-start h-full">
          <AvatarPreview defaultValue={defaultValues?.avatar} control={controller.control} />
        </div>
        <div className="flex flex-col flex-grow gap-1">
          <div className="flex gap-5 flex-grow pr-8 items-center">
            <InputField
              {...editSupplierFields.avatar}
              className="flex-grow"
              control={controller.control}
            />
            <InputField
              {...editSupplierFields.location}
              className="flex-grow"
              control={controller.control}
            />
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
              {...editSupplierFields.name}
              className="w-[calc(50%_-_1.25em_/_2)]"
              control={controller.control}
            />
            <div className="flex flex-grow gap-5">
              <InputField
                {...editSupplierFields.lat}
                className="flex-grow"
                control={controller.control}
              />
              <InputField
                {...editSupplierFields.lng}
                className="flex-grow"
                control={controller.control}
              />
            </div>
          </div>
          <div className="flex gap-5 flex-grow pr-20">
            <InputField
              {...editSupplierFields.duration}
              className="flex-grow"
              control={controller.control}
            />

            <InputField
              {...editSupplierFields.min_cost}
              className="flex-grow"
              control={controller.control}
            />
            <InputField
              {...editSupplierFields.max_cost}
              className="flex-grow"
              control={controller.control}
            />
            <InputField
              {...editSupplierFields.start_time}
              className="flex-grow"
              control={controller.control}
            />
            <InputField
              {...editSupplierFields.end_time}
              className="flex-grow"
              control={controller.control}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <InputField
          {...editSupplierFields.email}
          className="flex-grow"
          control={controller.control}
        />
        <InputField
          {...editSupplierFields.phone}
          className="flex-grow"
          control={controller.control}
        />
        <InputField
          {...editSupplierFields.gg_map}
          className="flex-grow"
          control={controller.control}
        />
        <InputField {...editSupplierFields.ward} className="grow-0" control={controller.control} />
      </div>

      <div>
        <SupplierChecklistField {...editSupplierFields.account_type} control={controller.control} />
      </div>

      <div className="flex mt-3">
        <SupplierChecklistField
          {...editSupplierFields.services}
          control={controller.control}
          multiple
        />
      </div>

      <div className="flex mt-3">
        <InputField
          {...editSupplierFields.description}
          className="flex-grow"
          type="textarea"
          control={controller.control}
        />
      </div>

      <div>
        <ListField
          {...editSupplierFields.link}
          className="flex-grow"
          control={controller.control}
        />
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

export default EditSuppliersForm;
