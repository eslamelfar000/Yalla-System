import React from "react";
import { Navigate } from "react-router-dom";
import useAuthToken from "@/hooks/use-auth-token";

const ProtectedRoute = ({ children }) => {
  const { getToken } = useAuthToken();
  const token = getToken();

  // Check if user is authenticated
  if (!token) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
