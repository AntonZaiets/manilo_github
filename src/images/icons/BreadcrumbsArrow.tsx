import * as React from "react";

export const BreadcrumbsArrow = ({
  ...rest
}: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="34"
      height="14"
      viewBox="0 0 34 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      {...rest}
    >
      <path
        fill="currentColor"
        d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z"
      />
    </svg>
  );
};
