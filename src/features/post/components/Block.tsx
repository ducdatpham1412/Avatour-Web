import { PropsWithChildren, ReactElement } from 'react';

interface BlockTextProps extends PropsWithChildren {
  title: string;
  RightHeader?: ReactElement;
}

const Block = ({ title, children, RightHeader }: BlockTextProps) => {
  return (
    <div className="w-full border-[1px] border-gray_300 rounded-md">
      <div className="w-full py-2 px-4 bg-gray_200 inline-flex flex-row justify-between items-center">
        <p className="font-medium text-[12px] rounded-md">{title}</p>
        {RightHeader ?? <div />}
      </div>
      {children}
    </div>
  );
};

export default Block;
