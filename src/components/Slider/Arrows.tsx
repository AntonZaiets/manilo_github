import React, { useContext } from "react";
import { SliderContext } from "./index";
import "./style.scss";
import { ArrowLeft, ArrowRight } from "images/icons";

export const Arrows = () => {
  const { changeSlide } = useContext(SliderContext);

  return <div className="arrows"></div>;
};
