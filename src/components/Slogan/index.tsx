import React from "react";
import { DiagonalArrowBigger } from "images/icons";
import { useNavigate } from "react-router-dom";
import { CircleButton } from "components";
import { scrollToTop } from "utils";
import "./style.scss";

export const Slogan = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="slogan">
        <div className="slogan slogan_first">handmade</div>
        <div className="slogan slogan_second">WOMEN'S UNDERWEAR</div>
        <div className="slogan slogan_third">best quality</div>
        <div
          className="btn"
          onClick={() => {
            navigate("/catalog");
            scrollToTop();
          }}
        >
          <CircleButton
            stylesBlock={{
              left: "auto",
            }}
            stylesTxt={{ color: "#3a3328", fontSize: "16px" }}
            content="ПЕРЕГЛЯД ТОВАРІВ"
            icon={<DiagonalArrowBigger />}
          />
        </div>
      </div>
    </div>
  );
};
