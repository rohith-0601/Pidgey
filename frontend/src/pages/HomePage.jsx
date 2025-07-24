import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.js";

function Homepage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const user = state?.user || JSON.parse(localStorage.getItem("user"));

  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("user");
    navigate("/");
  };

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  if (!user) {
    return <div className="text-center mt-5">No user data available.</div>;
  }

  return (
    <div className="container-fluid bg-light" style={{ minHeight: "100vh", width: "100vw" }}>
      {/* Top Header Section */}
      <div className="d-flex align-items-center p-4" style={{ gap: "1rem", position: "relative" }}>
        {/* Profile Picture and Dropdown */}
        <div style={{ position: "relative" }}>
          <img
            src={user.picture || user.photoURL || "https://www.gravatar.com/avatar/?d=mp"}
            alt="Profile"
            className="rounded-circle"
            style={{
              width: "50px",
              height: "50px",
              objectFit: "cover",
              cursor: "pointer",
              border: "2px solid #333",
            }}
            onClick={toggleDropdown}
          />
          {showDropdown && (
            <div
              className="dropdown-menu show"
              style={{
                display: "block",
                position: "absolute",
                top: "60px",
                left: 0,
                borderRadius: "10px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
                backgroundColor: "white",
              }}
            >
              <button className="dropdown-item" disabled>
                Change Profile Photo
              </button>
              <button className="dropdown-item text-danger" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Welcome Message */}
        <div>
          <h2 className="mb-1">Welcome {user.name || user.displayName || "Guest"}!</h2>
          <p className="text-muted mb-0">This is your homepage. Add your components below.</p>
        </div>
      </div>

      {/* Page Content Area */}
      <div className="p-4">
        {/* Your other components go here */}
      </div>
    </div>
  );
}

export default Homepage;
