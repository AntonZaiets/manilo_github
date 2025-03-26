import React from "react";
import { useAppDispatch } from "store/hooks";
import { hideModal } from "store/modal";
import { useNavigate } from "react-router-dom";
import { ModalContainer } from ".";
import { Routes as Link } from "constants/routes";
import "./style.scss";

interface IProps {
  title: string;
  id: string;
}

export const AddProductModal = (props: IProps) => {
  const { title = "Товар успішно додано!", id } = props;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const closeModal = () => {
    dispatch(hideModal());
    navigate(`/${Link.catalog}/${id}`);
  };

  return (
    <ModalContainer>
      <div className="logout_block">
        <div className="auth_header success_header">
          <h2>{title}</h2>
        </div>
        <h3 />
        <button className="modal_btn" type="submit" onClick={closeModal}>
          Перейти на товар
        </button>
      </div>
    </ModalContainer>
  );
};
