import React from "react";
import { useNavigate } from "react-router-dom";

function AuthUser({ children, tokenInBrowser }) {
  const navigate = useNavigate();
  return <>{tokenInBrowser ? children : navigate("/")}</>;
}

export default AuthUser;
