import React from 'react';

interface Props {
  size?: number;
  className?: string;
}

const VoucherBackground = ({ size = 200, className }: Props) => {
  const height = (1288 / 2044) * size;

  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 2044 1288"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clip-path="url(#clip0_1017_1108)">
        <path
          d="M-141.17 1292.51H2119.71V0.338867H-141.17V1292.51Z"
          fill="url(#paint0_linear_1017_1108)"
        />
        <path
          d="M398.749 1326.33C398.749 1326.33 876.365 1015.01 800.112 869.111C708.998 694.769 113.643 988.339 -211.143 677.85V1326.34L398.749 1326.33Z"
          fill="url(#paint1_linear_1017_1108)"
        />
        <path
          opacity="0.2"
          d="M-211.143 356.647C-211.143 356.647 329.042 685.239 298.609 849.805C260.2 1057.49 1.25592 869.18 -211.143 940.626V356.647Z"
          fill="#9CDCF9"
        />
        <path
          opacity="0.2"
          d="M1177.26 -106.442C1164.9 -94.165 1164.14 -68.4462 1155.92 -50.7799C1146.26 -30.0244 1131.23 -13.3323 1117.99 4.7964C1081.37 54.9206 1040.7 99.4529 979.1 121.353C766.857 196.805 466.617 5.75745 320.228 236.668C264.204 325.04 259.867 425.279 182.868 502.215C135.105 549.94 73.0219 569.199 5.95845 572.622C-139.162 580.028 -265.653 559.561 -399.533 502.129V-154.21L1177.26 -106.442Z"
          fill="#20AFF1"
          fill-opacity="0.66"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_1017_1108"
          x1="-416.828"
          y1="1029.98"
          x2="1995.03"
          y2="372.318"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#4EBFF3" />
          <stop offset="1" stop-color="#C5E7FF" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1017_1108"
          x1="1456.97"
          y1="233.067"
          x2="-94.5024"
          y2="1108"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.18" stop-color="#03A3ED" />
          <stop offset="1" stop-color="#89CCFB" />
        </linearGradient>
        <clipPath id="clip0_1017_1108">
          <rect width="2044" height="1288" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default VoucherBackground;
