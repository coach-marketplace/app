import React, { Fragment } from "react";
import { connect } from "react-redux";

import AuthState from "../../auth/auth-state/AuthState";
import Logo from "../../ui/logo/Logo";
import Navigation from "../../navigation/Navigation";
import { RightContainer } from "./styled";

const Header = ({ user }) => {
  return (
    <Fragment>
      <Logo />
      <RightContainer>
        {user && <Navigation />}
        <AuthState />
      </RightContainer>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.current,
  };
};

export default connect(mapStateToProps)(Header);
