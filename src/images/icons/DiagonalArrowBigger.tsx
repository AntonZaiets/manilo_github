import * as React from "react";

export const DiagonalArrowBigger = (props: any) => {
    return (
        <svg
            width="30px"
            height="30px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-arrow-up-right"
        >
            <line x1="7" y1="17" x2="17" y2="7"/>
            <polyline points="7 7 17 7 17 17"/>
        </svg>
    );
};
