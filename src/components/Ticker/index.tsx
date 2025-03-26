import React from "react";
import "./style.scss";

interface ITicker {
  leftText: string;
  rightText: string;
  logo: string;
}

export const Ticker = (props: ITicker) => {
  const { leftText, rightText, logo } = props;
  return (
    <section className="ticker">
      <h1 className="ticker_text">{leftText}</h1>
      <span>&#4326;</span>
      <h1 className="ticker_logo">{logo}</h1>
      <span>&#4326;</span>
      <h1 className="ticker_text">{rightText}</h1>
    </section>
  );
};
