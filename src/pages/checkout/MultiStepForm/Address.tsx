import React, { useContext } from "react";
import { Field, Formik } from "formik";
import MultiStepFormContext from "./MultiStepFormContext";
import { _isRequired, ErrorLabel, validate } from "utils";

export const Address = () => {
  const { setState, state, next, prev } = useContext(MultiStepFormContext);

  const initValues = {
    address: state?.address,
    city: state?.city,
  };

  return (
    <Formik
      initialValues={initValues}
      onSubmit={(values) => {
        setState({ ...state, ...values });
        next();
      }}
    >
      {(props) => {
        return (
          <div className={"details__wrapper"}>
            <div className="input_block">
              <label htmlFor="city">Місто</label>
              <Field
                name="city"
                label="Місто"
                size="l"
                placeholder="Місто"
                validate={validate([_isRequired("Введіть місто")])}
              />
              <ErrorLabel props={props} field="city" />
            </div>
            <div className="input_block">
              <label htmlFor="address">Адреса поштового відділення</label>
              <Field
                name="address"
                label="Адреса поштового відділення"
                size="l"
                placeholder="Адреса"
                validate={validate([
                  _isRequired("Введіть адреса поштового відділення"),
                ])}
              />
              <ErrorLabel props={props} field="address" />
            </div>
            <div className={"display_center"}>
              <button className="step_btn" onClick={prev}>
                Попередня
              </button>
              <button className="step_btn" onClick={() => props.handleSubmit()}>
                Наступна
              </button>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};
