import { useRouter } from 'next/navigation';

import { SuccessIcon } from '@/components/icon';
import { Button } from '@/components/ui';
import { PROFILE_ROUTES } from '@/configs/routes';

const CreateSuccess = () => {
  const router = useRouter();

  return (
    <div className="w-full h-full inline-flex items-center animate-zoom-out flex-col">
      <SuccessIcon size={350} />
      <p className="text-[30px]">Tạo tour thành công!</p>
      <p>Bạn đi tới trang cá nhân để xem tour vừa tạo nhé</p>
      <Button
        className="px-[70px] mt-[5vh]"
        onClick={() => router.replace(PROFILE_ROUTES.myProfile)}
      >
        Đi tới trang cá nhân
      </Button>
    </div>
  );
};

export default CreateSuccess;
