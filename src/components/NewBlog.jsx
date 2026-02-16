import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBlog } from '../utils/blogsSlice';
import { updateField, resetForm } from '../utils/newBlogFormSlice';
import { formatDate } from '../utils/dateUtils';
import PhotoUploadInput from './PhotoUploadInput';

const NewBlog = ({ isOpen, onClose }) => {
  const formData = useSelector((state) => state.newBlogForm);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

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
      content: formData.detailInfo,
      photoUrl: formData.photo,
      userId: user?.id,
      likes: 0,
      comments: 0,
      date: currentDate,
    };

    dispatch(addBlog(newBlog));
    dispatch(resetForm());
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      onClose();
    }, 2000);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-60">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Blog created successfully!</span>
          </div>
        </div>
      )}

      {/* Backdrop with blur */}
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" onClick={handleBackdropClick} />
      <div className="fixed inset-0 flex items-center justify-center z-50" onClick={handleBackdropClick}>
        <div className="bg-white/95 backdrop-blur-xl rounded-lg shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto border border-white/20" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex justify-end items-center mb-6">
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
            >
              ×
            </button>
          </div>

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
            <div>
              <label className="block text-sm font-medium text-gray-700">Blog Photo</label>
              <PhotoUploadInput 
                onPhotoChange={(photo) => dispatch(updateField({ field: 'photo', value: photo }))} 
                currentPhoto={formData.photo}
              />
            </div>
            <div className="text-sm text-gray-600">
              <p>Created Date: {formatDate(new Date())}</p>
            </div>
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Create Blog
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default NewBlog;