import React, { useState } from "react";
import { useAppDispatch } from "store/hooks";
import { hideModal } from "store/modal";
import { ModalContainer } from ".";
import { deleteProductById } from "store/productSlice";
import { getCatalog } from "store/catalogSlice";
import "./style.scss";

interface IProps {
  id: string;
}

export const DeleteProductModal = (props: IProps) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const closeModal = () => {
    dispatch(hideModal());
  };

  const deleteProduct = () => {
    setError(null);

    try {
      setIsLoading(true);
      dispatch(deleteProductById(props.id))
        .unwrap()
        .then(() => {
          dispatch(hideModal());
          dispatch(getCatalog());
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

  return (
    <ModalContainer>
      <div className="logout_block">
        <div className="auth_header success_header">
          <h2>Ви хочете видалити товар?</h2>
        </div>
        <h3 />
        <div className="between">
          <button
            className="modal_btn delete_btn__modal"
            type="submit"
            onClick={deleteProduct}
          >
            Видалити
          </button>
          <button
            className="modal_btn delete_btn__modal"
            type="submit"
            onClick={closeModal}
          >
            Закрити
          </button>
        </div>
        {isLoading && <span className="loaderProduct" />}
        {!!error && <div className="error_modal">{error}</div>}
      </div>
    </ModalContainer>
  );
};
