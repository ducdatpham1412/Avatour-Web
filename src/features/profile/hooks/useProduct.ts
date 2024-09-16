import useSWRMutation from 'swr/mutation';

import { apiOrderProduct, OrderProductParams } from '@/api/profile';
import { useAppContext } from '@/app/provider';
import { useApi } from '@/hooks';

const useProduct = (productId: string) => {
  const [{ profile }] = useAppContext();

  const { data, loading } = useApi<TypeProduct>('/profile/products', {
    params: {
      product_id: productId,
    },
    config: {
      authorize: false,
    },
  });

  const { trigger: orderProduct, isMutating: loadingOrderProduct } = useSWRMutation(
    'api.orderProduct',
    async (_, { arg }: { arg: OrderProductParams }) => {
      await apiOrderProduct(arg, !!profile);
    },
  );

  return [{ data, loading, loadingOrderProduct }, { orderProduct }] as const;
};

export default useProduct;
