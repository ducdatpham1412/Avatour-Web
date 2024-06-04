
import Link from 'next/link';

import LogoIcon from '@/components/icon/LogoIcon';

const Navbar = () => (
    <nav className="flex top-0 left-0 w-full items-center justify-between h-[68px] px-[20px] sm:px-[50px]">
      <Link href="/">
        <LogoIcon className="w-[142px] h-[36px]" />
      </Link>
      <div>
        <Link href="/">Về chúng tôi</Link>
      </div>
    </nav>
  );

export default Navbar;
