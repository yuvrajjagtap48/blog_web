import { createSlice } from "@reduxjs/toolkit";

const newBlogFormSlice = createSlice({
  name: "newBlogForm",
  initialState: {
    title: '',
    author: '',
    detailInfo: '',
    photo: '',
  },
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetForm: (state) => {
      state.title = '';
      state.author = '';
      state.detailInfo = '';
      state.photo = '';
    },
  },
});

export const { updateField, resetForm } = newBlogFormSlice.actions;

export default newBlogFormSlice.reducer;