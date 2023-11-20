import ArrowLeftIcon from './ArrowLeftIcon';
import CloseIcon from './CloseIcon';
import EditIcon from './EditIcon';
import HomeIcon from './HomeIcon';
import ImageIcon from './ImageIcon';
import LoadingIcon from './LoadingIcon';
import LogoIcon from './LogoIcon';
import MailIcon from './MailIcon';
import MoneyIcon from './MoneyIcon';
import TransactionActive from './TransactionActive';

export const iconNames = {
  edit: EditIcon,
  'arrow-left': ArrowLeftIcon,
  close: CloseIcon,
  image: ImageIcon,
  mail: MailIcon,
  loading: LoadingIcon,
  home: HomeIcon,
  money: MoneyIcon,
  logo: LogoIcon,
  'transaction-active': TransactionActive,
} as const;

export type IconNames = keyof typeof iconNames;
