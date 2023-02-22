import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ authenticated, component }) => {
  return authenticated ? (
    <Navigate to="/" {...alert("잘못된 접근 입니다.")} />
  ) : (
    component
  );
};

export default PublicRoute;
