import React, { useState } from "react";
import { Ticker, Slogan, Slider, TxtButton, ToTopButton } from "components";
import { InstagramBlock } from "components/InstagramBlock";
import slide1 from "images/slide1.jpg";
import slide2 from "images/slide2.jpg";
import slide3 from "images/slide3.jpg";
import aboutImg from "images/about3.jpg";
import "./style.scss";

const sliderData = [
  {
    index: 1,
    url: slide1,
    titleOne: "made in",
    titleTwo: "Ukraine",
    contentInfo: ["Європейська якість", "Ретельний підхід"],
  },
  {
    index: 2,
    url: slide2,
    titleOne: "перелік",
    titleTwo: "одягу",
    contentInfo: ["Комплекти для дому та сну", "білизна", "сукні", "халати"],
  },
  {
    index: 3,
    url: slide3,
    titleOne: "індивідуальний",
    titleTwo: "пошив",
    contentInfo: ["Український виробник", "Ретельний підхід", "Ручна робота"],
  },
];

export const Home = () => {
  return (
    <div className="parallax">
      <Slider sliderData={sliderData} />
      <Ticker
        leftText="Зроблено в Україні"
        logo="manilo_with_love"
        rightText="Жіночий одяг"
      />
      <AboutUs />
      <Ticker
        leftText="Зроблено з коханням"
        logo="manilo_with_love"
        rightText="Жіноча білизна"
      />
      <Slogan />
    </div>
  );
};

const AboutUs = () => {
  const [isFullText, setFullText] = useState(false);

  return (
    <div className="about container" id="about">
      <ToTopButton />
      <div className="about_content">
        <div className="about_left">
          <div className="about_year">Початок виробництва 2020</div>
          <div className="about_title__wrapper">
            <div className="about_title">
              Про —
              <br />{" "}
              <span className="about_title about_title__second">Бренд</span>
            </div>
          </div>
        </div>
        <div className="about_center">
          <div className="image_wrapper">
            <img
              src={aboutImg}
              alt="Костюм GOD est eternity"
              className="who-we-are__image"
            />
          </div>
        </div>
        <div className="about_right">
          <div className="about_title">Нам є що сказати тобі...</div>
          <div className="about_description">
            Ти знаєш, що ти особлива? Ми точно знаємо. що Ти тут не дарма, кожна
            жінка за своєю суттю королева, цариця, і вона хоче бути впевненою та
            жіночною, милою та ніжною, іноді пристрасною та яскравою. Ми хочемо
            Тобі в цьому допомогти, і довести, що твоє красиве тіло завжди не
            дивлячись на стереотипи суспільства, будь-яка постать може бути
            гармонійною і привабливою. Ми створюємо тільки для Вас ідеальний
            одяг, з Вашими вимірами та мірками. Ми створюємо з любов'ю ❤️
            <span className={isFullText ? "display_none" : ""}>...</span>{" "}
            <span className={!isFullText ? "display_none" : ""}>
              Своєю появою бутік-ательє «MANILO» зобов'язаний людям, які
              надихають, які вірять, які захоплені модою, які поставили собі за
              мету забезпечити стильним одягом людей, які живуть у різних
              куточках світу. Ми виграємо за рахунок вигідної та справедливої
              ​​політики надання послуг та продуманого сервісу. Не гайте часу.
              Приступайте до шопінгу, і незабаром Ти зрозумієш, що робить нас
              особливими. Ірина Маніло
            </span>
          </div>
          <TxtButton
            styles={{ color: "#3a3328", fontSize: "12px" }}
            styleBlock={{ textAlign: "left" }}
            content={!isFullText ? "Детальніше" : "Коротко"}
            handleClick={() => setFullText(!isFullText)}
          />
        </div>
      </div>
      <InstagramBlock />
    </div>
  );
};
