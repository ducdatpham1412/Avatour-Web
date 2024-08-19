import { ClassValue } from 'clsx';

import { cn } from '@/lib';

interface Props {
  bottomClassName?: ClassValue;
}

function BackgroundSun({ bottomClassName }: Props) {
  return (
    <div className="absolute w-full h-full min-h-full top-0 left-0 right-0 overflow-hidden">
      <svg
        viewBox="0 0 1440 268"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 sm:-top-16"
      >
        <path
          d="M1463.85 131.606C1427.1 195.355 1218.8 234.428 1093 175.834M200.009 -63.4151C-99.9848 -320.181 -267.542 -29.5902 -420.136 62.7866"
          stroke="#FBBD05"
          stroke-width="1.2"
          stroke-dasharray="10.7 10.7"
        />
        <path
          d="M-420.136 62.7864C-267.542 -29.5903 -99.9845 -320.181 200.009 -63.4152C494.563 188.695 690.02 165.228 825 130.63"
          stroke="#FBBD05"
          stroke-width="1.2"
          stroke-dasharray="10.7 10.7"
        />

        <g opacity="0.7">
          <ellipse cx="997" cy="-45.419" rx="238" ry="237.581" fill="#FBBD05" fill-opacity="0.1" />
          <ellipse
            cx="997.155"
            cy="-33.2641"
            rx="206.155"
            ry="205.736"
            fill="#FBBD05"
            fill-opacity="0.4"
          />
          <circle cx="997.275" cy="-22.7251" r="174.275" fill="#FBBD05" fill-opacity="0.6" />
          <circle cx="996.715" cy="-4.28482" r="135.715" fill="#FBBD05" fill-opacity="0.8" />
        </g>
      </svg>

      <div
        className={cn(
          'absolute min-w-[600px] sm:min-w-fit left-[calc((100vw_-_600px)/2)] sm:left-0 sm:right-0',
          bottomClassName,
        )}
      >
        <div className="absolute left-1/4 bottom-0 -translate-x-1/2 w-[min(40%,_604px)]">
          {centerBottomIcon}
        </div>
      </div>
    </div>
  );
}

const centerBottomIcon = (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 664 231"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g opacity="0.7">
      <circle cx="331.908" cy="331.218" r="189.19" fill="#FBBD05" fillOpacity="0.8" />
      <circle cx="331.911" cy="331.215" r="242.943" fill="#FBBD05" fillOpacity="0.6" />
      <ellipse cx="331.777" cy="331.193" rx="287.384" ry="286.8" fill="#FBBD05" fillOpacity="0.4" />
      <ellipse
        cx="331.777"
        cy="331.193"
        rx="331.777"
        ry="331.193"
        fill="#FBBD05"
        fillOpacity="0.1"
      />
    </g>
  </svg>
);

export default BackgroundSun;
