import { ReactElement } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib';

interface Props {
  tabs: Array<{
    title?: string;
    icon?: ReactElement;
    children: ReactElement;
  }>;
  defaultTab?: string;
  className?: string;
  listClassName?: string;
  triggerClassName?: string;
}

const TabView = ({ tabs, defaultTab, className, listClassName, triggerClassName }: Props) => {
  return (
    <Tabs defaultValue={defaultTab ?? tabs[0]?.title} className={cn('w-full', className)}>
      <TabsList
        className={cn(
          'flex lg:justify-start gap-[2px] sm:gap-[6px] md:gap-[12px] bg-transparent',
          listClassName,
        )}
      >
        {tabs.map(t => {
          return (
            <TabsTrigger
              value={t.title ?? ''}
              className={cn(
                'rounded-full bg-gray_200 data-[state=active]:bg-p_600 data-[state=active]:text-black text-black gap-[6px] h-[36px] text-[12px] md:text-[14px]',
                triggerClassName,
              )}
            >
              {t.icon}
              {t.title ?? ''}
            </TabsTrigger>
          );
        })}
      </TabsList>

      {tabs.map(t => {
        return (
          <TabsContent value={t.title ?? ''} className="mt-0">
            {t.children}
          </TabsContent>
        );
      })}
    </Tabs>
  );
};

export default TabView;
