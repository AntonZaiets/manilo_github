import React, { useState } from "react";
import { useAppDispatch } from "store/hooks";
import { sendRequestToBuy } from "store/catalogSlice";
import { useSelector } from "react-redux";
import { cleanBasket, selectCartSlice } from "store/cartSlice";
import { Provider } from "./MultiStepFormContext";
import { Details } from "./Details";
import { Address } from "./Address";
import { Review } from "./Review";
import { modalAction } from "components";
import { ModalTypes } from "interface";

const steps = [
  {
    title: "Сведения об эмитенте",
    component: Details,
  },
  {
    title: "Сведения об эмитенте",
    component: Address,
  },
  {
    title: "Сведения об эмитенте",
    component: Review,
  },
];

const MultiStepForm = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [state, setState] = useState(null);
  const [activeStep, setCurrentStep] = useState(0);
  const { cart: isCartsInStorage } = useSelector(selectCartSlice);

  const openChangeEnabledModal = () => {
    dispatch(modalAction("1", ModalTypes.BUY_PRODUCTS));
  };

  const onFinishWizard = (values: { email: string; text: string }) => {
    setError(null);

    try {
      setIsLoading(true);
      dispatch(sendRequestToBuy({ ...values, carts: isCartsInStorage }))
        .unwrap()
        .then(() => {
          setIsLoading(false);
          dispatch(cleanBasket());
          openChangeEnabledModal();
        })
        .catch(() => {
          setError("Вибачте, сталась помилка");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const next = (): void => {
    if (activeStep + 1 === steps.length) {
      onFinishWizard(state);
      return null;
    }
    setCurrentStep(activeStep + 1);
  };
  const prev = () => setCurrentStep(activeStep - 1);
  const CurrentStep = steps[activeStep].component;

  return (
    <div className="stepForm">
      <Provider value={{ state, setState, next, prev }}>
        <div className="stepForm_head">
          <div
            className={`step ${activeStep === 0 && "step_active"} ${
              activeStep > 0 && "step_passed"
            }`}
          >
            <div className="step_icon">
              {activeStep > 0 ? <>&#10003;</> : 1}
            </div>
            <span className="step_title">Контакти</span>
            <div className="step_line" />
          </div>
          <div
            className={`step ${activeStep === 1 && "step_active"} ${
              activeStep > 1 && "step_passed"
            }`}
          >
            <div className="step_icon">
              {activeStep > 1 ? <>&#10003;</> : 2}
            </div>
            <span className="step_title">Доставка</span>
            <div className="step_line" />
          </div>
          <div className={`step ${activeStep === 2 && "step_active"}`}>
            <div className="step_icon">3</div>
            <span className="step_title">Перегляд</span>
            <div className="step_line" />
          </div>
        </div>
        <main>
          <CurrentStep />
          {isLoading && <span className="loaderProduct" />}
          {!!error && <div className="error_modal">{error}</div>}
        </main>
      </Provider>
    </div>
  );
};
export default MultiStepForm;
