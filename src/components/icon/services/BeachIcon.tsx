const BeachIcon = ({ size = 24, ...rest }: BaseIconProps) => (
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
      d="M19.328 16A4.496 4.496 0 0 0 21 12.497c0-1.847-1.11-3.552-2.7-4.247C18.132 5.323 15.684 3 12.69 3 10.35 3 8.346 4.486 7.5 6.5 4.8 6.938 3 9.2 3 11.65c0 1.511.633 2.877 1.65 3.85M8 18v2m0-8v2m4 5v2m4-3v2m0-8v2m-4-1v2"
    />
  </svg>
);

export default BeachIcon;
