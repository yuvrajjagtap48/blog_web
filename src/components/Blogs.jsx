import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { likeBlog } from "../utils/blogsSlice";
import { addLikedBlog } from "../utils/userSlice";
import Pagination from "./Pagination";

export default function Blogs() {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // add pagination for 6

  // pagination logic
  const totalPages = Math.ceil(blogs.length / itemsPerPage);
  const currentBlogs = blogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleLike = (blogId) => {
    if (user && !user.likedBlogs.includes(blogId)) {
      dispatch(likeBlog({ blogId, userId: user.id }));
      dispatch(addLikedBlog(blogId));
    }
  };

  // Function to truncate content to approximately 3-4 lines (about 250 characters)
  const truncateContent = (content, maxLength = 250) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength).trim() + "...";
  };

  return (
     <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
         Blog Feed
      </h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentBlogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300"
          >
            {blog.photoUrl && (
              <img
                src={blog.photoUrl}
                alt={blog.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            <h2 className="text-2xl font-semibold text-gray-800">
              {blog.title}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              By <span className="font-medium">{blog.author}</span> • {blog.date}
            </p>

            <p className="text-gray-600 mt-4">
              {truncateContent(blog.content)}
            </p>

            <div className="flex justify-between items-center mt-6 text-sm text-gray-500">
              <div className="flex gap-4">
                <button
                  onClick={() => handleLike(blog.id)}
                  disabled={!user}
                  className={`transition flex items-center gap-1 ${
                    user && user.likedBlogs.includes(blog.id)
                      ? 'text-gray-400 cursor-not-allowed'

                      : 'hover:text-red-500 cursor-pointer'
                  }`}
                >
                  ❤️ {blog.likes}
                </button>
                <span className="hover:text-blue-500 cursor-pointer transition flex items-center gap-1">
                  💬 {blog.comments}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  onClick={() => navigate(`/blog/${blog.id}`)}
                >
                  Read More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
