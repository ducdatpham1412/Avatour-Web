import LogoIcon from '@/components/icon/LogoIcon';
import Link from 'next/link';

const Head = () => {
  return (
    <div className="flex absolute top-0 left-0 w-full items-center justify-between h-[68px] px-[20px] sm:px-[50px]">
      <div>
        <LogoIcon className="w-[142px] h-[36px]" />
      </div>
      <div>
        <Link href="/">Về chúng tôi</Link>
      </div>
    </div>
  );
};

export default Head;
