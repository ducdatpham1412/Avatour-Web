import { useMemo } from 'react';

import { Icon } from './icon';

export interface PaginationProps {
  total: number;
  page: number;
  onPageChange?: (e: number) => void;
}

export const Pagination = ({ total, page, onPageChange }: PaginationProps) => {
  const renderPages = useMemo(() => {
    let listPage: Array<number | string> = [];
    if (total <= 6) {
      listPage = [1, 2, 3, 4, 5, 6];
    } else {
      listPage = [page];
      if (page > 1) {
        listPage = [page - 1, ...listPage];
      }

      if (page > 2) {
        listPage = [page - 2, ...listPage];
      }

      if (page < total - 1) {
        listPage.push(page + 1);
      }

      if (page < total - 2) {
        listPage.push(page + 2);
      }

      if (listPage.at(-1) != total) {
        listPage.push('...', total);
      }
    }

    return listPage.map(index => (
      <button
        className={`w-[65px] font-[800] hover:underline cursor-pointer ${
          page == index ? 'text-[#185BC3]' : 'text-[#9A9A9A]'
        }`}
        key={index}
        onClick={() => {
          console.log('?', index);
          if (typeof index === 'number') {
            onPageChange && onPageChange(index);
          }
        }}
        disabled={typeof index === 'string'}
      >
        {index}
      </button>
    ));
  }, [page, total]);

  return (
    <div className="flex items-center w-full justify-center">
      <button className="w-[60px] h-[60px] mr-3 flex items-center justify-center rounded-full cursor-pointer">
        <Icon name="arrow-left" />
      </button>
      {renderPages}
      <button className="w-[60px] h-[60px] ml-3 rotate-[180deg] flex items-center justify-center  rounded-full cursor-pointer">
        <Icon name="arrow-left" />
      </button>
    </div>
  );
};
