const CafeIcon = ({ size = 24, ...rest }: BaseIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    {...rest}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      // strokeWidth={1.5}
      d="M18.5 7h.5c.465 0 .697 0 .89.038a2 2 0 0 1 1.572 1.572c.038.193.038.425.038.89s0 .697-.038.89a2 2 0 0 1-1.572 1.572C19.697 12 19.465 12 19 12h-.5M3 20h18m-9-3c-1.395 0-2.092 0-2.667-.138a5 5 0 0 1-3.695-3.695C5.5 12.592 5.5 11.895 5.5 10.5V7.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C7.02 4 7.58 4 8.7 4h6.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874c.218.428.218.988.218 2.108v3.3c0 1.395 0 2.092-.138 2.667a5 5 0 0 1-3.695 3.695C14.092 17 13.395 17 12 17Z"
    />
  </svg>
);

export default CafeIcon;
