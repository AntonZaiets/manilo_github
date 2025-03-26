import * as React from "react";

export const User = ({ ...rest }: React.SVGProps<SVGSVGElement>) => (
  <svg width="35" height="35" viewBox="-1 -1 20 20" {...rest}>
    <path
      fill="currentColor"
      d="M12.071091,9.99878717 C14.7925198,10.9161942 16.75,13.4208126 16.75,16.375 L15.25,16.375 C15.25,13.4817308 12.8059829,11.125 9.77777778,11.125 L8.22222222,11.125 C5.19401714,11.125 2.75,13.4817308 2.75,16.375 L1.25,16.375 C1.25,13.4208126 3.20748023,10.9161942 5.92890901,9.99878717 C4.9018322,9.12749342 4.25,7.82736849 4.25,6.375 C4.25,3.75164744 6.37664744,1.625 9,1.625 C11.6233526,1.625 13.75,3.75164744 13.75,6.375 C13.75,7.82736849 13.0981678,9.12749342 12.071091,9.99878717 Z M9,3.125 C7.20507456,3.125 5.75,4.58007456 5.75,6.375 C5.75,8.16992544 7.20507456,9.625 9,9.625 C10.7949254,9.625 12.25,8.16992544 12.25,6.375 C12.25,4.58007456 10.7949254,3.125 9,3.125 Z"
      fillRule="nonzero"
    />
  </svg>
);
