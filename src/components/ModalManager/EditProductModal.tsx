import React, { useRef, useState } from "react";
import { useAppDispatch } from "store/hooks";
import { ModalContainer } from ".";
import { editProductById } from "store/productSlice";
import {
  Formik,
  Form as FormikForm,
  Field,
  ErrorMessage,
  FieldArray,
} from "formik";
import { _isRequired, _moreLength, validate } from "utils";
import "./style.scss";
import { ICatalogEntity, IClothes } from "interface";
import { hideModal } from "store/modal";
import { getCatalog } from "store/catalogSlice";

interface IProps {
  id: string;
  data: ICatalogEntity;
}

export const EditProductModal = (props: IProps) => {
  const { id, data } = props;
  const formRef = useRef();
  //const [image, setImage] = useState(data.images);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const initValues: IClothes = {
    title: data.title,
    size: data.size,
    text: data.text,
    price: data.price,
    color: data.color,
    tags: data.tags,
    images: data.images,
  };

  const onSubmit = async (values: IClothes) => {
    setError(null);
    try {
      setIsLoading(true);
      const params = { ...values };
      dispatch(editProductById({ id, params }))
        .unwrap()
        .then(() => {
          dispatch(hideModal());
          dispatch(getCatalog());
        })
        .catch((err: Error) => {
          console.log("error", err);
          setError("Вибачте сталась помилка");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ModalContainer>
      <div className="edit_modal">
        <div className="auth_header success_header">
          <h2>Редагувати товар?</h2>
        </div>
        <Formik
          initialValues={initValues}
          innerRef={formRef}
          onSubmit={onSubmit}
        >
          {({ values }) => {
            return (
              <FormikForm>
                <div className="input_block m_top__m">
                  <label htmlFor="title">Заголовок товару</label>
                  <Field
                    name="title"
                    label="Заголовок"
                    size="l"
                    placeholder="Заголовок"
                    validate={validate([
                      _isRequired("Введіть заголовок"),
                      _moreLength(3),
                    ])}
                  />
                  <ErrorMessage
                    component="div"
                    className="error_label"
                    name="title"
                  />
                </div>
                <div className="input_block">
                  <label htmlFor="price">Ціна товару</label>
                  <Field
                    name="price"
                    label="Ціна"
                    size="l"
                    type="number"
                    placeholder="Ціна"
                    validate={validate([_isRequired("Введіть ціну товару")])}
                  />
                  <ErrorMessage
                    component="div"
                    className="error_label"
                    name="price"
                  />
                </div>
                <div className="input_block">
                  <label htmlFor="size">Розміри</label>
                  <Field
                    name="size"
                    label="Розмір"
                    placeholder="Розмір"
                    size="l"
                    block
                  />
                </div>
                <div className="input_block">
                  <label htmlFor="color">Колір</label>
                  <Field
                    name="color"
                    label="Колір"
                    placeholder="Колір"
                    size="l"
                    block
                  />
                </div>
                <div className="input_block textarea_block">
                  <label htmlFor="text">Інформація про товар</label>
                  <Field
                    name="text"
                    label="Текст"
                    size="l"
                    placeholder="Текст"
                    className="textarea"
                    rows="4"
                    cols="50"
                    validate={validate([
                      _isRequired("Введіть інформацію про товар"),
                      _moreLength(5),
                    ])}
                  />
                  <ErrorMessage
                    component="div"
                    className="error_label"
                    name="text"
                  />
                </div>

                <div className="input_block textarea_block">
                  <label htmlFor="text">Фото</label>
                  <FieldArray
                    name="images"
                    render={(arrayHelpers) => (
                      <div>
                        {values.images &&
                          values.images.length > 0 &&
                          values.images.map((friend, index) => (
                            <div key={index} className="flex m_bottom__m">
                              <div className="img_block__w">
                                <Field
                                  name={`images.${index}`}
                                  label="url"
                                  placeholder="url"
                                  size="l"
                                  block
                                  validate={validate([
                                    _isRequired("Введіть url"),
                                  ])}
                                />
                                <ErrorMessage
                                  component="div"
                                  className="error_label"
                                  name={`images.${index}`}
                                />
                              </div>
                              <button
                                type="button"
                                className="remove_url"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                &#215;
                              </button>
                            </div>
                          ))}
                        <button
                          type="button"
                          className="btn_add__url modal_btn"
                          onClick={() => arrayHelpers.push("")}
                        >
                          +
                        </button>
                      </div>
                    )}
                  />
                </div>
                {/*<FileUpload*/}
                {/*  name="files"*/}
                {/*  addImage={(item: any) => setImage(item)}*/}
                {/*  isEdit*/}
                {/*  data={data.images}*/}
                {/*/>*/}
                <div className="m_top__m" />
                <button className="modal_btn" type="submit">
                  Зберегти
                </button>
                {isLoading && (
                  <div className="loader_block">
                    <span className="loader" />
                  </div>
                )}
                {error && <div className="error_text">{error}</div>}
              </FormikForm>
            );
          }}
        </Formik>
      </div>
    </ModalContainer>
  );
};
