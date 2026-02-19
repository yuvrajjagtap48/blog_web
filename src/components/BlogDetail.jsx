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
    return (
      <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-100 py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="alert alert-error shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Blog not found!</span>
          </div>
          <button
            onClick={() => navigate('/')}
            className="btn btn-primary mt-4"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleLike = () => {
    if (user && !user.likedBlogs.includes(blog.id)) {
      dispatch(likeBlog({ blogId: blog.id, userId: user.id }));
      dispatch(addLikedBlog(blog.id));
    }
  };

  const handleDelete = () => {
    const canDelete = user && (
      (blog.userId && blog.userId === user.id) ||
      (!blog.userId && blog.author === `${user.firstName} ${user.lastName}`.trim()) ||
      (!blog.userId && blog.author === user.firstName)
    );

    if (canDelete && window.confirm('Are you sure you want to delete this blog?')) {
      dispatch(deleteBlog({ blogId: blog.id }));
      navigate('/');
    }
  };

  const canDelete = user && (
    (blog.userId && blog.userId === user.id) ||
    (!blog.userId && blog.author === `${user.firstName} ${user.lastName}`.trim()) ||
    (!blog.userId && blog.author === user.firstName)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <article className="card bg-base-100 shadow-2xl">
          {blog.photoUrl && (
            <figure className="px-6 pt-6">
              <img
                src={blog.photoUrl}
                alt={blog.title}
                className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
              />
            </figure>
          )}

          <div className="card-body">
            <h1 className="card-title text-4xl font-bold text-base-content mb-4">
              {blog.title}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="avatar">
                <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    alt="Author"
                  />
                </div>
              </div>
              <div>
                <p className="font-semibold text-base-content">{blog.author}</p>
                <p className="text-sm text-base-content/70">{blog.date}</p>
              </div>
            </div>

            <div className="prose prose-lg max-w-none text-base-content mb-8">
              {blog.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleLike}
                  disabled={!user}
                  className={`btn ${
                    user && user.likedBlogs.includes(blog.id)
                      ? 'btn-error'
                      : 'btn-outline btn-error'
                  } gap-2`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  {blog.likes}
                </button>

                <div className="stat">
                  <div className="stat-figure text-secondary">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div className="stat-value text-secondary text-lg">{blog.comments}</div>
                  <div className="stat-desc">Comments</div>
                </div>
              </div>

              {canDelete && (
                <button
                  onClick={handleDelete}
                  className="btn btn-outline btn-error gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete Blog
                </button>
              )}
            </div>
          </div>
        </article>

        <div className="mt-8">
          <CommentsSection
            blogId={id}
            user={user}
            comments={blogComments}
          />
        </div>
      </div>
    </div>
  );
}