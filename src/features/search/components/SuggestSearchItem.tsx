import Link from 'next/link';

const SuggestSearchItem = ({ children }: { children: string }) => (
  <Link
    href={`/search/${typeof children === 'string' ? encodeURIComponent(children) : ''}`}
    className="bg-gray_200 rounded-full text-black p-[8px_16px] md:p-[6px_16px] text-[13px] leading-[20px] md:text-[14px] md:leading-[24px] font-normal"
  >
    {children}
  </Link>
);

export default SuggestSearchItem;
