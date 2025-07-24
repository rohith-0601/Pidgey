import React from "react";
import { motion } from "motion/react";
import { auth, provider, signInWithPopup } from "../firebase.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer,cssTransition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginBox() {
  const NoAnimation = cssTransition({
  enter: "noanim",
  exit: "noanim",
  duration: 0,
});

  const navigate = useNavigate();
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

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      const response = await axios.post(
        "http://localhost:5001/api/verify-token",
        {
          token,
        }
      );

      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/home");
    } catch (error) {
      console.log(`${error.message}`);
    }
  };

  const handleGuestLogin = () => {
    toast.info(
      ({ closeToast }) => {
        let input;
        const submit = () => {
          const username = input?.value?.trim();
          if (!username) {
            toast.error("Username is required!");
            return;
          }
          const guestUser = {
            name: username,
            email: "guest@pidgey.com",
            isGuest: true,
            picture: "https://www.gravatar.com/avatar/?d=mp",
          };
          localStorage.setItem("user", JSON.stringify(guestUser));
          navigate("/home");
          closeToast();
        };

        setTimeout(() => {
          input = document.getElementById("guest-name-input");
          input?.focus();
        }, 100);

        return (
          <div className="glass-toast-form">
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
            <h5 className="mb-3">Enter your username:</h5>
            <input
              id="guest-name-input"
              type="text"
              placeholder="Your name"
              className="glass-input"
            />
            <button className="glass-button mt-3" onClick={submit}>
              Continue
            </button>
          </div>
        );
      },
      { autoClose: false, closeOnClick: false }
    );
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
          onClick={handleGoogleLogin}
        >
          <i className="bi bi-google me-2"></i> Login with Google
        </button>

        <button
          className="btn btn-outline-dark d-flex align-items-center justify-content-center py-2"
          style={buttonStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleGoogleLogin}
        >
          <i className="bi bi-envelope-fill me-2"></i> Login with Email
        </button>

        <button
          className="btn btn-secondary d-flex align-items-center justify-content-center py-2"
          style={{
            ...buttonStyle,
            backgroundColor: "#6c757d",
            color: "white",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleGuestLogin}
        >
          <i className="bi bi-person-circle me-2"></i> Continue as Guest
        </button>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={false}
        hideProgressBar
        draggable={false}
        closeOnClick={false}
        toastClassName="glass-toast"
        bodyClassName="glass-toast-body"
        icon={false}
        transition={NoAnimation}
      />
    </motion.div>
  );
}

export default LoginBox;
