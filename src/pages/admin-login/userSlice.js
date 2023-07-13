import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: {},
  adminUsers: [],
};
const userSlice = createSlice({
  name: "adminUser",
  initialState,
  reducers: {
    setAdminUser: (state, { payload }) => {
      state.user = payload;
    },
    setAllAdminUsers: (state, { payload }) => {
      state.adminUsers = payload;
    },
  },
});
const { reducer, actions } = userSlice;
export const { setAdminUser, setAllAdminUsers } = actions;
export default reducer;
