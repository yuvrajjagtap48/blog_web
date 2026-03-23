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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateField({ field: name, value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

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
    setIsSubmitting(false);
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
        <div className="fixed top-4 right-4 z-60 animate-bounce">
          <div className="alert alert-success shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 000 16zm0-6v6m0 0v6m0-6h6m-6 0H9" />
            </svg>
            <span>Blog created successfully!</span>
          </div>
        </div>
      )}

      {/* Backdrop with blur */}
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" onClick={handleBackdropClick} />
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={handleBackdropClick}>
        <div className="bg-base-100 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-base-300" onClick={(e) => e.stopPropagation()}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-base-content">Create New Blog</h2>
              <button
                onClick={onClose}
                className="btn btn-ghost btn-circle"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="label w-32 flex-shrink-0">
                  <span className="label-text font-medium">Blog Title</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="input input-bordered focus:input-primary transition-all duration-300 p-4 flex-1"
                  placeholder="Enter an engaging title"
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="label w-32 flex-shrink-0">
                  <span className="label-text font-medium">Author Name</span>
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                  className="input input-bordered focus:input-primary transition-all duration-300 p-4"
                  placeholder="Your name or pen name"
                />
              </div>

              <div className="flex items-start gap-4">
                <label className="label w-32 flex-shrink-0 pt-2">
                  <span className="label-text font-medium">Blog Content</span>
                </label>
                <textarea
                  name="detailInfo"
                  value={formData.detailInfo}
                  onChange={handleChange}
                  required
                  rows="8"
                  className="textarea textarea-bordered focus:textarea-primary transition-all duration-300 resize-none p-4 flex-1"
                  placeholder="Share your thoughts, stories, and insights..."
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="label w-32 flex-shrink-0">
                  <span className="label-text font-medium">Blog Image</span>
                </label>
                <div className="flex-1">
                  <PhotoUploadInput
                    onPhotoChange={(photo) => dispatch(updateField({ field: 'photo', value: photo }))}
                    currentPhoto={formData.photo}
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 btn btn-outline"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`flex-1 btn btn-primary ${isSubmitting ? 'loading' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating...' : 'Create Blog'}
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