import React, { Fragment } from "react";
import { connect } from "react-redux";

import AuthState from "../../auth/auth-state/AuthState";
import Logo from "../../ui/logo/Logo";
import Navigation from "../../navigation/Navigation";
import { RightContainer } from "./styled";

const Header = ({ authUser }) => {
  return (
    <Fragment>
      <Logo />
      <RightContainer>
        {authUser && <Navigation />}
        <AuthState />
      </RightContainer>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    authUser: state.auth.authUser,
  };
};

export default connect(mapStateToProps)(Header);
