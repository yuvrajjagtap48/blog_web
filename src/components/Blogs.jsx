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
  const itemsPerPage = 6;

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
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-base-content mb-4 animate-fade-in">
            Blog Feed
          </h1>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Discover amazing stories and insights from our community of writers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentBlogs.map((blog, index) => (
            <div
              key={blog.id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {blog.photoUrl && (
                <figure className="px-6 pt-6">
                  <img
                    src={blog.photoUrl}
                    alt={blog.title}
                    className="w-full h-48 object-cover rounded-xl shadow-lg"
                  />
                </figure>
              )}
              <div className="card-body">
                <h2 className="card-title text-xl font-bold text-base-content line-clamp-2">
                  {blog.title}
                </h2>

                <div className="flex items-center gap-3 mb-4">
                  <div className="avatar">
                    <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        alt="Author"
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-base-content truncate">
                      {blog.author}
                    </p>
                    <p className="text-xs text-base-content/60">
                      {blog.date}
                    </p>
                  </div>
                </div>

                <p className="text-base-content/80 text-sm leading-relaxed mb-4 line-clamp-3">
                  {truncateContent(blog.content)}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleLike(blog.id)}
                      disabled={!user}
                      className={`btn btn-sm ${
                        user && user.likedBlogs.includes(blog.id)
                          ? 'btn-error'
                          : 'btn-outline btn-error'
                      } gap-1`}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                      {blog.likes}
                    </button>

                    <div className="flex items-center gap-1 text-base-content/60">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span className="text-sm">{blog.comments}</span>
                    </div>
                  </div>

                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate(`/blog/${blog.id}`)}
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {blogs.length === 0 && (
          <div className="text-center py-12">
            <div className="hero">
              <div className="hero-content text-center">
                <div>
                  <svg className="w-24 h-24 mx-auto text-base-content/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h2 className="text-2xl font-bold text-base-content mb-2">No blogs yet</h2>
                  <p className="text-base-content/70 mb-6">
                    Be the first to share your thoughts and create an amazing blog post!
                  </p>
                  {user && (
                    <button className="btn btn-primary">
                      Create Your First Blog
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {blogs.length > 0 && (
          <div className="flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}
