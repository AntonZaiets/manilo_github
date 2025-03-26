import { configureStore } from "@reduxjs/toolkit";
import { catalogReducer } from "./catalogSlice";
import { orderReducer } from "./orderSlice";
import { productReducer } from "./productSlice";
import { authReducer } from "./authSlice";
import cartReducer from "./cartSlice";
import modalReducer from "./modal";

const store = configureStore({
  reducer: {
    catalog: catalogReducer,
    order: orderReducer,
    auth: authReducer,
    modals: modalReducer,
    product: productReducer,
    storageCart: cartReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;
export type RootState = ReturnType<typeof store.getState>;
