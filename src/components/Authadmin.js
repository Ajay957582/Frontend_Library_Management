import React from "react";
import { useNavigate } from "react-router-dom";
function Authadmin({ children, isAdmin }) {
  const navigate = useNavigate();
  return <>{isAdmin ? children : navigate("/")}</>;
}

export default Authadmin;
