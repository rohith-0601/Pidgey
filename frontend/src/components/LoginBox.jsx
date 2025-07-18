import React from "react";
import { motion } from "motion/react";

function LoginBox() {
  const buttonStyle = {
    backgroundColor: "white",
    color: "black",
    fontWeight: 500,
    width: "300px",
    borderRadius: "10px",
    transition: "transform 0.2s ease",
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = "scale(1.05)";
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "scale(1)";
  };

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="text-center text-dark"
    >
      <h1 className="fw-bold mb-4 fs-1 d-flex align-items-center justify-content-center gap-2">
        Pidgey
        <img
          src="https://img.icons8.com/?size=100&id=BbDkxr2uDW9h&format=png&color=000000"
          alt="bird"
          style={{
            height: "4rem",
            width: "4rem",
            objectFit: "contain",
            marginBottom: "5px", 
          }}
        />
      </h1>

      <div className="d-grid gap-3">
        <button
          className="btn btn-outline-dark d-flex align-items-center justify-content-center py-2"
          style={buttonStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <i className="bi bi-google me-2"></i> Login with Google
        </button>

        <button
          className="btn btn-outline-dark d-flex align-items-center justify-content-center py-2"
          style={buttonStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <i className="bi bi-envelope-fill me-2"></i> Login with Email
        </button>

        <button
          className="btn btn-secondary d-flex align-items-center justify-content-center py-2"
          style={{
            ...buttonStyle,
            backgroundColor: "#6c757d", // Bootstrap secondary color
            color: "white",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <i className="bi bi-person-circle me-2"></i> Continue as Guest
        </button>
      </div>
    </motion.div>
  );
}

export default LoginBox;
