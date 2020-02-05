import React from "react";
import "./header.css";

import AuthState from "../../../auth/auth-state/AuthState";
import Logo from "../../logo/Logo";
import Navigation from "../../navigation/Navigation";

const Header = () => {
  return (
    <header className="header">
      <Logo />
      <Navigation />
      <AuthState />
    </header>
  );
};

export default Header;
