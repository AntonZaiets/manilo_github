import { showModal } from 'store/modal';
import {ModalTypes} from "interface";
import {AppDispatch} from "store/store";

export const modalAction = (
  id: string,
  type?: keyof typeof ModalTypes,
  props?: any
) => (dispatch: AppDispatch) => {
  dispatch(
    showModal({
      modalType: type,
      modalProps: { id, ...props },
    }),
  );
};
