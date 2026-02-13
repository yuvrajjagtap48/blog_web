import { createSlice } from "@reduxjs/toolkit";

const newBlogFormSlice = createSlice({
  name: "newBlogForm",
  initialState: {
    title: '',
    author: '',
    photoUrl: '',
    detailInfo: '',
  },
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetForm: (state) => {
      state.title = '';
      state.author = '';
      state.photoUrl = '';
      state.detailInfo = '';
    },
  },
});

export const { updateField, resetForm } = newBlogFormSlice.actions;

export default newBlogFormSlice.reducer;