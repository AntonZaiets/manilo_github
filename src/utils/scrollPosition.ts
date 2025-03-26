import { useEffect, useState } from "react";

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset);
    };
    window.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return scrollPosition;
};

window.onload = function () {
  const parallax = document.querySelector(
    ".parallax"
  ) as HTMLInputElement | null;

  if (parallax) {
    const content = document.querySelector(
      ".who-we-are__image"
    ) as HTMLInputElement | null;

    // const sloganFirst = document.querySelector(
    //   ".slogan_first"
    // ) as HTMLInputElement | null;
    // const sloganSecond = document.querySelector(
    //   ".slogan_second"
    // ) as HTMLInputElement | null;
    // const sloganThird = document.querySelector(
    //   ".slogan_third"
    // ) as HTMLInputElement | null;

    const forClouds = 40;
    const forMountains = 40;
    const forHuman = 40;

    const speed = 0.2;

    let positionX = 0;
    let positionY = 0;
    let coordXprocent = 0;
    let coordYprocent = 0;

    function setMouseParallaxStyle() {
      const distX = coordXprocent - positionX;
      const distY = coordYprocent - positionY;

      positionX = positionX + distX * speed;
      positionY = positionY + distY * speed;

      //передаєм стилі
      // content.style.cssText = `transform: translate(${positionX / forClouds}%`;
      // sloganFirst.style.cssText = `transform: translate(${
      //   positionX / forClouds
      // }%, ${(positionY / forClouds) * 7}%)`;
      //
      // sloganSecond.style.cssText = `transform: translate(${
      //   -positionX / forClouds
      // }%, ${(-positionY / forClouds) * 10}%)`;
      //
      // sloganThird.style.cssText = `transform: translate(${
      //   positionX / forClouds
      // }%, ${(positionY / forClouds) * 7}%)`;

      requestAnimationFrame(setMouseParallaxStyle);
    }
    setMouseParallaxStyle();

    parallax.addEventListener("mousemove", function (e) {
      //ширина і висота блоку
      const parallaxWidth = parallax.offsetWidth;
      const parallaxHeight = parallax.offsetHeight;

      //нуль по середині
      const coordX = e.pageX - parallaxWidth / 2;
      const coordY = e.pageY - parallaxHeight / 2;

      //отримуєм відсотки
      coordXprocent = (coordX / parallaxWidth) * 100;
      coordYprocent = (coordY / parallaxHeight) * 100;
    });

    const thresholdSets = [0, 0.2, 0.5, 1];
    for (let i = 0; i <= 0.1; i += 0.0005) {
      thresholdSets.push(i);
    }

    const options = {
      //root: document.querySelector(".parallax"), // я закомментил строку, чтобы использовать значение по умолчанию
      //rootMargin: "0px",
      threshold: thresholdSets,
      intersectionRatio: 0,
    };

    //при скролі паралакс

    const callback = function () {
      const scrollTopProcent =
        (window.pageYOffset / parallax.offsetHeight) * 100;

      //console.log("window.pageYOffset", scrollTopProcent);

      setParallaxItemsStyle(scrollTopProcent);
    };

    const observer = new IntersectionObserver(callback, options);
    const ticker = document.querySelector(".ticker") as HTMLInputElement | null;

    observer.observe(ticker);

    function setParallaxItemsStyle(scrollTopProcent: number) {
      //ticker.style.cssText = `transform: translate(${50 - scrollTopProcent}%)`;
    }
  }
};
