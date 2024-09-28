import React from 'react';

import { cn } from '@/lib/utils';

export const getElementTitleId = (title: string) => {
  return `title-${title}`;
};

type TableOfContentProps = {
  listTitles: MagazineContent[];
  className: string;
};

const TableOfContent = ({ listTitles, className }: TableOfContentProps) => {
  return (
    <div
      className={cn(
        'rounded-[14px] border-[1px] border-gray_300 bg-white px-[12px] pt-[8px] pb-[12px] flex-col gap-y-2',
        className,
      )}
    >
      <h1 className="text-[18px] font-medium">Mục lục</h1>
      <div className="w-full h-[1px] bg-gray_200" />
      {listTitles.map(t => {
        return (
          <button
            className="hover:underline text-start text-[14px] lg:text-[12px]"
            onClick={() => {
              const element = document.getElementById(getElementTitleId(t.content));
              element?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center',
              });
            }}
          >
            {t.content}
          </button>
        );
      })}
    </div>
  );
};

export default TableOfContent;
