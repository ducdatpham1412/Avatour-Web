import { CloseIcon } from './CloseIcon';
import { EditIcon } from './EditIcon';
import { HomeIcon } from './HomeIcon';
import { ImageIcon } from './ImageIcon';
import { LoadingIcon } from './LoadingIcon';
import { LogoIcon } from './LogoIcon';
import { MoneyIcon } from './MoneyIcon';
import { TransactionActive } from './TransactionActive';

export const iconNames = {
  edit: EditIcon,
  close: CloseIcon,
  image: ImageIcon,
  loading: LoadingIcon,
  home: HomeIcon,
  money: MoneyIcon,
  logo: LogoIcon,
  'transaction-active': TransactionActive,
} as const;

export type IconNames = keyof typeof iconNames;
