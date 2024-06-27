'use client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { apiEditProfile } from '@/api/profile';
import { useAppContext } from '@/app/provider';
import { TitleHeader } from '@/components';
import { ButtonBack } from '@/components/buttons';
import { Button, Form, Input, Textarea } from '@/components/ui';
import { toast } from '@/hooks';
import { parseErrorMessage } from '@/lib';

type EditProfile = {
  name?: string;
  description?: string;
};

const EditProfile = () => {
  const [{ profile }, { setProfile }] = useAppContext();
  const router = useRouter();

  const form = useForm<EditProfile>({
    defaultValues: {
      name: profile?.name,
      description: profile?.description,
    },
    mode: 'onChange',
  });
  const { errors, isValid, isDirty, isSubmitting } = form.formState;

  const onSubmit = async (e: EditProfile) => {
    if (profile) {
      try {
        await apiEditProfile(profile.id, e);
        setProfile(pre => {
          if (pre) {
            if (e.name) {
              pre.name = e.name;
            }
            if (e.description) {
              pre.description = e.description;
            }
            return { ...pre };
          }
        });
        toast({
          description: 'Thay đổi thông tin thành công',
        });
        router.back();
      } catch (err) {
        toast({
          variant: 'destructive',
          description: parseErrorMessage(err),
        });
      }
    }
  };

  return (
    <div className="w-full container">
      <ButtonBack onClick={() => router.back()} className="self-start mt-2" />

      <div className="mx-auto w-full md:w-[80%] lg:w-[60%]">
        <TitleHeader title="Chỉnh sửa thông tin của bạn chút nhé" className="mt-[50px]" />
        <Form {...form} onSubmit={onSubmit} className="w-full inline-flex flex-col mt-[20px]">
          <Input
            useForm
            defaultValue={profile?.name}
            placeholder="Tên của bạn"
            className="border-gray_400 h-12 rounded-[20px]"
            {...form.register('name', {
              validate: v => {
                return !!v || 'Bạn cần nhập tên nhé';
              },
            })}
            errorMessage={errors.name?.message}
          />
          <Textarea
            defaultValue={profile?.description}
            placeholder="Mô tả một chút về bạn nhé"
            className="border-gray_400 mt-[20px] rounded-[20px]"
            {...form.register('description')}
          />
          <Button
            type="submit"
            label="Lưu"
            loading={isSubmitting}
            disabled={!isValid || !isDirty}
            className="w-[80%] self-center mt-[100px]"
          />
        </Form>
      </div>
    </div>
  );
};

export default EditProfile;
