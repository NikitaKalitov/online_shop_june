import * as React from "react";
import { useAuthStore } from "../stores/authStore";
import { Navigate } from "react-router-dom";

export const RequireAuth = ({ children }) => {
  const token = useAuthStore((state) => state.token);

  if (token == null) {
    return <Navigate to={"/login"} replace={true} />;
  }

  return { children };
};
