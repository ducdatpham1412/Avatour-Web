import { Icon } from '../icon';

interface Props {
  onClick?: () => void;
}

const ButtonClose = ({ onClick }: Props) => {
  return (
    <div className="p-[10px] bg-white rounded-full border-[1px]" role="button" onClick={onClick}>
      <Icon name="close" size={22.6} />
    </div>
  );
};

export default ButtonClose;
