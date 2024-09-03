import useSWRMutation from 'swr/mutation';

import {
  apiCreateProduct,
  apiDeleteProduct,
  apiEditProduct,
  CreateProductParams,
  EditProductParams,
} from '@/api/profile';
import { useApi } from '@/hooks';

const useProfile = (userId: number) => {
  const { data, loading, validating, mutate } = useApi<TypeProfile>(`/profile/${userId}`, {
    config: {
      authorize: false,
    },
  });

  const { trigger: createProduct, isMutating: loadingCreateProduct } = useSWRMutation(
    'api.createProduct',
    async (_, { arg }: { arg: CreateProductParams }) => {
      const res = await apiCreateProduct(arg);
      return res;
    },
  );

  const { trigger: editProduct } = useSWRMutation(
    'api.editProduct',
    async (_, { arg }: { arg: EditProductParams }) => {
      const res = await apiEditProduct(arg);
      return res;
    },
  );

  const { trigger: deleteProduct, isMutating: loadingDeleteProduct } = useSWRMutation(
    'api.editProduct',
    async (_, { arg: productId }: { arg: string }) => {
      const res = await apiDeleteProduct(productId);
      return res;
    },
  );

  return [
    { data, loading, validating, loadingCreateProduct, loadingDeleteProduct },
    { mutate, createProduct, editProduct, deleteProduct },
  ] as const;
};

export default useProfile;
