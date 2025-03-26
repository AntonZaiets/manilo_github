import React, { useState, createContext } from "react";
import { Dots } from "./Dots";
import { SlidesList } from "./Slide";
import "./style.scss";
import "style/media.scss";

interface ISlider {
  width?: string;
  height?: string;
  autoPlay?: boolean;
  autoPlayTime?: number;
  sliderData: Array<{
    index: number;
    url: string;
    titleOne: string;
    titleTwo: string;
    contentInfo: Array<string>;
  }>;
}

interface IContextType {
  goToSlide: (number: number) => void;
  changeSlide: (number: number) => void;
  slidesCount: number;
  slideNumber: number;
  items: any;
}

export const SliderContext = createContext<IContextType>(null);

export const Slider = ({
  width,
  height,
  autoPlay = false,
  autoPlayTime = 5000,
  sliderData,
}: ISlider) => {
  const [items, setItems] = useState(sliderData);
  const [slide, setSlide] = useState(0);
  const [touchPosition, setTouchPosition] = useState(null);

  const changeSlide = (direction = 1) => {
    let slideNumber = 0;
    if (slide + direction < 0) {
      slideNumber = items.length - 1;
    } else {
      slideNumber = (slide + direction) % items.length;
    }
    setSlide(slideNumber);
  };

  const goToSlide = (number: number) => {
    setSlide(number % items.length);
  };

  const handleTouchStart = (e: any) => {
    const touchDown = e.touches[0].clientX;

    setTouchPosition(touchDown);
  };

  const handleTouchMove = (e: any) => {
    if (touchPosition === null) {
      return;
    }

    const currentPosition = e.touches[0].clientX;
    const direction = touchPosition - currentPosition;

    if (direction > 10) {
      changeSlide(1);
    }

    if (direction < -10) {
      changeSlide(-1);
    }

    setTouchPosition(null);
  };

  return (
    <div
      style={{ width, height }}
      className="slider_home"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <div className="slider_control slider_control__l">
        <a
          onClick={() => changeSlide(-1)}
          className="arrowed arrow-left"
          title="Next"
        />
      </div>
      <div className="slider_control slider_control__r">
        <a
          onClick={() => changeSlide(1)}
          className="arrowed arrow-right"
          title="Previous"
        />
      </div>
      <SliderContext.Provider
        value={{
          goToSlide,
          changeSlide,
          slidesCount: items.length,
          slideNumber: slide,
          items,
        }}
      >
        <div className="slider_container">
          <h1 className="slider_title title">Manilo</h1>
          <div className="slider_content flex relative">
            <div className="slider_content__block">
              {sliderData[slide].contentInfo.map((item) => (
                <p className="slider_phrases">- {item}</p>
              ))}
            </div>
          </div>
          <div className="slider_content">
            <div className="slider_product_link">
              <h2 className="slider_title slider_h2">
                «{items[slide].titleOne}
              </h2>
              <h2 className="slider_title slider_h2 left_m">
                {items[slide].titleTwo}»
              </h2>
            </div>
          </div>
          <div className="slider_dots__block">
            <Dots />
          </div>
        </div>
        <SlidesList />
      </SliderContext.Provider>
    </div>
  );
};
