import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Pagination from "./Pagination";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const blogs = useSelector((state) => state.blogs);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const prevSearchQueryRef = useRef();

  const searchQuery = searchParams.get('q') || '';

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
        <mark key={index} className="bg-yellow-200 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  if (!searchQuery.trim()) {
    return (
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Search Results</h1>
          <p className="text-gray-600">Please enter a search term to find blogs.</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Back to All Blogs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Search Results
          </h1>
          <p className="text-center text-gray-600 mb-4">
            Found {filteredBlogs.length} result{filteredBlogs.length !== 1 ? 's' : ''} for "{searchQuery}"
          </p>
          <div className="text-center">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
            >
              Back to All Blogs
            </button>
          </div>
        </div>

        {filteredBlogs.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">No results found</h2>
            <p className="text-gray-600 mb-6">
              Try adjusting your search terms or browse all blogs.
            </p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Browse All Blogs
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    {highlightSearchTerm(blog.title, searchQuery)}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1 mb-4">
                    By <span className="font-medium">{blog.author}</span> • {blog.date}
                  </p>

                  <p className="text-gray-600 mt-4">
                    {truncateContent(blog.content)}
                  </p>

                  <div className="flex justify-end mt-6">
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      onClick={() => navigate(`/blog/${blog.id}`)}
                    >
                      Read More
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}