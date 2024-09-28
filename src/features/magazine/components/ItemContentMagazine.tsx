import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TriangleIcon } from 'lucide-react';
import { CSSProperties, useMemo } from 'react';

import { DropDown } from '@/components';
import { MenuIcon, TrashCanIcon } from '@/components/icon';
import { Image, Input, Textarea } from '@/components/ui';
import { getMarginContentMagazine, twColors } from '@/lib/utils';

interface ContentsProps {
  content: MagazineContent;
  onChange: (value: MagazineContent) => void;
  onDelete: () => void;
}

const ItemContentMagazine = ({ content, onChange, onDelete }: ContentsProps) => {
  const { top, bottom } = getMarginContentMagazine(content);
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: content.id ?? '',
  });

  const text = useMemo(() => {
    if (content.type === 'title') {
      return 'Tiêu đề đoạn';
    }

    if (content.type === 'subtitle') {
      return 'Phụ đề';
    }

    if (content.type === 'content') {
      return 'Nội dung';
    }

    return 'Ảnh';
  }, [content.type]);
  const isTitle = content.type === 'title';

  const style: CSSProperties = {
    transition,
    transform: CSS.Transform.toString(transform),
    marginTop: top,
    marginBottom: bottom,
  };

  const renderRight = () => {
    if (content.type === 'title' || content.type === 'subtitle') {
      return (
        <Input
          placeholder="Nhập tiêu đề"
          defaultValue={content.content}
          onChange={v => {
            onChange({
              id: content.id,
              type: content.type,
              content: v.target.value,
            });
          }}
        />
      );
    }

    if (content.type === 'content') {
      return (
        <Textarea
          placeholder="Nhập nội dung"
          defaultValue={content.content}
          onChange={v => {
            onChange({
              id: content.id,
              type: content.type,
              content: v.target.value,
            });
          }}
        />
      );
    }

    return (
      <div className="flex flex-1 gap-4 items-center">
        <div className="flex flex-col flex-1 gap-2">
          <Input
            placeholder="Nhập link ảnh"
            onChange={v => {
              onChange({
                id: content.id,
                type: content.type,
                content: v.target.value,
                description: content.description,
              });
            }}
            defaultValue={content.content}
          />
          <Input
            placeholder="Mô tả về ảnh"
            onChange={v => {
              onChange({
                id: content.id,
                type: content.type,
                content: content.content,
                description: v.target.value,
              });
            }}
            defaultValue={content.description}
            className="italic font-light"
          />
        </div>

        <Image src={content.content} className="w-[200px] h-[100px] rounded-[14px]" />
      </div>
    );
  };

  return (
    <div className="w-full inline-flex gap-2 md:gap-8 items-center" style={style}>
      <div ref={setNodeRef} className="hover-scale" {...attributes} {...listeners}>
        <MenuIcon color={twColors.black} size={17} />
      </div>

      <DropDown
        trigger={
          <button
            className="border-[1px] border-gray_500 w-[200px] h-[40px] hover-scale inline-flex items-center justify-center gap-2 rounded-[8px]"
            style={{
              fontWeight: isTitle ? 'bolder' : undefined,
              color: isTitle ? twColors.p_800 : twColors.black,
            }}
          >
            {text}
            <TriangleIcon size={10} className="rotate-180" />
          </button>
        }
        options={[
          {
            label: 'Tiêu đề đoạn',
            value: 'title',
            check: content.type === 'title',
          },
          {
            label: 'Phụ đề',
            value: 'subtitle',
            check: content.type === 'subtitle',
          },
          {
            label: 'Nội dung',
            value: 'content',
            check: content.type === 'content',
          },
          {
            label: 'Ảnh',
            value: 'image',
            check: content.type === 'image',
          },
        ]}
        onCheck={v => {
          onChange({
            id: content.id,
            type: v as MagazineContent['type'],
            content: content.content,
          });
        }}
      />

      {renderRight()}

      <button className="hover-scale" onClick={onDelete}>
        <TrashCanIcon size={20} />
      </button>
    </div>
  );
};

export default ItemContentMagazine;
