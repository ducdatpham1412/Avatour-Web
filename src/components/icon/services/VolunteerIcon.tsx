import { SVGAttributes } from 'react';

type SVGProps = SVGAttributes<SVGElement>;

const VolunteerIcon = (props: SVGProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      // strokeWidth={1.5}
      d="M10.5 21H4a7.001 7.001 0 0 1 6-6.93m6.498 2.142c-.7-.78-1.867-.989-2.744-.275-.877.713-1 1.906-.311 2.75.388.476 1.312 1.311 2.042 1.948.347.302.52.453.73.515.178.053.387.053.566 0 .21-.061.382-.213.729-.515.73-.637 1.654-1.472 2.043-1.948.688-.844.58-2.044-.312-2.75-.892-.706-2.044-.504-2.743.275ZM15 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
    />
  </svg>
);
export default VolunteerIcon;
