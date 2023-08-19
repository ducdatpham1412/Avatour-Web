import { useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui';

import { EditSuppliersFormProps, SupplierData } from '../types';
import { editSupplierFields } from '../constants';
import SupplierChecklistField from './SupplierChecklistField';
import SupplierField from './SupplierInputField';
import AvatarPreview from './AvatarPreview';

const EditSuppliersForm: React.FC<EditSuppliersFormProps> = ({ defaultValues, onSubmit }) => {
  const type = useRef<'update' | 'create'>(defaultValues ? 'update' : 'create');

  const [submitting, setSubmitting] = useState(false);

  const formController = useForm<SupplierData>({
    defaultValues,
    mode: 'onSubmit',
  });
  const fields = useMemo(() => editSupplierFields, []);

  const handleSubmit = async (data: SupplierData) => {
    setSubmitting(true);
    try {
      await onSubmit(data, type.current);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      {...formController}
      onSubmit={handleSubmit}
      className="p-6 overflow-y-auto beautìul-scrollbar"
      onlyDirty
    >
      <div className="flex items-stretch gap-10">
        <div className="flex items-start h-full">
          <AvatarPreview defaultValue={defaultValues?.avatar} control={formController.control} />
        </div>
        <div className="flex flex-col flex-grow gap-1">
          <div className="flex gap-5 flex-grow pr-8">
            <SupplierField
              {...fields.avatar}
              className="flex-grow"
              control={formController.control}
            />
            <SupplierField
              {...fields.location}
              className="flex-grow"
              control={formController.control}
            />
          </div>
          <div className="flex gap-5 flex-grow pr-8">
            <SupplierField
              {...fields.name}
              className="w-[calc(50%_-_1.25em_/_2)]"
              control={formController.control}
            />
            <div className="flex flex-grow gap-5">
              <SupplierField
                {...fields.lat}
                className="flex-grow"
                control={formController.control}
              />
              <SupplierField
                {...fields.lng}
                className="flex-grow"
                control={formController.control}
              />
            </div>
          </div>
          <div className="flex gap-5 flex-grow pr-20">
            <SupplierField
              {...fields.duration}
              className="flex-grow"
              control={formController.control}
            />

            <SupplierField
              {...fields.min_cost}
              className="flex-grow"
              control={formController.control}
            />
            <SupplierField
              {...fields.max_cost}
              className="flex-grow"
              control={formController.control}
            />
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <SupplierField {...fields.email} className="flex-grow" control={formController.control} />
        <SupplierField {...fields.phone} className="flex-grow" control={formController.control} />
        <div className="w-max">
          <h4 className="font-bold">Categories</h4>
          <SupplierChecklistField {...fields.account_type} control={formController.control} />
          <SupplierChecklistField {...fields.services} control={formController.control} multiple />
        </div>
      </div>
      <div>
        <SupplierField
          {...fields.description}
          className="flex-grow"
          type="textarea"
          control={formController.control}
        />
      </div>
      <div className="flex justify-center">
        <Button
          type="submit"
          loading={submitting}
          className="w-[330px] h-[40px] rounded-full font-bold"
        >
          {defaultValues ? 'Cập nhật' : 'Thêm mới'}
        </Button>
      </div>
    </Form>
  );
};

export type { EditSuppliersFormProps };
export default EditSuppliersForm;
