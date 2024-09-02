import { isEqual } from 'lodash';
import { XIcon } from 'lucide-react';
import { useState } from 'react';

import { DialogConfirm } from '@/components/dialogs';
import { Button, Image, Input } from '@/components/ui';
import { toastErr, useLoading } from '@/hooks';

interface Props {
  item: TypeProduct;
  onEdit: (v: TypeProduct) => Promise<void>;
  onDelete: () => void;
}

const ItemProductAdmin = ({ item: init, onEdit, onDelete }: Props) => {
  const [item, setItem] = useState(init);
  const { loading, setLoading } = useLoading();

  const isSame = isEqual(item, init);

  return (
    <div className="w-[300px] border-[1px] border-gray_200 rounded-[12px] p-2 bg-p_50 shrink-0">
      <p className="font-medium text-[12px]">Tên sản phẩm</p>
      <Input
        defaultValue={item.name}
        onChange={e => {
          setItem(pre => {
            return { ...pre, name: e.target.value };
          });
        }}
      />

      <p className="font-medium text-[12px] mt-[12px]">Ảnh</p>
      {item.images.map((img, index) => {
        return (
          <div className="w-full inline-flex gap-2" key={index}>
            <Image src={img} className="h-10 aspect-square rounded-[8px] shrink-0" />
            <Input
              defaultValue={img}
              onChange={e => {
                setItem(pre => {
                  pre.images[index] = e.target.value;
                  return { ...pre };
                });
              }}
            />
            <button
              onClick={e => {
                e.preventDefault();
                setItem(pre => {
                  pre.images.splice(index, 1);
                  return {
                    ...pre,
                  };
                });
              }}
              className="px-[4px]"
            >
              <XIcon size={15} />
            </button>
          </div>
        );
      })}
      <Button
        variant="outline"
        className="mt-[8px]"
        onClick={e => {
          e.preventDefault();
          setItem(pre => {
            return {
              ...pre,
              images: [...pre.images, ''],
            };
          });
        }}
      >
        Thêm ảnh
      </Button>

      <p className="font-medium text-[12px] mt-[12px]">Giá</p>
      <Input
        defaultValue={item.price}
        onChange={e => {
          setItem(pre => {
            return { ...pre, price: Number(e.target.value) };
          });
        }}
      />

      <div className="w-full inline-flex gap-x-2 mt-[12px]">
        <Button
          variant="outline"
          onClick={e => {
            e.preventDefault();
            setItem(init);
          }}
          disabled={isSame}
        >
          Reset
        </Button>
        <Button
          className="flex-1"
          loading={loading}
          disabled={isSame}
          onClick={e => {
            e.preventDefault();
            setLoading(true);
            onEdit(item)
              .catch(toastErr)
              .finally(() => {
                setLoading(false);
              });
          }}
        >
          Lưu
        </Button>
        <Button
          variant="outline"
          onClick={e => {
            e.preventDefault();
            DialogConfirm.open({
              title: 'Bạn chắc chắn muốn xoá chứ?',
              onConfirm: () => {
                DialogConfirm.close();
                onDelete();
              },
            });
          }}
        >
          Xoá
        </Button>
      </div>
    </div>
  );
};

export default ItemProductAdmin;
