import * as React from "react";
const Trash = (props) => (
  <svg
    fill="#999999"
    width={24}
    height={24}
    viewBox="-10 -7 50 50"
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <title>{"trash-solid"}</title>
    <path
      className="clr-i-solid clr-i-solid-path-1"
      d="M6,9V31a2.93,2.93,0,0,0,2.86,3H27.09A2.93,2.93,0,0,0,30,31V9Zm9,20H13V14h2Zm8,0H21V14h2Z"
    />
    <path
      className="clr-i-solid clr-i-solid-path-2"
      d="M30.73,5H23V4A2,2,0,0,0,21,2h-6.2A2,2,0,0,0,13,4V5H5A1,1,0,1,0,5,7H30.73a1,1,0,0,0,0-2Z"
    />
    <rect x={0} y={0} width={36} height={36} fillOpacity={0} />
  </svg>
);
export default Trash;
