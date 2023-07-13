import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  reviews: [],
};
const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    setReviews: (state, { payload }) => {
      state.reviews = payload;
    },
  },
});
const { reducer, actions } = reviewsSlice;
export const { setReviews } = actions;
export default reducer;
