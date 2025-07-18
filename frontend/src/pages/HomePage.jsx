import React from "react";

function Homepage() {
  const { state } = useLocation();
  const user = state?.user;
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) {
    return <div className="text-center mt-5">No user data available.</div>;
  }

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
      <div
        className="card text-center shadow p-4"
        style={{ width: "350px", borderRadius: "15px" }}
      >
        <img
          src={user.photoURL || "https://www.gravatar.com/avatar/?d=mp"}
          alt="profile"
          className="rounded-circle mx-auto"
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />
        <h3 className="mt-3">{user.displayName || "Guest User"}</h3>
        <p className="text-muted">
          {user.isGuest ? "guest@pidgey.com" : user.email}
        </p>
        <button className="btn btn-danger mt-3" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Homepage;
