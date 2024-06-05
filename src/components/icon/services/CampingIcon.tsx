import { SVGAttributes } from 'react';

type SVGProps = SVGAttributes<SVGElement>;

const CampingIcon = (props: SVGProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      // strokeWidth={1.5}
      d="M15 3 3 19v2h18v-2L9 3m3 12 4 6H8l4-6Z"
    />
  </svg>
);
export default CampingIcon;
