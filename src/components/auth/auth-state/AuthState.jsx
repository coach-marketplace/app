import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Popover, Position } from "evergreen-ui";

import AuthMenu from "./auth-menu/AuthMenu";
import Avatar from "../../ui/avatar/Avatar";
import Button from "../../ui/button/Button";
import Spinner from "../../ui/loader/Spinner";
import * as actions from "../../../store/modules/auth/actions";

// TODO: refactor Popover as a UI component

const Container = styled.div`
  display: flex;
`;

const AuthState = ({
  isAutoLoginLoading,
  isAutoLoginSuccess,
  isAutoLoginError,
  authUser,
  logout
}) => {
  let content;

  if (isAutoLoginLoading && !isAutoLoginSuccess && !isAutoLoginError) {
    content = <Spinner size={16} />;
  } else if (authUser) {
    content = (
      <Popover
        position={Position.TOP_RIGHT}
        content={() => <AuthMenu logout={logout} />}
      >
        <Button appearance="minimal" height={48} iconAfter="caret-down">
          <Avatar name={`${authUser.first_name} ${authUser.last_name}`} />
        </Button>
      </Popover>
    );
  } else {
    content = (
      <Fragment>
        <Link to="/login">
          <Button label="Login" appearance="minimal" />
        </Link>
        <Link to="/register">
          <Button label="Register" appearance="minimal" />
        </Link>
      </Fragment>
    );
  }

  return <Container className="auth-state">{content}</Container>;
};

const mapStateToProps = state => {
  return {
    isAutoLoginLoading: state.auth.actions.auto_login.loading,
    isAutoLoginSuccess: state.auth.actions.auto_login.success,
    isAutoLoginError: state.auth.actions.auto_login.error,
    authUser: state.auth.authUser
  };
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actions.logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthState);
