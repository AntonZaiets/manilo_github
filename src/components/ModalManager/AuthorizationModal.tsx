import React, { useState, useRef } from "react";
import { useAppDispatch } from "store/hooks";
import "./style.scss";
import { hideModal } from "store/modal";
import { Formik, Form as FormikForm, Field } from "formik";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchAuth, selectIsAuth } from "store/authSlice";
import { _isEmail, _isRequired, validate } from "utils";
import { Routes as Link } from "constants/routes";
import { ModalContainer } from "components/ModalManager";

export enum MODAL_TYPE {
  AUTHORIZATION = "AUTHORIZATION",
  REGISTRATION = "REGISTRATION",
}

export const AuthorizationModal = () => {
  const dispatch = useAppDispatch();
  const formRef = useRef();
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();

  const [typeModal, setTypeModal] = useState(MODAL_TYPE.AUTHORIZATION);
  const initValues = {
    email: "",
    password: "",
  };
  const closeModal = () => {
    dispatch(hideModal());
  };
  const refreshPage = () => {
    window.location.reload();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    closeModal();
    navigate(`/${Link.base}`);
    refreshPage();
  };

  const onSubmit = async (values: { email: string; password: string }) => {
    const data = await dispatch(fetchAuth(values));

    if (!data.payload) {
      console.log("Не удалось авторизоваться");
    }
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
      refreshPage();
      closeModal();
    }
  };

  if (isAuth) {
    return (
      <ModalContainer>
        <div className="logout_block">
          <div className="auth_header">
            <h2>Ви авторизувались</h2>
          </div>
          <h3>Хочете вийти?</h3>
          <button className="modal_btn" type="submit" onClick={handleLogout}>
            Вийти
          </button>
        </div>
      </ModalContainer>
    );
  }

  return (
    <ModalContainer>
      <div className="auth_block">
        <div className="auth_header">
          <button
            className="modal_btn__title"
            onClick={() => setTypeModal(MODAL_TYPE.AUTHORIZATION)}
          >
            Вхід
          </button>
          {/*<button onClick={() => setTypeModal(MODAL_TYPE.REGISTRATION)}>*/}
          {/*  Реєстрація*/}
          {/*</button>*/}
        </div>
        <div className="auth_container">
          <Formik
            initialValues={initValues}
            innerRef={formRef}
            onSubmit={onSubmit}
          >
            {({ errors, touched }) => {
              return (
                <FormikForm>
                  <div className="input_block">
                    <label htmlFor="Email">Email Address</label>
                    <Field
                      name="email"
                      label="E-Mail"
                      size="l"
                      placeholder="E-Mail"
                      validate={validate([
                        _isRequired("Введіть email"),
                        _isEmail(),
                      ])}
                    />
                    {errors.email && touched.email ? (
                      <div className="error_label">{errors.email}</div>
                    ) : null}
                  </div>
                  <div className="input_block">
                    <label htmlFor="password">Пароль</label>

                    <Field
                      name="password"
                      label="Пароль"
                      placeholder="********"
                      size="l"
                      type="password"
                      rightAddons={"ghgh"}
                      validate={validate([_isRequired("Введіть пароль")])}
                    />
                    {errors.password && touched.password ? (
                      <div className="error_label">{errors.password}</div>
                    ) : null}
                  </div>
                  <button className="modal_btn" type="submit">
                    {typeModal === MODAL_TYPE.REGISTRATION
                      ? "Реєстрація"
                      : "Увійти"}
                  </button>
                </FormikForm>
              );
            }}
          </Formik>
        </div>
      </div>
    </ModalContainer>
  );
};
