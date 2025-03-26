import React, { useContext } from "react";
import MultiStepFormContext from "./MultiStepFormContext";
import { City, Email, Phone, User } from "images/icons";

export const Review = () => {
  const { state, next, prev } = useContext(MultiStepFormContext);

  return (
    <div className="">
      <div className="review">
        <div className="review_block flex">
          <User />
          <p>
            {state?.secondName} {state?.name}
          </p>
        </div>
        <div className="review_block flex">
          <Phone />
          <p>{state?.phone}</p>
        </div>
        <div className="review_block flex">
          <Email />
          <p>{state?.email}</p>
        </div>
        <div className="review_block flex">
          <City />
          <p>
            {state?.city}, {state?.address}
          </p>
        </div>
      </div>
      <div className="display_center m_top__3xl">
        <button className="step_btn" onClick={prev}>
          Попередня
        </button>
        <button className="step_btn" onClick={next}>
          Відправити замовлення
        </button>
      </div>
    </div>
  );
};
