import React from 'react';

interface IProps {
  isLoading: boolean;
}

export const PreLoader = ({ isLoading }: IProps) => {
  return (
    <>
      {isLoading && (
          <div id="preloader">
            <div id="loader"></div>
          </div>
      )}
    </>
  );
};
