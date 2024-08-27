'use client';
import { EllipsisVertical } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';

import Container from '@/app/container';
import { useAppContext } from '@/app/provider';
import { Avatar, Image } from '@/components/ui';
import { DropDown } from '@/components';
import { getMarginContentMagazine, goToProfile, logger, parseErrorMessage } from '@/lib';
import { setMagazine } from '@/lib/storage';
import { MAGAZINE_ROUTES } from '@/configs/routes';
import { DialogConfirm } from '@/components/dialogs';
import { toast } from '@/hooks';

import { useMagazines } from './hooks';

type Props = PageProps<{ magazine_id: string }>;

const DetailMagazine = ({ params }: Props) => {
  const router = useRouter();
  const [{ data }, { deleteMagazine, mutate }] = useMagazines();
  const [{ profile }] = useAppContext();
  const magazine = data?.find(item => item.id === params.magazine_id);
  const isMine = profile && magazine?.creator === profile.id;

  if (!magazine) {
    return <Container />;
  }

  const renderContent = (content: MagazineContent) => {
    const { top, bottom } = getMarginContentMagazine(content);

    if (content.type === 'image') {
      return (
        <div className="w-full text-center" style={{ marginTop: top, marginBottom: bottom }}>
          <Image src={content.content} className="w-full rounded-[14px]" />
          {!!content.description && (
            <p className="text-[13px] italic font-light mt-[8px]">{content.description}</p>
          )}
        </div>
      );
    }

    if (content.type === 'content') {
      return (
        <p className="font-normal" style={{ marginTop: top, marginBottom: bottom }}>
          {content.content}
        </p>
      );
    }

    return (
      <p className="text-[20px] font-medium" style={{ marginTop: top, marginBottom: bottom }}>
        {content.content}
      </p>
    );
  };

  return (
    <Container
      showHeader={false}
      contentContainer="max-w-[750px] px-[20px]"
      metaData={{
        title: magazine.title,
        descriptions: magazine.description,
        keywords: magazine.keywords,
      }}
    >
      <p className="text-[28px] md:text-[36px] font-medium mt-[12px]">{magazine.title}</p>

      <div className="w-full inline-flex justify-between mt-[24px] mb-[4px]">
        <button
          className="inline-flex items-center gap-2 hover-scale"
          onClick={() =>
            goToProfile(magazine.creator, {
              router,
              myId: profile?.id,
            })
          }
        >
          <Avatar src={magazine.creator_avatar} size={35} />
          <p>{magazine.creator_name}</p>
        </button>
        {isMine && (
          <DropDown
            trigger={
              <EllipsisVertical strokeWidth={1.4} size={20} className="hover-slow rounded-md" />
            }
            options={[
              {
                value: 'edit',
                label: 'Chỉnh sửa',
                type: 'menu-item',
              },
              {
                value: 'delete',
                label: 'Xoá bài',
                type: 'menu-item',
              },
            ]}
            onCheck={v => {
              if (v === 'delete') {
                setTimeout(() => {
                  DialogConfirm.open({
                    title: 'Bạn chắc chắn muốn xoá chứ?',
                    onConfirm: () => {
                      DialogConfirm.close();
                      deleteMagazine({ magazineId: magazine.id })
                        .then(() => {
                          mutate()
                            .catch(logger.log)
                            .finally(() => {
                              router.back();
                            });
                        })
                        .catch(err => {
                          toast({
                            variant: 'destructive',
                            description: parseErrorMessage(err),
                          });
                        });
                    },
                  });
                }, 200);
              } else {
                setMagazine(magazine);
                router.push(MAGAZINE_ROUTES.createMagazine);
              }
            }}
          />
        )}
      </div>

      {!!magazine.description && (
        <p className="mt-[20px] mb-[4px] font-medium">{magazine.description}</p>
      )}

      {magazine.content.map((c, i) => {
        return <Fragment key={i}>{renderContent(c)}</Fragment>;
      })}
    </Container>
  );
};

export default DetailMagazine;
