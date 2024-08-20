import useSWRMutation from 'swr/mutation';

import { apiOrderBuddy, OrderBuddyParams } from '@/api/profile';
import { useApi } from '@/hooks';
import { useAppContext } from '@/app/provider';

const useBuddies = () => {
  const [{ profile }] = useAppContext();

  const { data, loading, mutate } = useApi<TypeProfile[]>('/admin/suppliers', {
    params: {
      at: 'buddy',
    },
  });

  const { trigger: orderBuddy, isMutating: loadingOrderBuddy } = useSWRMutation(
    'api.orderBuddy',
    async (_, { arg }: { arg: OrderBuddyParams }) => {
      await apiOrderBuddy(arg, !!profile);
    },
  );

  return [
    { data, loading, loadingOrderBuddy },
    { mutate, orderBuddy },
  ] as const;
};

export default useBuddies;
