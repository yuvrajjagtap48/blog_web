import { createSlice } from "@reduxjs/toolkit";

// Helper function to load user from localStorage
const loadUserFromStorage = () => {
  try {
    const userData = localStorage.getItem('blogUser');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error loading user from localStorage:', error);
    return null;
  }
};

// Helper function to save user to localStorage
const saveUserToStorage = (user) => {
  try {
    if (user) {
      localStorage.setItem('blogUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('blogUser');
    }
  } catch (error) {
    console.error('Error saving user to localStorage:', error);
  }
};

const userSlice = createSlice({
  name: "user",
  initialState: loadUserFromStorage(),
  reducers: {
    addUser: (state, action) => {
      const userData = { ...action.payload, likedBlogs: [] };
      saveUserToStorage(userData);
      return userData;
    },
    removeUser: () => {
      saveUserToStorage(null);
      return null;
    },
    updateUser: (state, action) => {
      const updatedUser = { ...state, ...action.payload };
      saveUserToStorage(updatedUser);
      return updatedUser;
    },
    addLikedBlog: (state, action) => {
      if (state) {
        // Allow liking multiple blogs, but only once per blog
        if (!state.likedBlogs.includes(action.payload)) {
          state.likedBlogs.push(action.payload);
          saveUserToStorage(state);
        }
      }
    },
  },
});

export const { addUser, removeUser, updateUser, addLikedBlog } = userSlice.actions;

export default userSlice.reducer;