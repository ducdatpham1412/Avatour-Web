import { useRouter } from 'next/navigation';

import { SuccessIcon } from '@/components/icon';
import { Button } from '@/components/ui';
import { PROFILE_ROUTES } from '@/configs/routes';

interface Props {
  isEdit?: boolean;
}

const CreateSuccess = ({ isEdit = false }: Props) => {
  const router = useRouter();

  const content = () => {
    if (isEdit) {
      return (
        <>
          <p className="text-[30px]">Chỉnh sửa tour thành công!</p>
          <Button className="px-[70px] mt-[5vh]" onClick={() => router.back()}>
            Quay lại
          </Button>
        </>
      );
    }

    return (
      <>
        <p className="text-[30px]">Tạo tour thành công!</p>
        <p>Bạn đi tới trang cá nhân để xem tour vừa tạo nhé</p>
        <div className="mt-[5vh] inline-flex items-center gap-2">
          <Button
            className="px-[50px] bg-gray_200"
            onClick={() => {
              router.back();
            }}
          >
            Quay lại
          </Button>
          <Button
            className="px-[50px]"
            onClick={() => {
              localStorage.setItem('tab_profile', 'my_tour');
              router.replace(PROFILE_ROUTES.myProfile);
            }}
          >
            Đi tới trang cá nhân
          </Button>
        </div>
      </>
    );
  };

  return (
    <div className="w-full h-full inline-flex items-center animate-zoom-out flex-col">
      <SuccessIcon size={350} />
      {content()}
    </div>
  );
};

export default CreateSuccess;
