import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { likeBlog, deleteBlog } from "../utils/blogsSlice";
import { addLikedBlog } from "../utils/userSlice";
import CommentsSection from "./CommentsSection";

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const comments = useSelector((state) => state.comments);
  const user = useSelector((state) => state.user);

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

  const handleDelete = () => {
    if (user && blog.userId === user.id && window.confirm('Are you sure you want to delete this blog?')) {
      dispatch(deleteBlog({ blogId: blog.id }));
      navigate('/'); // Navigate back to home after deletion
    }
  };

  const hasUserLiked = user && user.likedBlogs.includes(blog.id);

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
          {user && blog.userId === user.id && (
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              🗑️ Delete Blog
            </button>
          )}
          <span className="text-blue-500">💬 {blog.comments} Comments</span>
        </div>
        <CommentsSection
          blogId={id}
          user={user}
          comments={blogComments}
        />
      </div>
    </div>
  );
}