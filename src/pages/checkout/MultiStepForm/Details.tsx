import React, { useContext } from "react";
import { Field, Formik } from "formik";
import MultiStepFormContext from "./MultiStepFormContext";
import {
  _isEmail,
  _isPhoneNumber,
  _isRequired,
  ErrorLabel,
  validate,
} from "utils";

export const Details = () => {
  const { setState, state, next } = useContext(MultiStepFormContext);
  const initValues = {
    name: state?.name,
    secondName: state?.secondName,
    email: state?.email,
    phone: state?.phone,
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
              <label htmlFor="name">Ім'я</label>
              <Field
                name="name"
                label="Ім'я"
                size="l"
                placeholder="Ім'я"
                validate={validate([_isRequired("Введіть ім'я")])}
              />
              <ErrorLabel props={props} field="name" />
            </div>
            <div className="input_block">
              <label htmlFor="secondName">Прізвище</label>
              <Field
                name="secondName"
                label="Прізвище"
                size="l"
                placeholder="Прізвище"
                validate={validate([_isRequired("Введіть прізвище")])}
              />
              <ErrorLabel props={props} field="secondName" />
            </div>
            <div className="input_block">
              <label htmlFor="phone">Телефон</label>
              <Field
                name="phone"
                label="Телефон"
                size="l"
                placeholder="Телефон"
                validate={validate([
                  _isRequired("Введіть номер телефону"),
                  _isPhoneNumber(),
                ])}
              />
              <ErrorLabel props={props} field="phone" />
            </div>
            <div className="input_block">
              <label htmlFor="Email">Email</label>
              <Field
                name="email"
                label="Email"
                size="l"
                placeholder="Email"
                validate={validate([_isRequired("Введіть email"), _isEmail()])}
              />
              <ErrorLabel props={props} field="email" />
            </div>
            <div className={"display_center"}>
              <button
                className="step_btn"
                type="button"
                onClick={() => props.handleSubmit()}
              >
                Наступна
              </button>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};
