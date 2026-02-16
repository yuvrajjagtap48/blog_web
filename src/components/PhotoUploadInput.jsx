import { useState } from 'react';

const PhotoUploadInput = ({ onPhotoChange, currentPhoto }) => {
  const [uploadedPhoto, setUploadedPhoto] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const photoData = event.target.result;
        setUploadedPhoto(photoData);
        onPhotoChange(photoData);
      };
      reader.readAsDataURL(file);
    }
  };

  // Show uploaded photo if available, otherwise show current photo
  const displayPhoto = uploadedPhoto || currentPhoto;

  return (
    <div className="space-y-2">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="file-input file-input-bordered file-input-primary w-full max-w-xs"
      />
      {displayPhoto && (
        <div className="mt-2">
          <img src={displayPhoto} alt="Preview" className="w-20 h-20 object-cover rounded" />
        </div>
      )}
    </div>
  );
};

export default PhotoUploadInput;