import React from 'react';
import WorldMap from "../components/WorldMap";
import LoginBox from "../components/LoginBox";


function LoginPage() {
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