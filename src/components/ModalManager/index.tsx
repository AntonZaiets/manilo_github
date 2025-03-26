import React, { CSSProperties, PropsWithChildren } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { hideModal, selectModal } from "store/modal";
import { ModalTypes } from "interface";
import { AuthorizationModal } from "./AuthorizationModal";
import { SuccessProductModal } from "./SuccessProductModal";
import { AddProductModal } from "./AddProductModal";
import { DeleteProductModal } from "./DeleteProductModal";
import { EditProductModal } from "./EditProductModal";

const modalComponentLookupTable: Record<ModalTypes, React.FC<any>> = {
  [ModalTypes.LOGIN_REGISTER]: AuthorizationModal,
  [ModalTypes.BUY_PRODUCTS]: SuccessProductModal,
  [ModalTypes.ADD_PRODUCTS]: AddProductModal,
  [ModalTypes.DELETE_PRODUCT]: DeleteProductModal,
  [ModalTypes.EDIT_PRODUCT]: EditProductModal,
};

export type IStyledChildrenProps<P> = PropsWithChildren<P> & CSSProperties;

export const ModalManager = () => {
  const { modalType, modalProps } = useAppSelector(selectModal);
  const ModalComponent = modalComponentLookupTable[modalType];

  return <>{ModalComponent && <ModalComponent {...modalProps} />}</>;
};

export const ModalContainer: React.FC<IStyledChildrenProps<any>> = ({
  children,
  ...props
}: IStyledChildrenProps<any>) => {
  const dispatch = useAppDispatch();

  const closeModal = () => {
    dispatch(hideModal());
  };
  return (
    <div className="modal_container">
      <div className="modal_content">
        <div className="modal_close" {...props}>
          <div className="icon_close__modal" onClick={closeModal} />
          {children}
        </div>
      </div>
    </div>
  );
};
