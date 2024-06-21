'use client';

import {
  ForwardedRef,
  ReactElement,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib';

interface Props {
  tabs: Array<{
    id: string;
    title?: string;
    icon?: ReactElement;
    rightIcon?: ReactElement;
    children: ReactElement;
  }>;
  defaultTab?: string;
  className?: string;
  listClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
  showTabList?: boolean;
  onChangeTabId?: (id: string) => void;
  rightTrigger?: Pick<Props['tabs'][number], 'title' | 'icon'> & {
    onPress: () => void;
    className?: string;
  };
}

interface Refs {
  navigate: (tab: string) => void;
}

const triggerClass =
  'rounded-full bg-gray_200 data-[state=active]:bg-p_600 data-[state=active]:text-black text-black gap-[6px] h-[36px] text-[12px] md:text-[14px] hover:scale-x-[1.05] duration-300';

const TabView = forwardRef(
  (
    {
      tabs,
      defaultTab,
      className,
      listClassName,
      triggerClassName,
      contentClassName,
      showTabList = true,
      onChangeTabId,
      rightTrigger,
    }: Props,
    ref: ForwardedRef<Refs>,
  ) => {
    const [tab, setTab] = useState(defaultTab ?? tabs[0]?.id);

    useImperativeHandle(
      ref,
      () => ({
        navigate: t => setTab(t),
      }),
      [setTab],
    );

    useEffect(() => {
      onChangeTabId?.(tab);
    }, [tab]);

    return (
      <Tabs value={tab} className={cn('w-full', className)}>
        {showTabList && (
          <TabsList
            className={cn(
              'flex lg:justify-start gap-[2px] sm:gap-[6px] md:gap-[12px] bg-transparent overflow-x-auto hide-scrollbar',
              listClassName,
            )}
          >
            {tabs.map(t => {
              return (
                <TabsTrigger
                  value={t.id}
                  className={cn(triggerClass, triggerClassName)}
                  onClick={() => setTab(t.id)}
                >
                  {t.icon}
                  {t.title ?? ''}
                  {t.rightIcon}
                </TabsTrigger>
              );
            })}
            {!!rightTrigger && (
              <TabsTrigger
                value="button-add"
                className={cn(triggerClass, rightTrigger.className)}
                onClick={rightTrigger.onPress}
              >
                {rightTrigger.icon}
                {rightTrigger.title ?? ''}
              </TabsTrigger>
            )}
          </TabsList>
        )}

        {tabs.map(t => {
          return (
            <TabsContent value={t.id} className={cn('mt-0 w-full', contentClassName)}>
              {t.children}
            </TabsContent>
          );
        })}
      </Tabs>
    );
  },
);

export default TabView;
