import { SVGAttributes } from 'react';

type SVGProps = SVGAttributes<SVGElement>;

const CreativeIcon = (props: SVGProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      // strokeWidth={1.5}
      d="M15.5 8.5h.01m-5.01-1h.01m-3.01 4h.01M12 21a9 9 0 1 1 9-9 3 3 0 0 1-3 3h-.6c-.372 0-.557 0-.713.025a2 2 0 0 0-1.662 1.662c-.025.156-.025.341-.025.713v.6a3 3 0 0 1-3 3Zm4-12.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm-5-1a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm-3 4a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"
    />
  </svg>
);
export default CreativeIcon;
