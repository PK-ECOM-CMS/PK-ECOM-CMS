import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  orderList: [],
  selectedOrder: {},
};
const ordersSlice = createSlice({
  name: "Orders",
  initialState,
  reducers: {
    setOrders: (state, { payload }) => {
      state.orderList = payload;
    },
    setSelectedOrder: (state, { payload = {} }) => {
      state.selectedOrder = payload;
    },
  },
});
const { reducer, actions } = ordersSlice;
export const { setOrders, setSelectedOrder } = actions;
export default reducer;
