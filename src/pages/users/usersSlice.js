import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  users: [],
};
const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, { payload }) => {
      state.users = payload;
    },
  },
});
const { reducer, actions } = usersSlice;
export const { setUsers } = actions;
export default reducer;
