import { useNavigate, useLocation } from "react-router-dom";

const FloatingBackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    navigate(-1);
  };

  // Show back button on all pages except home
  const showBackButton = location.pathname !== "/";

  if (!showBackButton) return null;

  return (
    <button
      onClick={handleBack}
      className="fixed top-20 left-6 z-40 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
      title="Go Back"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-5 h-5 text-gray-700"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
        />
      </svg>
    </button>
  );
};

export default FloatingBackButton;