'use client';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import Container from '@/app/container';
import { SuccessScreen } from '@/components';
import { Button, Input, Textarea } from '@/components/ui';
import { toast } from '@/hooks';
import { getTimestamp, parseErrorMessage } from '@/lib';
import { deleteMagazine, getMagazine } from '@/lib/storage';

import { useMagazines } from './hooks';
import { Buddies, Contents } from './screens';

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
  const [contents, setContents] = useState<TypeMagazine['content']>(
    initMagazine?.content
      ? initMagazine.content.map((c, i) => ({
          ...c,
          id: `${getTimestamp()}${i}`,
        }))
      : [],
  );
  const [buddies, setBuddies] = useState<TypeMagazine['buddies']>(initMagazine?.buddies ?? []);

  const onCreate = async () => {
    try {
      if (initMagazine) {
        await edit({
          title,
          description,
          keywords,
          content: contents,
          magazineId: initMagazine.id,
          buddies,
        });
      } else {
        await create({
          title,
          description,
          keywords,
          content: contents,
          buddies,
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
        <h2 className="text-[24px] mt-[60px]">Nội dung chính</h2>
        <Contents contents={contents} setContents={setContents} />
        <Button
          variant="outline"
          className="w-[80%] md:w-[30%] mt-[24px]"
          onClick={() => {
            setContents(pre => pre.concat({ id: getTimestamp(), type: 'content', content: '' }));
          }}
        >
          + Thêm nội dung
        </Button>

        <h2 className="text-[24px] mt-[60px]">Gợi ý một số buddy cho bài viết của bạn</h2>
        <Buddies buddies={buddies} onChangeBuddies={v => setBuddies(v)} />

        <Button
          className="w-[90%] md:w-[50%] mt-[60px]"
          loading={loadingCreate || loadingEdit}
          onClick={onCreate}
          disabled={!title || !contents.length}
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
