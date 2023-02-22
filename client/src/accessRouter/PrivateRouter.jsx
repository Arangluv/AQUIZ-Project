import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ authenticated, component }) => {
  return authenticated ? (
    component
  ) : (
    <Navigate to="/login" {...alert("로그인 후 이용해주세요")} />
  );
};

export default PrivateRoute;
