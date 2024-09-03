import { useState } from 'react';

import { useProfile } from '@/features/profile/hooks';
import { toastErr } from '@/hooks';
import { Button } from '@/components/ui';

import { ItemProductAdmin } from '../components';

interface Props {
  userId: number;
}

const EditProducts = ({ userId }: Props) => {
  const [{ data }, { deleteProduct, editProduct, createProduct, mutate }] = useProfile(userId);
  const [newProducts, setNewProducts] = useState<TypeProduct[]>([]);

  const onDelete = async (productId: string) => {
    try {
      await deleteProduct(productId);
      await mutate(
        pre => {
          if (pre?.info?.products) {
            pre.info.products = pre.info.products.filter(p => p.id !== productId);
            return {
              ...pre,
            };
          }
        },
        { revalidate: false },
      );
    } catch (err) {
      toastErr(err);
    }
  };

  const onEditProduct = async (item: TypeProduct) => {
    await editProduct(item);
    await mutate(
      pre => {
        if (pre?.info?.products) {
          const products = pre.info.products.map(p => {
            if (p.id !== item.id) {
              return p;
            }
            return item;
          });
          return {
            ...pre,
            info: {
              ...pre.info,
              products,
            },
          };
        }
      },
      {
        revalidate: false,
      },
    );
  };

  const onCreateProduct = async (item: TypeProduct, index: number) => {
    try {
      await createProduct({
        ...item,
        creator: userId,
      });
      await mutate();
      setNewProducts(pre => {
        pre.splice(index, 1);
        return [...pre];
      });
    } catch (err) {
      toastErr(err);
    }
  };

  return (
    <div className="w-full">
      <p className="font-bold text-[12px]">Sản phẩm</p>
      <div className="w-full inline-flex gap-x-[16px] overflow-x-auto beautiful-scrollbar mt-[12px] pb-[20px]">
        {data?.info?.products.map(product => {
          return (
            <ItemProductAdmin
              key={product.id}
              item={product}
              onEdit={onEditProduct}
              onDelete={() => onDelete(product.id)}
            />
          );
        })}
        {newProducts.map((p, i) => {
          return (
            <ItemProductAdmin
              key={i}
              item={p}
              onEdit={item => onCreateProduct(item, i)}
              onDelete={() => {
                setNewProducts(pre => {
                  pre.splice(i, 1);
                  return [...pre];
                });
              }}
            />
          );
        })}
        <Button
          variant="outline"
          className="self-center shrink-0"
          onClick={e => {
            e.preventDefault();
            setNewProducts(pre =>
              pre.concat([
                {
                  id: '',
                  name: '',
                  images: [],
                  price: 0,
                },
              ]),
            );
          }}
        >
          Thêm sản phẩm mới
        </Button>
      </div>
    </div>
  );
};

export default EditProducts;
