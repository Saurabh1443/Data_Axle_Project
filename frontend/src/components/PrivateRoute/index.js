import React from "react";
import { Navigate } from "react-router-dom";

const index = ({ children }) => {
  const creds = localStorage.getItem("email");
  return creds ? children : <Navigate to="/" />;
};

export default index;