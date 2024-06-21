const CloseIcon = ({ className, color = '#9A9A9A', size = 16 }: BaseIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width={size}
    height={size}
    viewBox="0 0 23 23"
    fill="none"
  >
    <path
      d="M3.17703 21.8491L1.10156 19.7736L9.40345 11.4717L1.10156 3.16983L3.17703 1.09436L11.4789 9.39625L19.7808 1.09436L21.8563 3.16983L13.5544 11.4717L21.8563 19.7736L19.7808 21.8491L11.4789 13.5472L3.17703 21.8491Z"
      fill={color}
    />
  </svg>
);

export default CloseIcon;
