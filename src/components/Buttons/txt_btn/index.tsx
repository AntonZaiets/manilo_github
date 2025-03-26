import React from "react";

interface TxtButtonProps {
  styles?: React.CSSProperties;
  styleBlock?: React.CSSProperties;
  content: string;
  icon?: any;
  handleClick: () => void;
}

export const TxtButton = (props: TxtButtonProps) => {
  const { handleClick, icon, content, styles, styleBlock } = props;

  return (
    <div className="btn_under_img" style={styleBlock}>
      <button className="btn" style={styles} onClick={handleClick}>
        {content}
        {icon && <div className="diagonal_arrow">{icon}</div>}
      </button>
    </div>
  );
}
