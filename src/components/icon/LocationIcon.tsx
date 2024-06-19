const LocationIcon = ({ size = 20, color = '#110B0B' }: BaseIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.0013 17.5C12.918 14.5 15.8346 11.8137 15.8346 8.5C15.8346 5.18629 13.223 2.5 10.0013 2.5C6.77964 2.5 4.16797 5.18629 4.16797 8.5C4.16797 11.8137 7.08464 14.5 10.0013 17.5Z"
        stroke="#9A9A9A"
        stroke-width="1.25"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.0013 10.8333C11.382 10.8333 12.5013 9.71404 12.5013 8.33333C12.5013 6.95262 11.382 5.83333 10.0013 5.83333C8.62059 5.83333 7.5013 6.95262 7.5013 8.33333C7.5013 9.71404 8.62059 10.8333 10.0013 10.8333Z"
        stroke="#9A9A9A"
        stroke-width="1.25"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default LocationIcon;
