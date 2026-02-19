import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import blogsReducer from "./blogsSlice";
import commentsReducer from "./commentsSlice";
import newBlogFormReducer from "./newBlogFormSlice";
import modalReducer from "./modalSlice";
import searchReducer from "./searchSlice";

const appStore = configureStore({
    reducer: {
        user : userReducer,
        blogs: blogsReducer,
        comments: commentsReducer,
        newBlogForm: newBlogFormReducer,
        modal: modalReducer,
        search: searchReducer,
    },
})

export default appStore;