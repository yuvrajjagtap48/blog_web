import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { useState } from "react";

const Navbar = ({ onNewBlogClick, onProfileClick }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const getSearchResults = async () => {
    const data = await fetch(`http://localhost:3000/blogs?q=${searchQuery}`);
    const json = await data.json();
    console.log(json);
    
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        getSearchResults();
      }
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery, getSearchResults]);
  const handleLogout = () => {
    dispatch(removeUser());
    navigate("/login");
  };

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1 flex items-center gap-2">
          <Link to="/" className="btn btn-ghost text-xl">
            Blog
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative search-container">
            <input
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} 
              onKeyPress={handleSearchSubmit}
              placeholder="Search blogs..." 
              className="input input-bordered w-24 md:w-auto pr-10"
            />

            <button
              onClick={() => {
                if (searchQuery.trim()) {
                  navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                  setSearchQuery("");
                }
              }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 btn btn-ghost btn-circle btn-sm" 
              title={searchQuery.trim() ? "Search" : "Clear"} >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4" >
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>
          </div>

          {user ? (
            <div className="flex items-center gap-2">
              {/* Create New Blog Link */}
              <button
                onClick={onNewBlogClick}
                className="btn btn-outline btn-primary"
              >
                Create New Blog
              </button>

              {/* Profile Avatar - Clickable */}
              <div
                onClick={onProfileClick}
                className="btn btn-ghost btn-circle avatar cursor-pointer" title="Profile"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Profile"
                    src={
                      user.photoUrl ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                  />
                </div>
              </div>

              {/* Logout Icon */}
              <button
                onClick={handleLogout}
                className="btn btn-ghost btn-circle" title="Logout" >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"/>
                </svg>
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
