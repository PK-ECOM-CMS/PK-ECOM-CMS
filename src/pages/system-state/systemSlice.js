import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  showSideMenu: false,
  modalShow: false,
};
const systemSlice = createSlice({
  name: "systemSlice",
  initialState,
  reducers: {
    setShowSidemenu: (state, { payload }) => {
      state.showSideMenu = payload;
    },
    setModalShow: (state) => {
      state.modalShow = !state.modalShow;
    },
  },
});
const { reducer, actions } = systemSlice;
export const { setShowSidemenu, setModalShow } = actions;
export default reducer;
