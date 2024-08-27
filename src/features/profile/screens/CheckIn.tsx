import { PlusIcon } from 'lucide-react';
import Link from 'next/link';

import { useAppContext } from '@/app/provider';
import { SuccessIcon } from '@/components/icon';
import { MAGAZINE_ROUTES } from '@/configs/routes';
import { useMagazines } from '@/features/magazine/hooks';

import { ItemMagazine } from '../components';

interface Props {
  userId: number;
}

const CheckIn = ({ userId }: Props) => {
  const [{ profile }] = useAppContext();
  const [{ data }] = useMagazines();

  const isMyProfile = userId === profile?.id;

  const renderContent = () => {
    if (!data?.length) {
      return <SuccessIcon size={350} className="mx-auto mt-[10vh] animate-zoom-out" />;
    }

    const myMagazines = data.filter(c => c.creator === userId);

    return (
      <div className="w-full inline-flex flex-col gap-[24px] pb-[100px] mt-[16px]">
        {myMagazines.map(magazine => {
          return <ItemMagazine key={magazine.id} item={magazine} />;
        })}
      </div>
    );
  };

  return (
    <>
      {isMyProfile && (
        <div className="w-full inline-flex items-center justify-between mt-[20px]">
          <p className="text-[20px]">Tạp chí du lịch</p>
          <Link
            className="w-[32px] h-[32px] bg-p_600 inline-flex items-center justify-center rounded-full hover-scale hover:scale-[1.1]"
            href={MAGAZINE_ROUTES.createMagazine}
          >
            <PlusIcon size={20} />
          </Link>
        </div>
      )}
      {renderContent()}
    </>
  );
};

export default CheckIn;
