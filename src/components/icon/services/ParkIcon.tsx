import { SVGAttributes } from 'react';

type SVGProps = SVGAttributes<SVGElement>;

const ParkIcon = (props: SVGProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      // strokeWidth={1.5}
      d="M12 16v5m0-5a5 5 0 1 1-4.964-8.6 5 5 0 0 1 9.928 0A5.001 5.001 0 1 1 12 16Zm-3 5h6"
    />
  </svg>
);
export default ParkIcon;
