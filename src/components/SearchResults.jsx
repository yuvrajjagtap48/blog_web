import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Pagination from "./Pagination";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const blogs = useSelector((state) => state.blogs);
  const reduxQuery = useSelector((state) => state.search.query);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const prevSearchQueryRef = useRef();

  const searchQuery = searchParams.get('q') || reduxQuery || '';

  // Filter blogs based on search query
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Reset to page 1 when search query changes
  useEffect(() => {
    if (prevSearchQueryRef.current !== searchQuery) {
      setCurrentPage(1); // eslint-disable-line react-hooks/set-state-in-effect
      prevSearchQueryRef.current = searchQuery;
    }
  }, [searchQuery]);
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const currentBlogs = filteredBlogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Function to truncate content to approximately 3-4 lines (about 250 characters)
  const truncateContent = (content, maxLength = 250) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength).trim() + "...";
  };

  // Highlight search terms in text
  const highlightSearchTerm = (text, searchTerm) => {
    if (!searchTerm.trim()) return text;

    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-warning px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  if (!searchQuery.trim()) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-100 py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="hero">
            <div className="hero-content text-center">
              <div>
                <svg className="w-24 h-24 mx-auto text-base-content/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h1 className="text-3xl font-bold text-base-content mb-4">Search Results</h1>
                <p className="text-base-content/70 mb-6">Please enter a search term to find blogs.</p>
                <button
                  onClick={() => navigate('/')}
                  className="btn btn-primary"
                >
                  Back to All Blogs
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-base-content mb-2">
            Search Results
          </h1>
          <p className="text-lg text-base-content/70 mb-4">
            Found <span className="font-semibold text-primary">{filteredBlogs.length}</span> result{filteredBlogs.length !== 1 ? 's' : ''} for "{searchQuery}"
          </p>
          <button
            onClick={() => navigate('/')}
            className="btn btn-outline btn-primary"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to All Blogs
          </button>
        </div>

        {filteredBlogs.length === 0 ? (
          <div className="text-center py-12">
            <div className="hero">
              <div className="hero-content text-center">
                <div>
                  <svg className="w-24 h-24 mx-auto text-base-content/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-.966-5.5-2.5m13.5 2.5a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h2 className="text-2xl font-bold text-base-content mb-2">No results found</h2>
                  <p className="text-base-content/70 mb-6">
                    Try adjusting your search terms or browse all blogs.
                  </p>
                  <button
                    onClick={() => navigate('/')}
                    className="btn btn-primary"
                  >
                    Browse All Blogs
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
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
                      {highlightSearchTerm(blog.title, searchQuery)}
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

            {totalPages > 1 && (
              <div className="flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}