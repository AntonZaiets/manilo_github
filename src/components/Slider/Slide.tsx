import React, { useContext } from "react";
import { SliderContext } from "./index";
import "./style.scss";

interface ISlideData {
  index: number;
  url: string;
  title: string;
}

export const SlidesList = () => {
  const { slideNumber, items } = useContext(SliderContext);

  return (
    <div
      className="slide-list"
      style={{ transform: `translateX(-${slideNumber * 100}%)` }}
    >
      {items.map((slide: ISlideData, index: number) => (
        <Slide key={index} data={slide} />
      ))}
    </div>
  );
};

export const Slide = (props: { data: ISlideData }) => {
  const { data } = props;
  return (
    <div className="slide">
      <img
        src={data.url}
        alt={data.url}
        className="slide-image"
        loading="lazy"
      />
    </div>
  );
};
