// PrivateRoute.js
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../src/context/userContext";

const PrivateRoute = ({ component }) => {
  const { user } = useContext(UserContext);

  if (!user) {
    // If user is not authenticated, redirect to the login page
    return <Navigate to="/" replace />;
  }

  // If user is authenticated, render the protected route
  return component;
};

export default PrivateRoute;
