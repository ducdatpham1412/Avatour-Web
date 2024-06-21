const OtherBackpackIcon = ({ size = 24, ...rest }: BaseIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    {...rest}
  >
    <g>
      <path
        fill="#D9D9D9"
        d="M5 16.414C5 18.947 7.149 21 9.8 21H17c2.21 0 4-1.728 4-3.86 0-1.583-.987-3.044-2.4-3.64-.15-2.51-2.325-4.5-4.987-4.5A5.057 5.057 0 0 0 9 12c-2.4.375-4 2.314-4 4.414Z"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        // strokeWidth={1.5}
        d="M7.455 2v1m3.889.61-.707.708m-6.364 6.364-.707.707M1.956 7.5h1m.61-3.89.708.708M6.5 9.213a2.004 2.004 0 0 1-1.045-1.758A2 2 0 0 1 9.403 7M9.8 21C7.149 21 5 18.947 5 16.414c0-2.1 1.6-4.039 4-4.414a5.057 5.057 0 0 1 4.613-3c2.662 0 4.837 1.99 4.987 4.5 1.413.596 2.4 2.057 2.4 3.64 0 2.132-1.79 3.86-4 3.86H9.8Z"
      />
    </g>
  </svg>
);

export default OtherBackpackIcon;
