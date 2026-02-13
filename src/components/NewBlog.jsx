import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBlog } from '../utils/blogsSlice';
import { updateField, resetForm } from '../utils/newBlogFormSlice';
import { useNavigate } from 'react-router-dom';

const NewBlog = () => {
  const formData = useSelector((state) => state.newBlogForm);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to format date as "9 Feb 2026" (no leading zero for day)
  const formatDate = (date) => {
    const d = new Date(date);
    const day = d.getDate(); // No leading zero
    const month = d.toLocaleString('en-US', { month: 'short' });
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateField({ field: name, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = formatDate(new Date());
    const newBlog = {
      title: formData.title,
      author: formData.author,
      photoUrl: formData.photoUrl,
      content: formData.detailInfo,
      likes: 0,
      comments: 0,
      date: currentDate,
      createdDate: currentDate,
      lastModify: currentDate,
    };
    dispatch(addBlog(newBlog));
    dispatch(resetForm()); // Reset form after successful submission
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Create New Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-600"
          />
        </div>
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author Name</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-600"
          />
        </div>
        <div>
          <label htmlFor="photoUrl" className="block text-sm font-medium text-gray-700">Photo URL</label>
          <input
            type="url"
            id="photoUrl"
            name="photoUrl"
            value={formData.photoUrl}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-600"
          />
        </div>
        <div>
          <label htmlFor="detailInfo" className="block text-sm font-medium text-gray-700">Detail Info</label>
          <textarea
            id="detailInfo"
            name="detailInfo"
            value={formData.detailInfo}
            onChange={handleChange}
            required
            rows="6"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-600"
          />
        </div>
        <div className="text-sm text-gray-600">
          <p>Created Date: {formatDate(new Date())}</p>
          <p>Last Modified: {formatDate(new Date())}</p>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default NewBlog;
