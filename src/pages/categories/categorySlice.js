import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  categories: [],
};
const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, { payload = [] }) => {
      state.categories = payload;
    },
  },
});
const { reducer, actions } = categoriesSlice;
export const { setCategories } = actions;
export default reducer;
