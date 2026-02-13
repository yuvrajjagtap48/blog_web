import { createSlice } from "@reduxjs/toolkit";

// Helper function to format date as "10 Feb 2026"
const formatDate = (date) => {
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-GB', options);
};

// Helper function to load comments from localStorage
const loadCommentsFromStorage = () => {
  try {
    const commentsData = localStorage.getItem('blogComments');
    return commentsData ? JSON.parse(commentsData) : {
      // Structure: { blogId: [comments] }
      1: [
        { id: 1, author: "Alice", text: "Great article!", date: "11 Feb 2026", photoUrl: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp", replies: [] },
        { id: 2, author: "Bob", text: "Very helpful.", date: "10 Feb 2026", photoUrl: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp", replies: [] },
      ],
      2: [
        { id: 3, author: "Charlie", text: "Thanks for the guide!", date: "09 Feb 2026", photoUrl: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp", replies: [] },
      ],
      3: [
        { id: 4, author: "Diana", text: "Inspiring journey!", date: "08 Feb 2026", photoUrl: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp", replies: [] },
        { id: 5, author: "Eve", text: "Great insights.", date: "07 Feb 2026", photoUrl: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp", replies: [] },
      ],
      4: [
        { id: 6, author: "Frank", text: "Node.js is awesome!", date: "07 Feb 2026", photoUrl: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp", replies: [] },
      ],
      5: [],
      6: [
        { id: 7, author: "Grace", text: "Fascinating topic!", date: "05 Feb 2026", photoUrl: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp", replies: [] },
        { id: 8, author: "Henry", text: "Well explained.", date: "04 Feb 2026", photoUrl: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp", replies: [] },
      ],
    };
  } catch (error) {
    console.error('Error loading comments from localStorage:', error);
    return {};
  }
};

// Helper function to save comments to localStorage
const saveCommentsToStorage = (comments) => {
  try {
    localStorage.setItem('blogComments', JSON.stringify(comments));
  } catch (error) {
    console.error('Error saving comments to localStorage:', error);
  }
};

const commentsSlice = createSlice({
  name: "comments",
  initialState: loadCommentsFromStorage(),
  reducers: {
    addComment: (state, action) => {
      const { blogId, author, text, photoUrl } = action.payload;
      const newComment = {
        id: Date.now(), // Simple ID generation
        author,
        text,
        date: formatDate(new Date()),
        photoUrl,
        replies: [],
      };

      if (!state[blogId]) {
        state[blogId] = [];
      }
      state[blogId].push(newComment);
      saveCommentsToStorage(state); // Save to localStorage after state change
    },
    addReply: (state, action) => {
      const { blogId, commentId, author, text, photoUrl } = action.payload;
      const blogComments = state[blogId];
      if (blogComments) {
        const comment = blogComments.find(c => c.id === commentId);
        if (comment) {
          const newReply = {
            id: Date.now(),
            author,
            text,
            date: formatDate(new Date()),
            photoUrl,
          };
          comment.replies.push(newReply);
        }
      }
      saveCommentsToStorage(state); // Save to localStorage after state change
    },
  },
});

export const { addComment, addReply } = commentsSlice.actions;

export default commentsSlice.reducer;