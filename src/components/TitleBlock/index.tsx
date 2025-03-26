import React from "react";
import "./style.scss";

interface IInfo {
  text?: string;
  titleFirst: string;
  titleSecond: string;
  titleThird?: string;
  background?: string;
  sizeText?: string;
  image?: string;
  imageSize?: string;
  style?: string;
}

export const TitleBlock = (props: IInfo) => {
  const { text, titleFirst, titleSecond, titleThird, style } = props;
  return (
    <div className={`titleBlock ${style ? style : ""}`}>
      <div className="container">
        <div className="title_block">
          <div className="title">
            <span className="title_first">{titleFirst}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
