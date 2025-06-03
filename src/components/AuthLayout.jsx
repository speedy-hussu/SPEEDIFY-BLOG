import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AuthLayout({ children, auth = true }) {
  const navigate = useNavigate();
  const [load, setLoad] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);
  useEffect(() => {
    if (auth && authStatus != auth) {
      navigate("/login");
    } else if (!auth && authStatus !== auth) {
      navigate("/");
    }
    setLoad(false);
  }, []);

  return load ? <h1>Loading</h1> : <>{children}</>;
}

export default AuthLayout;
