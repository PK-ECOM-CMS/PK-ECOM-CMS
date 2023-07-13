import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  Products: [],
};
const productsSlice = createSlice({
  name: "Products",
  initialState,
  reducers: {
    setProducts: (state, { payload = [] }) => {
      state.Products = payload;
    },
  },
});
const { reducer, actions } = productsSlice;
export const { setProducts } = actions;
export default reducer;
