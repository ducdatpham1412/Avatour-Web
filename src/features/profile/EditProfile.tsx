'use client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { apiEditProfile, EditProfileParams } from '@/api/profile';
import Container from '@/app/container';
import { useAppContext } from '@/app/provider';
import { TitleHeader } from '@/components';
import { Button, Form, Input, Textarea } from '@/components/ui';
import { toast } from '@/hooks';
import { parseErrorMessage } from '@/lib';

const EditProfile = () => {
  const [{ profile }, { setProfile }] = useAppContext();
  const router = useRouter();

  const form = useForm<EditProfileParams>({
    defaultValues: {
      name: profile?.name,
      description: profile?.description,
      location: profile?.location,
    },
    mode: 'onChange',
  });
  const { errors, isValid, isDirty, isSubmitting } = form.formState;

  const onSubmit = async (e: EditProfileParams) => {
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
            if (e.location) {
              pre.location = e.location;
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
    <Container>
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
          <Input
            useForm
            defaultValue={profile?.location}
            placeholder="Hiện bạn đang ở đâu?"
            className="border-gray_400 h-12 rounded-[20px] mt-[20px]"
            {...form.register('location')}
            errorMessage={errors.location?.message}
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
    </Container>
  );
};

export default EditProfile;
