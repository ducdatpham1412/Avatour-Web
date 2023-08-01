import { IconNames, iconNames } from './iconNames';

export interface IconProps {
  name: IconNames;
  size?: number;
  color?: string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, size, color, className }) => {
  const IconBase = iconNames[name];
  return (
    <span className="contents" style={{ fontSize: size, color }}>
      <IconBase color={color} className={className} />
    </span>
  );
};
