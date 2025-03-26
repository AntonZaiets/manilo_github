import React from "react";
import { useAppDispatch } from "store/hooks";
import { hideModal } from "store/modal";
import { useNavigate } from "react-router-dom";
import { ModalContainer } from ".";
import { Heart } from "images/icons";
import "./style.scss";
import { getCatalog } from "store/catalogSlice";

interface IProps {
  title: string;
  content?: string;
}

export const SuccessProductModal = (props: IProps) => {
  const {
    title = "Дякуємо за довіру!",
    content = `Наш менеджер зв'яжеться з вами`,
  } = props;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const closeModal = () => {
    dispatch(hideModal());
    dispatch(getCatalog());
    navigate(`/`);
  };

  return (
    <ModalContainer>
      <div className="logout_block">
        <div className="auth_header success_header">
          <h2>{title}</h2>
        </div>
        <Heart className="success_header__heart" width="50px" height="50px" />
        <h3>{content}</h3>
        <button className="modal_btn" type="submit" onClick={closeModal}>
          На головну
        </button>
      </div>
    </ModalContainer>
  );
};
