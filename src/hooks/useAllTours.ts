import { useAppContext } from '@/app/provider';
import { useTours } from '@/features/profile/hooks';
import logger from '@/lib/logger';

type Options = {
  shouldFavorite?: boolean;
};

const useAllTours = () => {
  const [, { setResource }] = useAppContext();
  const [, { mutate: mutateHome }] = useTours(undefined, 'home');
  const [, { mutate: mutateList }] = useTours(undefined, 'list');
  const [, { mutate: mutateFavorite }] = useTours(undefined, 'favorite');

  const mutateLikeTour = async (tourId: string, isLiked: boolean, options?: Options) => {
    const { shouldFavorite = true } = options ?? {};

    await mutateHome(
      pre => {
        if (pre) {
          return pre.map(item => {
            if (item.id !== tourId) {
              return item;
            }

            return {
              ...item,
              is_liked: isLiked,
            };
          });
        }
      },
      { revalidate: false },
    );
    await mutateList(
      pre => {
        if (pre) {
          return pre.map(item => {
            if (item.id !== tourId) {
              return item;
            }

            return {
              ...item,
              is_liked: isLiked,
            };
          });
        }
      },
      { revalidate: false },
    );

    setResource(pre => {
      if (pre) {
        const check = pre.favorite_tours.find(tour => tour.id === tourId);

        if (!check) {
          return pre;
        }

        pre.favorite_tours = pre.favorite_tours.map(tour => {
          if (tour.id !== tourId) {
            return tour;
          }

          return {
            ...tour,
            is_liked: isLiked,
          };
        });

        return {
          ...pre,
        };
      }
    });

    if (shouldFavorite) {
      mutateFavorite().catch(logger.log);
    }
  };

  return { mutateLikeTour } as const;
};

export default useAllTours;
