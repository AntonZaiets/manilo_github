import React from "react";

type CircleButtonProps = {
  stylesTxt: React.CSSProperties;
  stylesBlock?: React.CSSProperties;
  content: string;
  icon: any;
};

export const CircleButton = (props: CircleButtonProps) => {
  return (
    <div className="circle_btn_block" style={props.stylesBlock}>
      <p className="left_txt_btn" style={props.stylesTxt}>
        {props.content}
      </p>
      <button className="circle_btn">
        <div className="diagonal_arrow_bigger">{props.icon}</div>
      </button>
    </div>
  );
}
