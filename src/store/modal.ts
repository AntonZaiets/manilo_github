import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { IChangeEnabledModalProps, ModalTypes } from "interface";

type IState =
  | {
      modalType: null;
      modalProps: null;
    }
  | {
      modalType: keyof typeof ModalTypes;
      modalProps: IChangeEnabledModalProps;
    };

const initialState: IState = {
  modalProps: null,
  modalType: null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (state, action: PayloadAction<IState>) => {
      state.modalProps = action.payload.modalProps;
      state.modalType = action.payload.modalType;
    },
    hideModal: (state) => {
      state.modalProps = null;
      state.modalType = null;
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;

export const selectModal = (state: RootState) => state.modals;

export default modalSlice.reducer;
