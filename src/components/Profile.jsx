import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../utils/userSlice";
import UserCard from "./UserCard";
import PhotoUploadInput from "./PhotoUploadInput";

const ProfileModal = ({ isOpen, onClose, user }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [showToast, setShowToast] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const updatedUser = {
      firstName,
      lastName,
      photoUrl,
      age,
      gender,
      about,
    };
    dispatch(updateUser(updatedUser));
    setShowToast(true);
    setIsSaving(false);
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

  if (!isOpen || !user) return null;

  return (
    <>
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-60 animate-bounce">
          <div className="alert alert-success shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 000 16zm0-6v6m0 0v6m0-6h6m-6 0H9" />
            </svg>
            <span>Profile saved successfully!</span>
          </div>
        </div>
      )}

      {/* Backdrop with blur */}
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" onClick={handleBackdropClick} />
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={handleBackdropClick}>
        <div className="bg-base-100 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-base-300" onClick={(e) => e.stopPropagation()}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-base-content">Edit Profile</h2>
              <button
                onClick={onClose}
                className="btn btn-ghost btn-circle"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Edit Form */}
              <div className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">First Name</span>
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="input input-bordered focus:input-primary transition-all duration-300 p-4"
                    placeholder="Enter your first name"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Last Name</span>
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="input input-bordered focus:input-primary transition-all duration-300 p-4"
                    placeholder="Enter your last name"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Age</span>
                  </label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="input input-bordered focus:input-primary transition-all duration-300 p-4"
                    placeholder="Enter your age"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Gender</span>
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="select select-bordered focus:select-primary transition-all duration-300 p-4"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">About</span>
                  </label>
                  <textarea
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    rows={4}
                    className="textarea textarea-bordered focus:textarea-primary transition-all duration-300 resize-none p-4"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Profile Photo</span>
                  </label>
                  <PhotoUploadInput onPhotoChange={setPhotoUrl} currentPhoto={photoUrl} />
                </div>
              </div>

              {/* User Card Preview */}
              <div className="flex justify-center lg:justify-start">
                <div className="sticky top-4">
                  <h3 className="text-lg font-semibold mb-4 text-base-content">Preview</h3>
                  <UserCard
                    user={{ firstName, lastName, age, gender, about, photoUrl }}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-base-300">
              <button
                onClick={onClose}
                className="btn btn-outline"
                disabled={isSaving}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                className={`btn btn-primary ${isSaving ? 'loading' : ''}`}
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileModal;