'use client';
import { EllipsisVertical } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';

import Container from '@/app/container';
import { useAppContext } from '@/app/provider';
import { DropDown } from '@/components';
import { DialogConfirm } from '@/components/dialogs';
import { Avatar, Image } from '@/components/ui';
import { MAGAZINE_ROUTES, PROFILE_ROUTES } from '@/configs/routes';
import { toast } from '@/hooks';
import { getMarginContentMagazine, goToProfile, logger, parseErrorMessage } from '@/lib';
import { setMagazine } from '@/lib/storage';

import { ItemBuddy } from '../buddy/components';
import { getElementTitleId, TableOfContent } from './components';
import { useMagazines } from './hooks';

type Props = PageProps<{ magazine_id: string }>;

const renderContent = (content: MagazineContent) => {
  const { top, bottom } = getMarginContentMagazine(content);

  if (content.type === 'content') {
    return (
      <p
        className="font-normal whitespace-pre-line text-justify"
        style={{ marginTop: top, marginBottom: bottom }}
      >
        {content.content}
      </p>
    );
  }

  if (content.type === 'image') {
    return (
      <div className="w-full text-center" style={{ marginTop: top, marginBottom: bottom }}>
        <Image src={content.content} className="w-full rounded-[14px] aspect-[4.5/3]" />
        {!!content.description && (
          <p className="text-[13px] italic font-light mt-[8px]">{content.description}</p>
        )}
      </div>
    );
  }

  if (content.type === 'subtitle') {
    return (
      <p className="text-[16px] font-medium" style={{ marginTop: top, marginBottom: bottom }}>
        {content.content}
      </p>
    );
  }

  return (
    <section
      id={getElementTitleId(content.content)}
      className="text-[20px] font-medium"
      style={{ marginTop: top, marginBottom: bottom }}
    >
      {content.content}
    </section>
  );
};

const DetailMagazine = ({ params }: Props) => {
  const router = useRouter();
  const [{ data }, { deleteMagazine, mutate }] = useMagazines();
  const [{ profile }] = useAppContext();
  const magazine = data?.find(item => item.id === params.magazine_id);
  const isMine = profile && magazine?.creator === profile.id;

  if (!magazine) {
    return <Container />;
  }

  const listTitles = magazine.content.filter(c => c.type === 'title');

  return (
    <Container
      showHeader={false}
      contentContainer="max-w-[750px] lg:max-w-[1040px] px-[20px]"
      metaData={{
        title: magazine.title,
        descriptions: magazine.description,
        keywords: magazine.keywords,
      }}
    >
      <div className="w-full inline-flex gap-[40px]">
        <div className="flex flex-1 flex-col">
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
            <p className="mt-[20px] mb-[4px] font-medium whitespace-pre-line text-justify">
              {magazine.description}
            </p>
          )}

          <TableOfContent
            listTitles={listTitles}
            className="w-full inline-flex lg:hidden mt-[20px]"
          />

          {magazine.content.map((c, i) => {
            return <Fragment key={i}>{renderContent(c)}</Fragment>;
          })}
        </div>

        <TableOfContent
          listTitles={listTitles}
          className="w-[270px] hidden lg:inline-flex sticky top-8 max-h-[60vh] self-start"
        />
      </div>

      {!!magazine.buddies.length && (
        <>
          <p className="text-[20px] font-medium mt-[28px]">
            Một số trải nghiệm cùng buddy địa phương bạn có thể tham khảo
          </p>
          <div className="w-full inline-flex flex-wrap sm:gap-x-[4%] lg:gap-x-[3.5%] gap-y-7 sm:gap-y-8 mt-[20px]">
            {magazine.buddies.map(buddy => {
              return (
                <ItemBuddy
                  item={buddy}
                  key={buddy.id}
                  onClick={() => {
                    router.push(PROFILE_ROUTES.profileId(buddy.id));
                  }}
                />
              );
            })}
          </div>
        </>
      )}
    </Container>
  );
};

export default DetailMagazine;
