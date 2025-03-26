import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axio";
import { statusFetching, IOrderEntity } from "interface";
import { RootState } from "./store";

const initialState: {
  data: IOrderEntity[];
  fetchStatus: statusFetching;
  fetchError: string;
} = {
  data: [],
  fetchStatus: "init",
  fetchError: null,
};

export const getOrder = createAsyncThunk("order/Data", async () => {
  const { data } = await axios.get("/order");
  return data;
});

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrder.pending, (state) => {
        state.fetchStatus = "fetching";
      })
      .addCase(getOrder.fulfilled, (state, { payload }) => {
        state.fetchStatus = "success";
        state.data = payload;
      })
      .addCase(getOrder.rejected, (state, { error }) => {
        state.data = [];
        state.fetchStatus = "error";
        state.fetchError = error.message;
      });
  },
});

export const selectOrder = (state: RootState) => state.order;
export const orderReducer = orderSlice.reducer;
