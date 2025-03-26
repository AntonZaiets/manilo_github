import * as React from "react";

export const Phone = ({ ...rest }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="35"
      height="35"
      viewBox="0 0 24 24"
      fill="none"
      {...rest}
    >
      <path
        fillRule="nonzero"
        fill="currentColor"
        d="M9.762 1.322l2.843-1.322 4.041 7.89-2.725 1.341c-.537 1.259 2.159 6.289 3.297 6.372.09-.058 2.672-1.328 2.672-1.328l4.11 7.933s-2.764 1.354-2.854 1.396c-7.861 3.59-19.101-18.259-11.384-22.282zm1.929 1.274l-1.023.504c-5.293 2.762 4.178 21.185 9.648 18.686l.972-.474-2.271-4.383-1.026.5c-3.163 1.547-8.262-8.219-5.055-9.938l1.007-.497-2.252-4.398zm-.759 18.382c-1.474 1.442-3.914 1.708-4.604.522-.47-.809-.311-1.728-.127-2.793.201-1.161.429-2.478-.295-3.71-1.219-2.077-3.897-1.983-5.906-.671l.956 1.463c.829-.542 1.784-.775 2.493-.609 1.653.388 1.151 2.526 1.03 3.229-.212 1.223-.45 2.61.337 3.968 1.331 2.294 5.054 2.047 7.29-.091-.397-.407-.789-.84-1.174-1.308z"
      />
    </svg>
  );
};
