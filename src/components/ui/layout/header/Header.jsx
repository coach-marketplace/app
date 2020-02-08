import React, { Fragment } from "react";

import AuthState from "../../../auth/auth-state/AuthState";
import Logo from "../../logo/Logo";
import Navigation from "../../navigation/Navigation";
import { RightContainer } from "./styled";

const Header = () => {
  return (
    <Fragment>
      <Logo />
      <RightContainer>
        <Navigation />
        <AuthState />
      </RightContainer>
    </Fragment>
  );
};

export default Header;
