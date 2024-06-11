import { SVGAttributes } from 'react';

type SVGProps = SVGAttributes<SVGElement>;

const HistoryIcon = (props: SVGProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      // strokeWidth={1.5}
      d="M3 21h18M3 11h18M3 18h18M6 18v-4m4 4v-4m4 4v-4m4 4v-4m-6-7h4.84c.056 0 .084 0 .105-.01a.1.1 0 0 0 .044-.045C17 6.924 17 6.896 17 6.84V4.16c0-.056 0-.084-.01-.105a.1.1 0 0 0-.045-.044C16.924 4 16.896 4 16.84 4H12m0 7V3"
    />
  </svg>
);
export default HistoryIcon;
