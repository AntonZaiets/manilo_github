import React, { ReactElement, useState } from "react";

type PropsType = {
  children: ReactElement;
  text: string;
};

export const ToolTip: React.FC<PropsType> = ({ children, text }) => {
  const [showToolTip, setShowToolTip] = useState(false);
  return <div className={"container"}>ToolTip-Component</div>;
};
