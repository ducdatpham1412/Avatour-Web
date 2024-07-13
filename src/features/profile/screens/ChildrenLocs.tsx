import { serviceDataDetail } from '@/features/search/constants';
import { navigateNewTab } from '@/lib/utils';
import { PROFILE_ROUTES } from '@/configs/routes';

import { LocationTag } from '../components';
import { useChildren } from '../hooks';

interface Props {
  userId: number;
}

const ChildrenLocs = ({ userId }: Props) => {
  const [{ data }] = useChildren(userId);

  if (!data?.length) {
    return null;
  }

  return (
    <div className="overflow-x-auto overflow-y-hidden inline-flex gap-[16px] beautiful-scrollbar pt-[8px] pb-[12px]">
      {data.map(profile => {
        return (
          <LocationTag
            img={profile.link[0]?.img ?? profile.avatar}
            name={profile.name}
            des={profile.services
              .slice(0, 2)
              .map(s => serviceDataDetail[s].name)
              .join(', ')}
            className="hover-scale shrink-0"
            onClick={() => navigateNewTab(PROFILE_ROUTES.profileId(profile.id))}
          />
        );
      })}
    </div>
  );
};

export default ChildrenLocs;
