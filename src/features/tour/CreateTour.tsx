'use client';
import { ElementRef, useMemo, useRef, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { useAppContext } from '@/app/provider';
import { TabTrigger, TabView } from '@/components';
import { DialogAuth } from '@/components/dialogs';
import { Button, Form } from '@/components/ui';
import { toast } from '@/hooks';
import { cn, getTourName, parseErrorMessage } from '@/lib';
import { getTourCreate, removeTourCreate } from '@/lib/storage';

import { CreateTourForm, useTours } from '../profile/hooks';
import { CreateSuccess, TourDescription, TourName, TourSchedule } from './screens';

const CreateTour = () => {
  const [{ profile }] = useAppContext();
  const [, { createTour, mutate, editTour, makeTourBeMine }] = useTours();
  const [, { mutate: mutateFavorite }] = useTours(undefined, 'favorite');

  const tabRef = useRef<ElementRef<typeof TabView>>(null);

  const [tab, setTab] = useState<'name' | 'schedule' | 'description' | 'success'>('name');
  const [isEditing, setIsEditing] = useState(false);
  const defaultValues = useMemo((): {
    value: CreateTourForm;
    mode: 'create' | 'edit' | 'make-mine';
    haveValueBefore: boolean;
  } => {
    const tour = getTourCreate();
    if (!tour) {
      return {
        value: {
          name: '',
          schedule: [[]],
          description: '',
        },
        mode: 'create',
        haveValueBefore: false,
      };
    }
    removeTourCreate();

    const valueForm: CreateTourForm = {
      name: getTourName(tour),
      schedule: tour.schedule,
      description: tour.description,
      tourId: tour.id,
    };

    if (!tour.id) {
      return {
        value: valueForm,
        mode: 'create',
        haveValueBefore: true,
      };
    }

    if (!tour.creator) {
      return {
        value: valueForm,
        mode: 'make-mine',
        haveValueBefore: true,
      };
    }

    if (tour.creator !== profile?.id) {
      return {
        value: valueForm,
        mode: 'create',
        haveValueBefore: true,
      };
    }

    return {
      value: valueForm,
      mode: 'edit',
      haveValueBefore: true,
    };
  }, []);

  const controller = useForm<Partial<CreateTourForm>>({
    defaultValues: defaultValues.value,
    mode: 'onChange',
  });
  const schedule = useWatch({ control: controller.control, name: 'schedule' });
  const { errors, isValid, isSubmitting, isDirty } = controller.formState;
  const errorDirty = defaultValues.haveValueBefore ? false : !isDirty;

  const disableSchedule = errorDirty || !!errors.name || isEditing;
  const disableDescription =
    errorDirty || !!errors.name || !schedule?.length || !!errors.description || isEditing;
  const isCreateNew = defaultValues.mode === 'create';

  const navigate = (t: typeof tab) => {
    tabRef.current?.navigate(t);
  };

  const onSubmit = async (e: Partial<CreateTourForm>) => {
    if (!profile) {
      DialogAuth.open({
        mode: 'sign-in',
      });
      return;
    }

    if (!e.name || !e.schedule?.length) {
      return;
    }

    const valueCreate = {
      name: e.name,
      description: e.description ?? '',
      schedule: e.schedule,
    };

    try {
      if (defaultValues.mode === 'create') {
        const res = await createTour(valueCreate);
        await mutate(
          pre => {
            if (pre) {
              return [res].concat(pre);
            }
          },
          { revalidate: false },
        );
      } else if (defaultValues.mode === 'edit') {
        await editTour({
          tourId: e.tourId ?? '',
          data: valueCreate,
        });
        await mutate();
        await mutateFavorite();
      } else {
        await makeTourBeMine({
          tourId: e.tourId ?? '',
          data: valueCreate,
        });
        await mutate();
        await mutateFavorite();
      }

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
          disabled={!isValid || (!isDirty && !defaultValues.haveValueBefore)}
          loading={isSubmitting}
          onClick={controller.handleSubmit(onSubmit)}
        >
          {isCreateNew ? 'Tạo tour' : 'Chỉnh sửa'}
        </Button>
      );
    }

    const isError = () => {
      if (errorDirty) {
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
        // defaultTab="success"
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
                  controller.setValue('schedule', sd, {
                    shouldDirty: true,
                  });
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
            children: <CreateSuccess isEdit={!isCreateNew} />,
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
