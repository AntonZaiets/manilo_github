import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axio";
import { ICatalogEntity, IStore } from "interface";
import { RootState } from "./store";

const initialState: IStore<ICatalogEntity> = {
  data: [],
  fetchStatus: "init",
  fetchError: null,
  sorters: {},
  sorter: "none",
  filters: "",
};

const calcSorter = (sorter: string | string[]) => {
  if (!!sorter) return sorter;
  if (!sorter) return "none";
  return sorter;
};

export const getCatalog = createAsyncThunk(
  "catalog/Data",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const { sorter, filters } = state.catalog;

    const queryParams = {
      //size: pageSize,
      //page: currentPage,
      search: filters,
      sort: calcSorter(sorter),
    };

    const { data } = await axios.get("/catalog", { params: queryParams });
    return data;
  }
);

export const addClothes = createAsyncThunk(
  "catalog/add",
  async (params: any) => {
    const { data } = await axios.post("/catalog", params);
    return data;
  }
);

export const sendRequestToBuy = createAsyncThunk(
  "catalog/buy",
  async (params: any) => {
    const { data } = await axios.post("/send/email", params);
    return data;
  }
);

export const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    updateSorter: (state, action) => {
      state.sorter = action.payload;
    },
    updateFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCatalog.pending, (state) => {
        state.fetchStatus = "fetching";
      })
      .addCase(getCatalog.fulfilled, (state, { payload }) => {
        state.fetchStatus = "success";
        state.data = payload;
      })
      .addCase(getCatalog.rejected, (state, { error }) => {
        state.data = [];
        state.fetchStatus = "error";
        // @ts-ignore
        state.fetchError = error.message;
      });
  },
});

export const selectCatalog = (state: RootState) => state.catalog;
export const { updateSorter, updateFilters } = catalogSlice.actions;

export const catalogReducer = catalogSlice.reducer;
export const postsReducer = catalogSlice.reducer;
