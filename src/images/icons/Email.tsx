import * as React from "react";

export const Email = ({ ...rest }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="35"
      height="35"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      {...rest}
    >
      <path
        fillRule="nonzero"
        fill="currentColor"
        d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"
      />
    </svg>
  );
};
