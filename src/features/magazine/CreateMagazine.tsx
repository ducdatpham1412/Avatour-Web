'use client';
import { TriangleIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import Container from '@/app/container';
import { DropDown, SuccessScreen, TrashCanIcon } from '@/components';
import { Button, Image, Input, Textarea } from '@/components/ui';
import { toast } from '@/hooks';
import { getMarginContentMagazine, parseErrorMessage, twColors } from '@/lib';
import { deleteMagazine, getMagazine } from '@/lib/storage';

import { useMagazines } from './hooks';

interface ContentProps {
  content: MagazineContent;
  onChange: (value: MagazineContent) => void;
  onDelete: () => void;
}

const Content = ({ content, onChange, onDelete }: ContentProps) => {
  const { top, bottom } = getMarginContentMagazine(content);
  const text = useMemo(() => {
    if (content.type === 'title') {
      return 'Tiêu đề đoạn';
    }

    if (content.type === 'content') {
      return 'Nội dung';
    }

    return 'Ảnh';
  }, [content.type]);
  const isTitle = content.type === 'title';

  const renderRight = () => {
    if (content.type === 'title') {
      return (
        <Input
          placeholder="Nhập tiêu đề"
          defaultValue={content.content}
          onChange={v => {
            onChange({
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
    <div
      className="w-full inline-flex gap-2 md:gap-8 items-center"
      style={{
        marginTop: top,
        marginBottom: bottom,
      }}
    >
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

const CreateMagazine = () => {
  const router = useRouter();
  const [{ loadingCreate, loadingEdit }, { create, mutate, edit }] = useMagazines();
  const initMagazine = useMemo(() => {
    const temp = getMagazine();
    if (temp) {
      deleteMagazine();
    }
    return temp;
  }, []);

  const [success, setSuccess] = useState(false);
  const [title, setTitle] = useState(initMagazine?.title ?? '');
  const [description, setDescription] = useState(initMagazine?.description ?? '');
  const [keywords, setKeywords] = useState(initMagazine?.keywords ?? '');
  const [content, setContent] = useState<TypeMagazine['content']>(initMagazine?.content ?? []);

  const onCreate = async () => {
    try {
      if (initMagazine) {
        await edit({
          title,
          description,
          keywords,
          content,
          magazineId: initMagazine.id,
        });
      } else {
        await create({
          title,
          description,
          keywords,
          content,
        });
      }

      await mutate();
      setSuccess(true);
    } catch (err) {
      toast({
        description: parseErrorMessage(err),
        variant: 'destructive',
      });
    }
  };

  const renderContent = () => {
    if (success) {
      return (
        <SuccessScreen
          title={initMagazine ? 'Chỉnh sửa thành công' : 'Tạo bài thành công'}
          description="Avatour xin cảm ơn sự đóng góp của bạn"
          className="mt-[24px]"
          onOk={() => router.back()}
        />
      );
    }

    return (
      <>
        <h2 className="text-[24px] mt-[16px]">Tiêu đề của bạn là gì?</h2>
        <Input
          className="rounded-[20px] mt-[12px]"
          placeholder="Chuyến đi khám phá ..."
          defaultValue={title}
          onChange={e => {
            setTitle(e.target.value);
          }}
        />
        <h2 className="text-[16px] mt-[16px]">Mô tả ngắn về bài viết của bạn</h2>
        <Textarea
          className="mt-[12px] rounded-[20px]"
          placeholder="Mô tả ngắn"
          onChange={e => setDescription(e.target.value)}
          defaultValue={description}
        />
        <h2 className="text-[16px] mt-[16px]">Từ khoá chính, ngăn cách nhau bởi dấu phẩy</h2>
        <Input
          className="rounded-[20px] mt-[12px]"
          placeholder="Từ khoá 1, Từ khoá 2"
          onChange={e => {
            setKeywords(e.target.value);
          }}
          defaultValue={keywords}
        />
        <h2 className="text-[24px] mt-[40px]">Nội dung chính</h2>
        {content.map((c, i) => {
          return (
            <Content
              key={i}
              content={c}
              onChange={v => {
                setContent(pre => {
                  pre[i] = v;
                  return [...pre];
                });
              }}
              onDelete={() => {
                setContent(pre => {
                  pre.splice(i, 1);
                  return [...pre];
                });
              }}
            />
          );
        })}
        <Button
          variant="outline"
          className="w-[80%] md:w-[30%] mt-[24px]"
          onClick={() => {
            setContent(pre => pre.concat({ type: 'content', content: '' }));
          }}
        >
          + Thêm nội dung
        </Button>
        <Button
          className="w-[90%] md:w-[50%] mt-[60px]"
          loading={loadingCreate || loadingEdit}
          onClick={onCreate}
          disabled={!title || !content.length}
        >
          {initMagazine ? 'Chỉnh sửa' : 'Tạo tạp chí'}
        </Button>
      </>
    );
  };

  return (
    <Container
      showFooter={false}
      showHeader={false}
      background="sun"
      contentContainer="inline-flex flex-col"
    >
      {renderContent()}
    </Container>
  );
};

export default CreateMagazine;
