import React, { useRef, useState } from "react";
import { modalAction } from "components";
import {
  Formik,
  Form as FormikForm,
  Field,
  FieldArray,
  ErrorMessage,
} from "formik";
import { _isRequired, _moreLength, validate } from "utils";
import { addClothes, getCatalog } from "store/catalogSlice";
import { useAppDispatch } from "store/hooks";
import { IClothes, ModalTypes } from "interface";
import "./style.scss";

export const AddClothes = () => {
  const formRef = useRef();
  //const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useAppDispatch();

  const initValues: IClothes = {
    title: "",
    size: "Індивідуально",
    text: "",
    price: null,
    color: "Індивідуально",
    tags: [],
    images: [],
  };

  const onSubmit = async (values: IClothes) => {
    setError(null);
    try {
      setIsLoading(true);
      dispatch(addClothes(values))
        .unwrap()
        .then((item) => {
          setIsLoading(false);
          dispatch(getCatalog());
          dispatch(
            modalAction("1", ModalTypes.ADD_PRODUCTS, { id: item["_id"] })
          );
        })
        .catch((err: Error) => {
          console.log("er", error);
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
    <div className="cabinet-content">
      <h1 className="about_title">Додати одяг</h1>
      <div className="add_block">
        <Formik
          initialValues={initValues}
          innerRef={formRef}
          onSubmit={onSubmit}
        >
          {({ values }) => {
            return (
              <FormikForm>
                <div className="input_block">
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
                {/*<FileUpload*/}
                {/*  name="files"*/}
                {/*  addImage={(item: string) => setImage(item)}*/}
                {/*/>*/}

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

                <button className="modal_btn" type="submit">
                  Додати товар
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
    </div>
  );
};

// interface IFileProps {
//   name: string;
//   addImage: ([]) => void;
//   isEdit?: boolean;
//   data?: any;
// }

// export const FileUpload = ({ addImage, data = [] }: IFileProps) => {
//   const [imagesUrl, setImagesUrl] = useState(data);
//
//   const onClickRemoveImage = async (index: number) => {
//     const array = [...imagesUrl];
//     array.splice(index, 1);
//     setImagesUrl(array);
//     addImage(array);
//   };
//   const formRefCur: any = useRef();
//
//   const handleChangeFile = async (event: any) => {
//     event.preventDefault();
//     event.stopPropagation();
//     try {
//       const formData = new FormData();
//       formData.append("image", event.target.files[0]);
//       const { data } = await axios.post("/upload-image", formData);
//       if (data.success) {
//         setImagesUrl([...imagesUrl, data?.filename]);
//         addImage([...imagesUrl, data?.filename]);
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   };
//
//   return (
//     <div className="img_load__block">
//       <label htmlFor="myImage" className="modal_btn upload_img__btn">
//         Додати зображення
//       </label>
//       <input
//         id="myImage"
//         name="image"
//         ref={formRefCur}
//         type="file"
//         onChange={handleChangeFile}
//         hidden
//       />
//       {!!imagesUrl?.length && (
//         <div className="img_load">
//           {imagesUrl.map((item: string, index: number) => (
//             <div className="relative">
//               <img src={`${BASE_URL_BACK}/image/${item}`} alt={item} />
//               <DeleteBasket
//                 className="btn_delete__img"
//                 onClick={() => onClickRemoveImage(index)}
//               />
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };
