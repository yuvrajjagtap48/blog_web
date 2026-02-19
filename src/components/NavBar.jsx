import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { setQuery } from "../utils/searchSlice";

const Navbar = ({ onNewBlogClick, onProfileClick }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const searchQuery = useSelector((store) => store.search.query);
  const [inputValue, setInputValue] = useState(searchQuery);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearchChange = (e) => {
    setInputValue(e.target.value);
  };

  // Debouncing: update Redux query after 300ms of no typing
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setQuery(inputValue));
    }, 300);
    return () => clearTimeout(timer);
  }, [inputValue, dispatch]);

  const handleLogout = () => {
    dispatch(removeUser());
    navigate("/login");
    setIsMenuOpen(false);
  };

  const handleProfileClick = () => {
    onProfileClick();
    setIsMenuOpen(false);
  };

  return (
    <div className="sticky top-0 z-50">
      <div className="navbar bg-base-100 shadow-lg backdrop-blur-md bg-white/80 border-b border-base-200">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            {isMenuOpen && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg"
              >
                <li>
                  <Link to="/" onClick={() => setIsMenuOpen(false)}>
                    Home
                  </Link>
                </li>
                {user && (
                  <>
                    <li>
                      <button onClick={onNewBlogClick}>Create New Blog</button>
                    </li>
                    <li>
                      <button onClick={handleProfileClick}>Profile</button>
                    </li>
                  </>
                )}
                <li>
                  {user ? (
                    <button onClick={handleLogout}>Logout</button>
                  ) : (
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      Login
                    </Link>
                  )}
                </li>
              </ul>
            )}
          </div>
          <Link to="/" className="btn btn-ghost text-xl font-bold text-primary">
            <svg
              className="w-6 h-6 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            BlogHub
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <div className="form-control">
            <input
              type="text"
              value={inputValue}
              onChange={handleSearchChange}
              placeholder="Search blogs..."
              className="input input-bordered w-80 focus:input-primary transition-all duration-300"
            />
          </div>
        </div>

        <div className="navbar-end gap-2">
          {/* Mobile Search */}
          <div className="form-control lg:hidden">
            <input
              type="text"
              value={inputValue}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="input input-bordered input-sm focus:input-primary"
            />
          </div>

          {user ? (
            <div className="flex items-center gap-2">
              {/* Create New Blog Button - Hidden on mobile */}
              <button
                onClick={onNewBlogClick}
                className="btn btn-outline btn-primary hidden sm:flex"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Blog
              </button>

              {/* User Dropdown */}
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      alt="Profile"
                      src={
                        user.photoUrl ||
                        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      }
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg"
                >
                  <li className="menu-title">
                    <span className="text-base-content">
                      {user.firstName} {user.lastName}
                    </span>
                  </li>
                  <li>
                    <button onClick={handleProfileClick}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profile
                    </button>
                  </li>
                  <li>
                    <button onClick={onNewBlogClick}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      New Blog
                    </button>
                  </li>
                  <li>
                    <hr className="my-1" />
                  </li>
                  <li>
                    <button onClick={handleLogout} className="text-error">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
