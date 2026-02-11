import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Blogs() {
  const [blogs] = useState([
    {
      id: 1,
      title: "Understanding React Basics",
      author: "Yuvraj",
      content:
        "React is a JavaScript library used for building user interfaces. It is component-based and efficient.",
      likes: 12,
      comments: 4,
      date: "10 Feb 2026",
    },
    {
      id: 2,
      title: "Django REST Framework Guide",
      author: "Rahul",
      content:
        "Django REST Framework helps build secure and scalable APIs quickly using Python.",
      likes: 8,
      comments: 2,
      date: "09 Feb 2026",
    },
    {
      id: 3,
      title: "Full Stack Development Journey",
      author: "Admin",
      content:
        "Full stack development means working on frontend and backend technologies together.",
      likes: 20,
      comments: 7,
      date: "08 Feb 2026",
    },
    {
      id: 4,
      title: "Introduction to Node.js",
      author: "Priya",
      content:
        "Node.js allows you to run JavaScript on the server-side, enabling full-stack JavaScript development.",
      likes: 15,
      comments: 5,
      date: "07 Feb 2026",
    },
    {
      id: 5,
      title: "CSS Grid vs Flexbox",
      author: "Alex",
      content:
        "Learn the differences between CSS Grid and Flexbox for modern web layouts.",
      likes: 10,
      comments: 3,
      date: "06 Feb 2026",
    },
    {
      id: 6,
      title: "Machine Learning Basics",
      author: "Sam",
      content:
        "An overview of machine learning concepts and algorithms for beginners.",
      likes: 25,
      comments: 10,
      date: "05 Feb 2026",
    },
    {
      id: 7,
      title: "Machine Learning Basics",
      author: "Sam",
      content:
        "An overview of machine learning concepts and algorithms for beginners.",
      likes: 25,
      comments: 10,
      date: "05 Feb 2026",
    },
    {
      id: 8,
      title: "Machine Learning Basics",
      author: "Sam",
      content:
        "An overview of machine learning concepts and algorithms for beginners.",
      likes: 25,
      comments: 10,
      date: "05 Feb 2026",
    },
  ]);
  
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Show 6 blogs per page
  const totalPages = Math.ceil(blogs.length / itemsPerPage);
  const currentBlogs = blogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  
  return (
     <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        📰 Blog Feed
      </h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentBlogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300"
          >
            <h2 className="text-2xl font-semibold text-gray-800">
              {blog.title}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              By <span className="font-medium">{blog.author}</span> • {blog.date}
            </p>

            <p className="text-gray-600 mt-4">
              {blog.content}
            </p>

            <div className="flex justify-between items-center mt-6 text-sm text-gray-500">
              <div className="flex gap-4">
                <span className="hover:text-red-500 cursor-pointer transition">
                  ❤️ {blog.likes}
                </span>
                <span className="hover:text-blue-500 cursor-pointer transition">
                  💬 {blog.comments}
                </span>
              </div>

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
      <div className="flex justify-center mt-8 mb-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 mx-1 rounded-lg transition ${
              currentPage === index + 1
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
