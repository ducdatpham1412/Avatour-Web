import { Skeleton } from '@/components/ui';

const TransactionItemSkeleton = () => (
  <tr className="h-[70px] [&>td>div]:!h-[58px] cursor-pointer">
    <td className="bg-white rounded-[30px_0_0_30px]">
      <div className="flex items-center gap-1 min-h-[40px] p-[0_10px]">
        <span className="text-center inline-block w-full font-bold">
          <Skeleton className="w-[100px] h-[22px]" />
        </span>
      </div>
    </td>
    <td className="bg-white">
      <div className="flex items-center min-h-[40px] p-[0_10px] border-l-[1px] gap-2">
        <Skeleton className="w-[32px] h-[32px] rounded-full" />
        <Skeleton className="w-[100px] h-[22px]" />
      </div>
    </td>
    <td className="bg-white">
      <div className="flex flex-col justify-center items-start min-h-[40px] p-[0_10px] border-l-[1px]">
        <span>
          <Skeleton className="w-[100px] h-[22px]" />
        </span>
      </div>
    </td>
    <td className="bg-white">
      <div className="flex flex-col justify-center items-start min-h-[40px] p-[0_10px] border-l-[1px]">
        <span>
          <Skeleton className="w-[100px] h-[22px]" />
        </span>
      </div>
    </td>
    <td className="bg-white">
      <div className="flex flex-col justify-center items-start min-h-[40px] p-[0_10px] border-l-[1px]">
        <span>
          <Skeleton className="w-[100px] h-[22px]" />
        </span>
      </div>
    </td>

    <td className="bg-white">
      <div className="flex items-center min-h-[40px] p-[0_10px] border-l-[1px]">
        <Skeleton className="w-[100px] h-[22px]" />
      </div>
    </td>

    <td className="bg-white rounded-[0_30px_30px_0]">
      <div className="flex items-center min-h-[40px] p-[0_10px] ">
        <span>
          <Skeleton className="w-[130px] h-[30px]" />
        </span>
      </div>
    </td>
  </tr>
);

export default TransactionItemSkeleton;
