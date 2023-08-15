import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  showSideMenu: false,
  modalShow: false,
  noticeModal:true,
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
    setNoticeModal: (state) => {
      state.noticeModal = !state.noticeModal;
    },
  },
});
const { reducer, actions } = systemSlice;
export const { setShowSidemenu, setModalShow, setNoticeModal } = actions;
export default reducer;
