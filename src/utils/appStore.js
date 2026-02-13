import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import blogsReducer from "./blogsSlice";
import commentsReducer from "./commentsSlice";
import newBlogFormReducer from "./newBlogFormSlice";

const appStore = configureStore({
    reducer: {
        user : userReducer,
        blogs: blogsReducer,
        comments: commentsReducer,
        newBlogForm: newBlogFormReducer,
    },
})

export default appStore;