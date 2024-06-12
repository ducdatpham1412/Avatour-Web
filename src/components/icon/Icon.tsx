import { IconNames, iconNames } from './iconNames';

export interface IconProps {
  name: IconNames;
  size?: number;
  color?: string;
  className?: string;
}

export const Icon = ({ name, size, color, className }: IconProps) => {
  const IconBase = iconNames[name];
  return (
    <span className="contents" style={{ fontSize: size, color }}>
      <IconBase color={color} className={className} />
    </span>
  );
};
