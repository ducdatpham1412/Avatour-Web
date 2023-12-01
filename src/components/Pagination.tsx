'use client';
import { useEffect, useMemo } from 'react';

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
      listPage = Array.from({ length: total }, (_, index) => index + 1);
    } else {
      listPage = [page];
      if (page > 1) {
        listPage = [page - 1, ...listPage];
      }

      if (page > 2) {
        listPage = [page - 2, ...listPage];
      }

      if (page <= total - 1) {
        listPage.push(page + 1);
      }

      if (page <= total - 2) {
        listPage.push(page + 2);
      }

      if (listPage.length < 5 && page <= total - 3) {
        listPage.push(page + 3);
      }

      if (listPage.length < 5 && page <= total - 4) {
        listPage.push(page + 4);
      }

      if (listPage.length < 5 && page > 4) {
        listPage.unshift(page - 4);
      }

      if (listPage.length < 5 && page > 3) {
        listPage.unshift(page - 3);
      }
    }

    if (total === 0) {
      return <div className="text-gray/80">...</div>;
    }

    return listPage.map((v, index) => (
      <button
        className={`w-[48px] font-700 hover:underline cursor-pointer ${
          page == v ? 'text-[#4527ce]' : 'text-[#9A9A9A]'
        }`}
        key={index}
        onClick={() => {
          if (typeof v === 'number') {
            onPageChange && onPageChange(v);
          }
        }}
        disabled={typeof v === 'string'}
      >
        {v}
      </button>
    ));
  }, [page, total, onPageChange]);

  useEffect(() => {
    if (page > total && total > 0) {
      onPageChange?.(total);
    }
  }, [page, total, onPageChange]);

  return (
    <div className="flex items-center w-full justify-center">
      <button
        disabled={page <= 1}
        className="w-[60px] h-[60px] mr-3 flex items-center justify-center rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-default"
      >
        <Icon name="arrow-left" />
      </button>
      {renderPages}
      <button
        disabled={page >= total}
        className="w-[60px] h-[60px] ml-3 rotate-[180deg] flex items-center justify-center  rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-default"
      >
        <Icon name="arrow-left" />
      </button>
    </div>
  );
};
