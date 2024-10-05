import React from "react";
import { Navigate } from "react-router-dom";
import { getLocalStorage } from "./helpers/localStorage";
import { useFetch } from "./hooks/useFetch";

const Protected = ({ children }) => {
  const { data: user, error } = useFetch("/auth/user");
  const token = getLocalStorage("site");
  if (error || !token) return <Navigate to={"/login"} />;
  return <>{children}</>;
};

export default Protected;
