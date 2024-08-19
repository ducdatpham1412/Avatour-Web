import useSWRMutation from 'swr/mutation';

import { apiOrderBuddy, OrderBuddyParams } from '@/api/profile';
import { useApi } from '@/hooks';

const useBuddies = () => {
  const { data, loading, mutate } = useApi<TypeProfile[]>('/admin/suppliers', {
    params: {
      at: 'buddy',
    },
  });

  const { trigger: orderBuddy, isMutating: loadingOrderBuddy } = useSWRMutation(
    'api.orderBuddy',
    async (_, { arg }: { arg: OrderBuddyParams }) => {
      await apiOrderBuddy(arg);
    },
  );

  return [
    { data, loading, loadingOrderBuddy },
    { mutate, orderBuddy },
  ] as const;
};

export default useBuddies;
