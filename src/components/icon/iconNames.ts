import ArrowLeftIcon from './ArrowLeftIcon';
import ArrowUpIcon from './ArrowUpIcon';
import CalendarIcon from './CalendarIcon';
import ClockIcon from './ClockIcon';
import CloseIcon from './CloseIcon';
import EditIcon from './EditIcon';
import HomeIcon from './HomeIcon';
import ImageIcon from './ImageIcon';
import LoadingIcon from './LoadingIcon';
import LogoIcon from './LogoIcon';
import MailIcon from './MailIcon';
import MarkerIcon from './MarkerIcon';
import MoneyIcon from './MoneyIcon';
import MuseumIcon from './MuseumIcon';
import QuestionIcon from './QuestionIcon';
import SearchResultIcon from './SearchResultIcon';
import StarIcon from './StarIcon';
import TransactionActive from './TransactionActive';

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
  calendar: CalendarIcon,
  searchResult: SearchResultIcon,
} as const;

export type IconNames = keyof typeof iconNames;
