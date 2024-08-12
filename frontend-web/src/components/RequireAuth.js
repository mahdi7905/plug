import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/auth" />;
  }
  if (user?.role === "admin") {
    return <Navigate to="/admin" />;
  }
  return children;
};

export default RequireAuth;
