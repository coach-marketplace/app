import React from "react";
import { Link } from "react-router-dom";

import "./logo.css";

const Logo = () => {
  return (
    <div className="logo">
      <Link to="/">Logo</Link>
    </div>
  );
};

export default Logo;
