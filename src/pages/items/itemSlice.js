import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  itemsList: [],
  selectedItem: {},
};
const itemsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setItems: (state, { payload }) => {
      state.itemsList = payload;
    },
    setSelectedItem: (state, { payload }) => {
      state.selectedItem = payload;
    },
  },
});
const { reducer, actions } = itemsSlice;
export const { setItems, setSelectedItem } = actions;
export default reducer;
