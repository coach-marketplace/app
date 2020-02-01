import React from "react";
import "./header.css";

import AuthState from "../../../auth/auth-state/AuthState";
import Logo from "../../logo/Logo";

const Header = () => {
  return (
    <header className="header">
      <Logo />
      <AuthState />
    </header>
  );
};

export default Header;
