import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import WorldMap from "../components/WorldMap";

function Homepage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const user = state?.user || JSON.parse(localStorage.getItem("user"));

  const [showDropdown, setShowDropdown] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("user");
    navigate("/");
  };

  const toggleDropdown = () => setShowDropdown(prev => !prev);

  const toggleMute = () => {
    if (streamRef.current) {
      streamRef.current.getAudioTracks().forEach(track => track.enabled = isMuted);
      setIsMuted(prev => !prev);
    }
  };

  const toggleVideo = () => {
    if (streamRef.current) {
      streamRef.current.getVideoTracks().forEach(track => track.enabled = videoOff);
      setVideoOff(prev => !prev);
    }
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        streamRef.current = stream;
      })
      .catch((err) => console.error("Error accessing webcam:", err));

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  if (!user) {
    return <div className="text-center mt-5">No user data available.</div>;
  }

  return (
    <div className="position-relative vh-100 vw-100 overflow-hidden bg-white text-dark">
      <WorldMap />

      {/* Overlay UI */}
      <div className="position-absolute top-0 start-0 w-100 h-100 p-4" style={{ zIndex: 2 }}>
        {/* Header */}
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div className="d-flex align-items-center gap-3">
            <img
              src={user.picture || user.photoURL || "https://www.gravatar.com/avatar/?d=mp"}
              alt="Profile"
              className="rounded-circle"
              style={{ width: "50px", height: "50px", objectFit: "cover", cursor: "pointer", border: "2px solid #000" }}
              onClick={toggleDropdown}
            />
            <h5 className="mb-0 fw-semibold">Welcome, {user.name || user.displayName || "Guest"}</h5>
            {showDropdown && (
              <div className="dropdown-menu show" style={{ position: "absolute", top: "60px", left: "10px", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.2)", backgroundColor: "white" }}>
                <button className="dropdown-item" disabled>Change Profile Photo</button>
                <button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>

        <div className="row h-100">
          {/* Video Section */}
          <div className="col-md-6 mb-4">
            <div className="h-100 p-4 bg-white rounded-4 shadow-sm d-flex flex-column justify-content-between">
              <div>
                <h5 className="mb-3 fw-semibold">Your Video Preview</h5>
                <div className="position-relative rounded overflow-hidden" style={{ backgroundColor: "#000", height: "300px" }}>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  {videoOff && (
                    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-75 text-white">
                      Video Off
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-3 d-flex gap-3">
                <button className="btn btn-outline-dark w-50" onClick={toggleMute}>
                  {isMuted ? "Unmute" : "Mute"}
                </button>
                <button className="btn btn-outline-dark w-50" onClick={toggleVideo}>
                  {videoOff ? "Turn Video On" : "Turn Video Off"}
                </button>
              </div>
              <div className="mt-3 d-flex gap-3">
                <button className="btn btn-primary w-50">Create Meeting</button>
                <button className="btn btn-primary w-50">Join Meeting</button>
              </div>
            </div>
          </div>

          {/* Calendar Section */}
          <div className="col-md-6 mb-4">
            <div className="h-100 p-4 bg-white rounded-4 shadow-sm">
              <h5 className="mb-3 fw-semibold">Schedule a Meeting</h5>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                inline
                calendarClassName="border rounded-3 w-100"
              />
              <button className="btn btn-warning w-100 mt-3">
                Schedule on {selectedDate.toDateString()}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
