import * as React from "react";
const Comment = (props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15.1216 5.5H8.86528C7.28806 5.5 6 6.74051 6 8.25949V12.8401C6 14.3591 7.28806 15.5996 8.86528 15.5996H9.75904C9.74589 16.0933 9.66703 16.7389 9.39102 17.4224C9.25958 17.7389 9.35159 18.0933 9.6276 18.3085C9.78532 18.4351 9.96933 18.4984 10.1665 18.4984C10.2979 18.4984 10.4425 18.4604 10.5739 18.3971C11.9277 17.6629 13.0712 16.3718 13.6889 15.587H15.1347C16.7119 15.587 18 14.3465 18 12.8275V8.25949C18.0002 6.74051 16.7117 5.5 15.1216 5.5Z"
      fill="#8A8A8A"
    />
    <path
      d="M15 8.5H9.49999C9.32137 8.5 9.1563 8.59526 9.06699 8.74996C8.97767 8.90465 8.97767 9.09534 9.06699 9.25004C9.1563 9.40474 9.32136 9.5 9.49999 9.5H15C15.1786 9.5 15.3437 9.40474 15.433 9.25004C15.5223 9.09535 15.5223 8.90466 15.433 8.74996C15.3437 8.59526 15.1786 8.5 15 8.5Z"
      fill="white"
      className="white"
    />
    <path
      d="M15 12H9.49999C9.32137 12 9.1563 12.0953 9.06699 12.25C8.97767 12.4047 8.97767 12.5953 9.06699 12.75C9.1563 12.9047 9.32136 13 9.49999 13H15C15.1786 13 15.3437 12.9047 15.433 12.75C15.5223 12.5953 15.5223 12.4047 15.433 12.25C15.3437 12.0953 15.1786 12 15 12Z"
      fill="white"
      className="white"
    />
  </svg>
);
export default Comment;
