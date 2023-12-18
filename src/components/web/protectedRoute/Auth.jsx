import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/user.jsx";

function Auth({ children }) {
  const {isLoggedIn} = useContext(UserContext);
  if (isLoggedIn) {
    return <Navigate to={"/"} />;
  }

  return children;
}

export default Auth;
