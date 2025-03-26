import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axio";
import { statusFetching, ICatalogEntity } from "interface";
import { RootState } from "./store";

const initialState: {
  data: ICatalogEntity;
  fetchStatus: statusFetching;
  fetchError: string;
} = {
  data: null,
  fetchStatus: "init",
  fetchError: null,
};

export const getProduct = createAsyncThunk(
  "product/Data",
  async (id: string) => {
    const { data } = await axios.get(`/catalog/${id}`);
    return data;
  }
);

export const getAllImages = createAsyncThunk(
  "product/Data",
  async (id: string) => {
    const { data } = await axios.get(`/catalog/${id}`);
    return data;
  }
);

export const deleteProductById = createAsyncThunk(
  "catalog/delete",
  async (id: string) => {
    const { data } = await axios.delete(`/catalog/${id}`);
    return data;
  }
);

export const editProductById = createAsyncThunk(
  "catalog/edit",
  async ({ id, params }: { id: string; params: any }) => {
    const { data } = await axios.patch(`/catalog/${id}`, params);
    return data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.fetchStatus = "fetching";
      })
      .addCase(getProduct.fulfilled, (state, { payload }) => {
        state.fetchStatus = "success";
        state.data = payload;
      })
      .addCase(getProduct.rejected, (state, { error }) => {
        state.data = null;
        state.fetchStatus = "error";
        state.fetchError = error.message;
      });
  },
});

export const selectProduct = (state: RootState) => state.product;
export const productReducer = productSlice.reducer;
