import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  paymentMethods: [],
  selectedPaymentMethod:{}
};
const paymentMethodsSlice = createSlice({
  name: "paymentmethods",
  initialState,
  reducers: {
    setPaymentMethods: (state, { payload }) => {
      state.paymentMethods = payload;
    },
    setSelectedPaymentMethod: (state, { payload }) => {
      state.selectedPaymentMethod = payload;
    },
  },
});
const { reducer, actions } = paymentMethodsSlice;
export const { setPaymentMethods, setSelectedPaymentMethod } = actions;
export default reducer;
