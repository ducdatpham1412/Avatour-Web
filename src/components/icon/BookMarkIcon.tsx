const BookMarkIcon = ({ size = 20, color = '#110B0B' }: BaseIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.16797 5.16667C4.16797 4.23325 4.16797 3.76654 4.34962 3.41002C4.50941 3.09641 4.76438 2.84144 5.07798 2.68166C5.4345 2.5 5.90121 2.5 6.83464 2.5H13.168C14.1014 2.5 14.5681 2.5 14.9246 2.68166C15.2382 2.84144 15.4932 3.09641 15.653 3.41002C15.8346 3.76654 15.8346 4.23325 15.8346 5.16667V17.5L10.0013 13.3333L4.16797 17.5V5.16667Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default BookMarkIcon;
