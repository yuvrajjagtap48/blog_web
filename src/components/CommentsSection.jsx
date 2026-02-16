import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCommentCount } from "../utils/blogsSlice";
import { addComment, addReply } from "../utils/commentsSlice";

const CommentsSection = ({ blogId, user, comments }) => {
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState("");
  const [replyTexts, setReplyTexts] = useState({});
  const [replyingTo, setReplyingTo] = useState([]);

  const handleAddComment = (e) => {
    e.preventDefault();

    if (!newComment.trim()) {
      alert("Please enter a comment");
      return;
    }

    if (!user) {
      alert("Please login to add comments");
      return;
    }

    dispatch(addComment({
      blogId: blogId.toString(),
      author: user.firstName + " " + user.lastName,
      text: newComment.trim(),
      photoUrl: user.photoUrl,
    }));
    dispatch(updateCommentCount({ blogId: parseInt(blogId), increment: 1 }));
    setNewComment("");
  };

  const handleAddReply = (commentId, e) => {
    e.preventDefault();

    const text = replyTexts[commentId] || "";

    if (!text.trim()) {
      alert("Please enter a reply");
      return;
    }

    if (!user) {
      alert("Please login to add replies");
      return;
    }

    dispatch(addReply({
      blogId: blogId.toString(),
      commentId,
      author: user.firstName + " " + user.lastName,
      text: text.trim(),
      photoUrl: user.photoUrl,
    }));
    setReplyTexts(prev => ({ ...prev, [commentId]: "" }));
    setReplyingTo(prev => prev.filter(id => id !== commentId));
  };

  return (
    <div className="border-t pt-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Comments ({comments.length})
      </h2>

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
      {comments.length > 0 ? (
        comments.map((comment) => (
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
  );
};

export default CommentsSection;