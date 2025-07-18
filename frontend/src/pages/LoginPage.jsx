import React, { useEffect } from 'react';
import WorldMap from "../components/WorldMap";
import LoginBox from "../components/LoginBox";
import { useNavigate } from 'react-router-dom';
import { handleRedirectResult } from '../utils/utils';

function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    handleRedirectResult().then((user) => {
      if (user) {
        navigate("/home", { state: { user } });
      }
    });
  }, []);

  return ( 
    <div className="position-relative vh-100 vw-100 overflow-hidden bg-white">
      <WorldMap />
      <div className="position-absolute top-50 start-50 translate-middle text-center">
        <LoginBox />
      </div>
    </div>
  );
}

export default LoginPage;
