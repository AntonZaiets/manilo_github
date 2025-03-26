import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axio";
import { statusFetching } from "interface";
import { RootState } from "./store";

type TState = {
  data: null;
  fetchStatus: statusFetching;
  isAuthorized: boolean;
  redirectUrl: string;
  fetchError: string | null;
  roles: string[];
};

const initialState: TState = {
  data: null,
  fetchStatus: "init",
  fetchError: null,
  isAuthorized: false,
  redirectUrl: "",
  roles: [],
};

export const fetchAuth = createAsyncThunk(
  "auth/fetchAuth",
  async (params: { email: string; password: string }) => {
    const { data } = await axios.post("/auth/login", params);
    return data;
  }
);

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params) => {
    const { data } = await axios.post("/auth/register", params);
    return data;
  }
);

export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  const { data } = await axios.get("/auth/me");
  return data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.fetchStatus = "fetching";
      })
      .addCase(fetchAuth.fulfilled, (state, { payload }) => {
        state.fetchStatus = "success";
        state.data = payload;
      })
      .addCase(fetchAuth.rejected, (state, { error }) => {
        state.data = null;
        state.fetchStatus = "error";
        state.fetchError = error.message;
      })

      .addCase(fetchAuthMe.pending, (state) => {
        state.fetchStatus = "fetching";
      })
      .addCase(fetchAuthMe.fulfilled, (state, { payload }) => {
        state.fetchStatus = "success";
        state.isAuthorized = true;
        state.data = payload;
      })
      .addCase(fetchAuthMe.rejected, (state, { error }) => {
        state.data = null;
        state.fetchStatus = "error";
        state.fetchError = error.message;
      })

      .addCase(fetchRegister.pending, (state) => {
        state.fetchStatus = "fetching";
      })
      .addCase(fetchRegister.fulfilled, (state, { payload }) => {
        state.fetchStatus = "success";
        state.isAuthorized = true;
        state.data = payload;
      })
      .addCase(fetchRegister.rejected, (state, { error }) => {
        state.data = null;
        state.fetchStatus = "error";
        state.fetchError = error.message;
      });
  },
});

export const selectIsAuth = (state: RootState) => Boolean(state.auth.data);
export const selectUser = (state: RootState) => state.auth;

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
