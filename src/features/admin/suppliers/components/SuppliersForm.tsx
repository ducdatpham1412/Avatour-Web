import { useState } from 'react';
import { UseFormReturn, useController, useForm, useWatch } from 'react-hook-form';

import { SupplierData } from '@/api/admin';
import { useAppContext } from '@/app/provider';
import { ListFieldDropDown } from '@/components/fields';
import { Button } from '@/components/ui';
import { Form } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { USER_STATUS } from '@/configs/constants';

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

type DropdownFieldProps = {
  label: string;
  value: keyof SupplierData;
  controller: UseFormReturn<SupplierData>;
  options: string[];
  freeText?: boolean;
};

const DropdownField = ({
  controller,
  value,
  options,
  label,
  freeText = false,
}: DropdownFieldProps) => {
  const {
    field: { onChange },
  } = useController({
    name: value,
    control: controller.control,
  });
  const values = useWatch({
    control: controller.control,
    name: value,
  }) as string[] | null;

  return (
    <ListFieldDropDown
      label={label}
      values={values ? values.map(v => ({ title: v })) : []}
      optionsDropdown={options.map(o => ({ title: o }))}
      onDeleteValue={v => {
        onChange(values ? values.filter(_v => _v !== v) : []);
      }}
      onSelectValue={v => {
        const temp = values ?? [];
        if (!temp.includes(v)) {
          onChange(temp.concat(v));
        }
      }}
      className="w-[10%]"
      freeText={freeText}
    />
  );
};

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
        <div className="flex flex-col h-full">
          <AvatarPreview defaultValue={defaultValues?.avatar} control={controller.control} />
          <h2 className="mt-2">Id: {defaultValues?.id ?? ''}</h2>
        </div>
        <div className="flex flex-col flex-grow gap-1">
          <div className="flex gap-5 flex-grow pr-8 items-center">
            <InputField
              {...fields.name}
              className="flex-grow font-medium"
              control={controller.control}
            />
            <InputField {...fields.avatar} className="flex-grow" control={controller.control} />
            <InputField {...fields.email} className="flex-grow" control={controller.control} />
            <InputField {...fields.phone} className="flex-grow" control={controller.control} />
            <InputField {...fields.parent} className="w-[80px]" control={controller.control} />
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
              className="w-[30%]"
              control={controller.control}
            />
            <InputField {...fields.ward} className="flex-grow" control={controller.control} />
            <InputField {...fields.gg_map} className="w-[30%]" control={controller.control} />
            <InputField {...fields.lat_lng} className="flex-grow" control={controller.control} />
          </div>
          <div className="flex gap-5">
            <InputField {...fields.min_cost} className="w-[150px]" control={controller.control} />
            <InputField {...fields.max_cost} className="w-[150px]" control={controller.control} />
            <InputField {...fields.info_cost} className="flex-grow" control={controller.control} />
            <DropdownField
              label={fields.currencies.label ?? ''}
              value="currencies"
              controller={controller}
              options={['vnd', 'usd', 'bang', 'nnt', 'rub']}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <InputField {...fields.duration} className="w-[100px]" control={controller.control} />
        <InputField {...fields.start_time} className="w-[100px]" control={controller.control} />
        <InputField {...fields.end_time} className="w-[100px]" control={controller.control} />
        <InputField {...fields.best_hours} className="flex-grow" control={controller.control} />
        <InputField {...fields.best_time} className="flex-grow" control={controller.control} />
      </div>

      <div className="flex gap-2">
        <InputField {...fields.value} className="w-[300px]" control={controller.control} />
        <InputField {...fields.tag} className="w-[300px]" control={controller.control} />
        <DropdownField
          label={fields.activities.label ?? ''}
          value="activities"
          controller={controller}
          options={[]}
          freeText
        />
      </div>

      <div className="flex gap-2">
        <DropdownField
          label={fields.facilities.label ?? ''}
          value="facilities"
          controller={controller}
          options={[]}
        />
        <DropdownField
          label={fields.take_away.label ?? ''}
          value="take_away"
          controller={controller}
          options={[]}
        />
        <DropdownField
          label={fields.dresses.label ?? ''}
          value="dresses"
          controller={controller}
          options={[]}
        />
      </div>

      <div className="mt-3">
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
