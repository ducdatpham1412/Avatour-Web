import { useAppContext } from '@/app/provider';
import { useApi } from '@/hooks';

const useVouchers = (id: number | string, voucherType: TypeVoucher['type']) => {
  const [{ profile }] = useAppContext();
  const { data, loading, mutate } = useApi<TypeVoucher[]>('/admin/vouchers', {
    config: {
      authorize: !!profile,
    },
    params: {
      buddy_id: voucherType === 'buddy' ? id : undefined,
      product_id: voucherType === 'product' ? id : undefined,
    },
  });

  return [{ data, loading }, { mutate }] as const;
};

export default useVouchers;
