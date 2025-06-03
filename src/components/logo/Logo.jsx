import React from "react";
import logo from "../../assets/app-logo.png";
function Logo({ height = "50px", width = "auto" }) {
  return <img src={logo} height={height} width={width} />;
}

export default Logo;
