import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const cartSlice = createSlice({
  name: "storageCart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state?.cart?.find(
        (item) => item["_id"] === action.payload["_id"]
      );
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        if (!state.cart) {
          state.cart = [];
        }
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem(`products`, JSON.stringify(state.cart));
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item["_id"] === action.payload);
      item.quantity++;
      localStorage.setItem(`products`, JSON.stringify(state.cart));
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item["_id"] === action.payload);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
      localStorage.setItem(`products`, JSON.stringify(state.cart));
    },
    removeItem: (state, action) => {
      const removeItem = state.cart.filter(
        (item) => item["_id"] !== action.payload
      );
      state.cart = removeItem;
      localStorage.setItem(`products`, JSON.stringify(removeItem));
    },
    cleanBasket: (state) => {
      state.cart = [];
      localStorage.removeItem(`products`);
    },
    fillCartStorage: (state) => {
      state.cart = JSON.parse(localStorage.getItem(`products`));
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  fillCartStorage,
  cleanBasket,
} = cartSlice.actions;

export const selectCartSlice = (state: RootState) => state.storageCart;

export default cartSlice.reducer;
