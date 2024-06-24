'use client';
import { ElementRef, useRef, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { TabTrigger, TabView } from '@/components';
import { Button, Form } from '@/components/ui';
import { toast } from '@/hooks';
import { cn, parseErrorMessage } from '@/lib';

import { CreateTourForm, useTours } from '../profile/hooks';
import { CreateSuccess, TourDescription, TourName, TourSchedule } from './screens';

const CreateTour = () => {
  const [, { createTour, mutate }] = useTours();

  const tabRef = useRef<ElementRef<typeof TabView>>(null);

  const [tab, setTab] = useState<'name' | 'schedule' | 'description' | 'success'>('name');
  const [isEditing, setIsEditing] = useState(false);

  const controller = useForm<Partial<CreateTourForm>>({
    defaultValues: {
      name: '',
      schedule: [[]],
      description: '',
    },
    mode: 'onChange',
  });
  const schedule = useWatch({ control: controller.control, name: 'schedule' });

  const { errors, isValid, isSubmitting, isDirty } = controller.formState;
  const disableSchedule = !isDirty || !!errors.name || isEditing;
  const disableDescription =
    !isDirty || !!errors.name || !schedule?.length || !!errors.description || isEditing;

  const navigate = (t: typeof tab) => {
    tabRef.current?.navigate(t);
  };

  const onSubmit = async (e: Partial<CreateTourForm>) => {
    if (!e.name || !e.schedule?.length) {
      return;
    }

    try {
      const res = await createTour({
        name: e.name,
        description: e.description ?? '',
        schedule: e.schedule,
      });
      await mutate(
        pre => {
          if (pre) {
            return [res].concat(pre);
          }
        },
        { revalidate: false },
      );
      navigate('success');
    } catch (err) {
      toast({
        variant: 'destructive',
        description: parseErrorMessage(err),
      });
    }
  };

  const renderButton = () => {
    if (tab === 'description') {
      return (
        <Button
          className="text-[14px]"
          size="lg"
          type="button"
          disabled={!isValid}
          loading={isSubmitting}
          onClick={controller.handleSubmit(onSubmit)}
        >
          Hoàn tất
        </Button>
      );
    }

    const isError = () => {
      if (!isDirty) {
        return true;
      }

      if (tab === 'name') {
        return !!errors.name;
      }

      return disableDescription;
    };

    return (
      <Button
        className="text-[14px]"
        size="lg"
        onClick={() => {
          if (tab === 'name') {
            navigate('schedule');
          } else {
            navigate('description');
          }
        }}
        disabled={isError()}
        type="button"
      >
        Tiếp tục
      </Button>
    );
  };

  return (
    <Form
      {...controller}
      onSubmit={onSubmit}
      onlyDirty
      className="flex flex-col flex-1 pt-8 container"
    >
      <TabView
        ref={tabRef}
        tabs={[
          {
            id: 'name',
            children: (
              <TourName
                onNext={() => tabRef.current?.navigate('schedule')}
                register={controller.register('name', {
                  validate: v => {
                    return !!v || 'Bạn cần nhập tên tour nhé';
                  },
                })}
                errorMessage={errors.name?.message}
              />
            ),
          },
          {
            id: 'schedule',
            children: (
              <TourSchedule
                schedule={schedule ?? [[]]}
                onChangeSchedule={sd => {
                  controller.setValue('schedule', sd);
                }}
                isEditing={isEditing}
                onChangeEditing={() => setIsEditing(!isEditing)}
              />
            ),
          },
          {
            id: 'description',
            children: <TourDescription register={controller.register('description')} />,
          },
          {
            id: 'success',
            children: <CreateSuccess />,
          },
        ]}
        showTabList={false}
        onChangeTabId={id => setTab(id as typeof tab)}
        className="flex flex-1"
      />

      {tab !== 'success' && (
        <div className="py-[24px] inline-flex items-center justify-end sm:justify-between border-t-[1px]">
          <div className="gap-[30px] hidden sm:inline-flex">
            <TabTrigger
              number={1}
              title="Tiêu đề"
              status={tab === 'name' ? 'open' : 'close'}
              onClick={() => navigate('name')}
              disable={isEditing}
            />
            <TabTrigger
              number={2}
              title="Lịch trình"
              status={tab === 'schedule' ? 'open' : 'close'}
              onClick={() => navigate('schedule')}
              disable={disableSchedule}
            />
            <TabTrigger
              number={3}
              title="Mô tả"
              status={tab === 'description' ? 'open' : 'close'}
              onClick={() => navigate('description')}
              disable={disableDescription}
            />
          </div>
          <div className="inline-flex items-center gap-[28px]">
            <p
              className={cn('font-medium', tab === 'name' || isEditing ? 'text-gray_500' : '')}
              role="button"
              onClick={() => {
                if (isEditing) {
                  return;
                }
                if (tab === 'schedule') {
                  navigate('name');
                } else if (tab === 'description') {
                  navigate('schedule');
                }
              }}
            >
              Quay lại
            </p>
            {renderButton()}
          </div>
        </div>
      )}
    </Form>
  );
};

export default CreateTour;
