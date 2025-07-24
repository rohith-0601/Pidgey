import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.js";

function Homepage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const user = state?.user || JSON.parse(localStorage.getItem("user"));

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user) {
    return <div className="text-center mt-5">No user data available.</div>;
  }

  return (
    <div className="container-fluid bg-light" style={{ height: "100vh",width:"100vw" }}>
      <div className="row h-100">
        <div className="col-12 d-flex justify-content-center align-items-center">
          <div
            className="card text-center shadow p-4"
            style={{ width: "350px", borderRadius: "15px" }}
          >
            <img
              src={
                user.picture ||
                user.photoURL ||
                "https://www.gravatar.com/avatar/?d=mp"
              }
              alt="profile"
              className="rounded-circle mx-auto"
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
              }}
            />
            <h3 className="mt-3">{user.name || user.displayName || "Guest User"}</h3>
            <p className="text-muted">{user.email || "guest@pidgey.com"}</p>
            <button className="btn btn-danger mt-3" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
