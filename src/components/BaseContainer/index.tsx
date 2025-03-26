import React from "react";
import { Footer, Head, IStyledChildrenProps, ModalManager } from "components";

export const BaseContainer: React.FC<IStyledChildrenProps<any>> = ({
  children,
  ...props
}) => {
  return (
    <>
      <ModalManager />
      <Head />
      <div {...props}>{children}</div>
      <Footer />
    </>
  );
};
