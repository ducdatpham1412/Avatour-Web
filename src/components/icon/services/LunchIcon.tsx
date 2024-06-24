const LunchIcon = ({ size = 24, ...rest }: BaseIconProps) => (
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
      d="M8 21V3m3 0v5a3 3 0 0 1-6 0V3m10.5 10V3m0 10c-1.933 0-3.5 1.79-3.5 4s1.567 4 3.5 4 3.5-1.79 3.5-4-1.567-4-3.5-4Z"
    />
  </svg>
);

export default LunchIcon;
