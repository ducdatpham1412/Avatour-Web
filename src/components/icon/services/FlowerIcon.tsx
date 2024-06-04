import { SVGAttributes } from 'react';

type SVGProps = SVGAttributes<SVGElement>;

const FlowerIcon = (props: SVGProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M21 9a4.993 4.993 0 0 0-4.02 2.025M21 6a7.982 7.982 0 0 0-6.057 2.773M21 3a10.99 10.99 0 0 0-9.23 5.014m0 0c-2.043.148-3.767 1.475-4.52 3.236C4.7 11.656 3 13.757 3 16.032 3 18.776 5.283 21 8.1 21h7.65c2.347 0 4.25-1.872 4.25-4.181 0-1.715-1.049-3.299-2.55-3.944a5.041 5.041 0 0 0-.47-1.85m-5.21-3.011a5.384 5.384 0 0 1 3.173.76m0 0a5.24 5.24 0 0 1 2.038 2.251"
    />
  </svg>
);
export default FlowerIcon;
