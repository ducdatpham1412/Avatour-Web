const MuseumIcon = ({ size = 24, ...rest }: BaseIconProps) => (
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
      d="M3 21h18M3 18h18M6 18v-5m4 5v-5m4 5v-5m4 5v-5m3-3-6.874-6.11c-.752-.669-1.128-1.003-1.553-1.13a2 2 0 0 0-1.146 0c-.425.127-.8.461-1.553 1.13L3 10h18Z"
    />
  </svg>
);
export default MuseumIcon;
