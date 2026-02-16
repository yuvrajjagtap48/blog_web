import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isNewBlogModalOpen: false,
    isProfileModalOpen: false,
  },
  reducers: {
    openNewBlogModal: (state) => {
      state.isNewBlogModalOpen = true;
    },
    closeNewBlogModal: (state) => {
      state.isNewBlogModalOpen = false;
    },
    openProfileModal: (state) => {
      state.isProfileModalOpen = true;
    },
    closeProfileModal: (state) => {
      state.isProfileModalOpen = false;
    },
    closeAllModals: (state) => {
      state.isNewBlogModalOpen = false;
      state.isProfileModalOpen = false;
    },
  },
});

export const {
  openNewBlogModal,
  closeNewBlogModal,
  openProfileModal,
  closeProfileModal,
  closeAllModals,
} = modalSlice.actions;

export default modalSlice.reducer;