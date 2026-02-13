import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { likeBlog, updateCommentCount } from "../utils/blogsSlice";
import { addLikedBlog } from "../utils/userSlice";
import { addComment, addReply } from "../utils/commentsSlice";

export default function BlogDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const comments = useSelector((state) => state.comments);
  const user = useSelector((state) => state.user);
  const [newComment, setNewComment] = useState("");
  const [replyTexts, setReplyTexts] = useState({});
  const [replyingTo, setReplyingTo] = useState([]);

  const blog = blogs.find((b) => b.id === parseInt(id));
  const blogComments = comments[id] || [];

  if (!blog) {
    return <div className="min-h-screen bg-gray-100 py-10 px-4 text-center">Blog not found</div>;
  }

  const handleLike = () => {
    if (user && !user.likedBlogs.includes(blog.id)) {
      dispatch(likeBlog({ blogId: blog.id, userId: user.id }));
      dispatch(addLikedBlog(blog.id));
    }
  };

  const hasUserLiked = user && user.likedBlogs.includes(blog.id);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim() && user) {
      dispatch(addComment({
        blogId: id,
        author: user.firstName + " " + user.lastName,
        text: newComment.trim(),
        photoUrl: user.photoUrl,
      }));
      dispatch(updateCommentCount({ blogId: parseInt(id), increment: 1 }));
      setNewComment("");
    }
  };

  const handleAddReply = (commentId, e) => {
    e.preventDefault();
    const text = replyTexts[commentId] || "";
    if (text.trim() && user) {
      dispatch(addReply({
        blogId: id,
        commentId,
        author: user.firstName + " " + user.lastName,
        text: text.trim(),
        photoUrl: user.photoUrl,
      }));
      setReplyTexts(prev => ({ ...prev, [commentId]: "" }));
      setReplyingTo(prev => prev.filter(id => id !== commentId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8">
        {blog.photoUrl && (
          <img
            src={blog.photoUrl}
            alt={blog.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        )}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{blog.title}</h1>
        <p className="text-lg text-gray-600 mb-6">{blog.content}</p>
        <p className="text-sm text-gray-500 mb-6">
          By <span className="font-medium">{blog.author}</span> • {blog.date}
        </p>
        {(blog.createdDate || blog.lastModify) && (
          <p className="text-sm text-gray-400 mb-6">
            Created: {blog.createdDate || 'N/A'} • Last Modified: {blog.lastModify || 'N/A'}
          </p>
        )}
        <div className="flex items-center gap-6 mb-8">
          <button
            onClick={handleLike}
            disabled={!user}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              hasUserLiked
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-red-500 text-white hover:bg-red-600'
            }`}
          >
            ❤️ {hasUserLiked ? 'Liked' : 'Like'} ({blog.likes})
          </button>
          <span className="text-blue-500">💬 {blog.comments} Comments</span>
        </div>
        <div className="border-t pt-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800" >Comments ({blogComments.length})</h2>

          {/* Add Comment Form */}
          {user ? (
            <form onSubmit={handleAddComment} className="mb-6">
              <div className="flex gap-4">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  rows="3"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors self-end"
                >
                  Comment
                </button>
              </div>
            </form>
          ) : (
            <p className="text-gray-500 mb-6">Please login to comment.</p>
          )}

          {/* Comments List */}
          {blogComments.length > 0 ? (
            blogComments.map((comment) => (
              <div key={comment.id} className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-3 mb-3">
                  <img
                    src={comment.photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                    alt={comment.author}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-medium">{comment.author}</p>
                      <p className="text-sm text-gray-500">{comment.date}</p>
                    </div>
                    <p className="text-gray-700">{comment.text}</p>
                  </div>
                </div>

                {/* Reply Button */}
                {user && (
                  <button
                    onClick={() => setReplyingTo(prev =>
                      prev.includes(comment.id)
                        ? prev.filter(id => id !== comment.id)
                        : [...prev, comment.id]
                    )}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Reply
                  </button>
                )}

                {/* Reply Form */}
                {replyingTo.includes(comment.id) && (
                  <form onSubmit={(e) => handleAddReply(comment.id, e)} className="mt-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={replyTexts[comment.id] || ""}
                        onChange={(e) => setReplyTexts(prev => ({ ...prev, [comment.id]: e.target.value }))}
                        placeholder="Write a reply..."
                        className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        required
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                      >
                        Reply
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setReplyingTo(prev => prev.filter(id => id !== comment.id));
                          setReplyTexts(prev => ({ ...prev, [comment.id]: "" }));
                        }}
                        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-4 ml-6 border-l-2 border-gray-300 pl-4">
                    <h4 className="text-sm font-medium text-gray-600 mb-2">Replies:</h4>
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="mb-2 p-2 bg-white rounded flex items-start gap-3">
                        <img
                          src={reply.photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                          alt={reply.author}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <p className="font-medium text-sm">{reply.author}</p>
                            <p className="text-xs text-gray-500">{reply.date}</p>
                          </div>
                          <p className="text-gray-600 text-sm">{reply.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No comments yet. Be the first to comment!</p>
          )}
        </div>
      </div>
    </div>
  );
}