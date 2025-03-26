import React, { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "images/icons";
import { BASE_URL_BACK } from "axio";
import { useSelector } from "react-redux";
import { selectProduct } from "store/productSlice";
// @ts-ignore
import loading from "images/loading.png";
import "./style.scss";
import { useMediaQuery } from "utils";

interface ProductSliderBlock {
  styleSlider?: any;
  time: number;
}
export const ProductSlider = ({ styleSlider, time }: ProductSliderBlock) => {
  const { data } = useSelector(selectProduct);
  const { images } = data || {};
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFullScreen, setShowFullScreen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const getHead = document.getElementById("header");
    if (showFullScreen && !isMobile) {
      // @ts-ignore
      getHead.style.display = "none";
    } else if (!showFullScreen && !isMobile) {
      getHead.style.display = "flex";
    }
  }, [showFullScreen]);

  const plusIndex = () => {
    setCurrentIndex((currentIndex + 1) % images?.length);
  };
  const minusIndex = () => {
    setCurrentIndex((currentIndex - 1 + images?.length) % images?.length);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % images?.length);
    }, time);

    return () => clearInterval(interval);
  }, [currentIndex, images]);

  const handleImageClick = () => {
    setShowFullScreen(true);
  };

  const handleCloseFullScreen = () => {
    setShowFullScreen(false);
  };

  if (images) {
    return (
      <div>
        <div className="product_slider">
          <img
            className="slider_image__loading"
            style={styleSlider}
            src={loading}
          />
          <img
            className="slider_image"
            style={styleSlider}
            src={images[currentIndex]}
            onClick={handleImageClick}
          />
          {images.length > 1 && (
            <>
              <button className="plus_btn" onClick={plusIndex}>
                <ArrowRight />
              </button>
              <button className="minus_btn" onClick={minusIndex}>
                <ArrowLeft />
              </button>
            </>
          )}
          <h1>
            {currentIndex + 1}/{images.length}
          </h1>
        </div>
        {showFullScreen && !isMobile && (
          <div
            className="fullscreen-overlay active"
            onClick={handleCloseFullScreen}
          >
            <img
              className="centered-image"
              src={images[currentIndex]}
              alt="Full Screen"
            />
          </div>
        )}
      </div>
    );
  }

  return null;
};

const ImagePlaceholder = ({
  src,
  placeholderImg,
  errorImg,
  className,
  ...props
}: any) => {
  const [imgSrc, setSrc] = useState(placeholderImg || src);

  const onLoad = useCallback(() => {
    setSrc(src);
  }, [src]);

  const onError = useCallback(() => {
    setSrc(errorImg || placeholderImg);
  }, [errorImg, placeholderImg]);

  useEffect(() => {
    const img = new Image();
    img.src = src as string;
    img.addEventListener("load", onLoad);
    img.addEventListener("error", onError);
    return () => {
      img.removeEventListener("load", onLoad);
      img.removeEventListener("error", onError);
    };
  }, [src, onLoad, onError]);

  return <img className={className} {...props} alt={imgSrc} src={imgSrc} />;
};
