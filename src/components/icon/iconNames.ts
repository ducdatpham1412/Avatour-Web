import ArrowLeftIcon from './ArrowLeftIcon';
import CloseIcon from './CloseIcon';
import EditIcon from './EditIcon';
import HomeIcon from './HomeIcon';
import ImageIcon from './ImageIcon';
import LoadingIcon from './LoadingIcon';
import LogoIcon from './LogoIcon';
import MailIcon from './MailIcon';
import MoneyIcon from './MoneyIcon';
import QuestionIcon from './QuestionIcon';
import TransactionActive from './TransactionActive';
import MuseumIcon from './MuseumIcon';
import StarIcon from './StarIcon';
import ArrowUpIcon from './ArrowUpIcon';
import ClockIcon from './ClockIcon';
import MarkerIcon from './MarkerIcon';

export const iconNames = {
  edit: EditIcon,
  'arrow-left': ArrowLeftIcon,
  close: CloseIcon,
  image: ImageIcon,
  mail: MailIcon,
  question: QuestionIcon,
  loading: LoadingIcon,
  home: HomeIcon,
  money: MoneyIcon,
  logo: LogoIcon,
  'transaction-active': TransactionActive,
  museum: MuseumIcon,
  star: StarIcon,
  clock: ClockIcon,
  'arrow-up': ArrowUpIcon,
  marker: MarkerIcon,
} as const;

export type IconNames = keyof typeof iconNames;
