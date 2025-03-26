import React, { useContext } from "react";
import { SliderContext } from "./index";
import "./style.scss";

export const Dots = () => {
  const { slidesCount } = useContext(SliderContext);

  const renderDots = () => {
    const dots = [];
    for (let i = 0; i < slidesCount; i++) {
      dots.push(<Dot key={`dot-${i}`} number={i} />);
    }

    return dots;
  };

  return <div className="dots">{renderDots()}</div>;
};

const Dot = ({ number, key }: { number: number; key: string }) => {
  const { goToSlide, slideNumber } = useContext(SliderContext);

  return (
    <div className="dots_block" onClick={() => goToSlide(number)}>
      <div className={`dot ${slideNumber === number ? "selected" : ""}`} />
    </div>
  );
};
