import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import { Title, toaster } from "../../components/ui";
import Layout from "../../components/layout/main-page-layout/MainPageLayout";
import LoginForm from "../../components/auth/login-form/LoginForm";
import * as actions from "../../store/modules/auth/actions";

const LoginPage = ({
  isLoginError,
  isLoginLoading,
  isLoginSuccess,
  user,
  history,
  login,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isLoginLoading && isLoginSuccess) {
      window.location = "/";
    } else if (!isLoginLoading && isLoginError) {
      toaster.danger("Email or password incorrect");
    }
  }, [isLoginError, isLoginLoading, isLoginSuccess]);

  const onSubmit = (data) => {
    setIsLoading(true);
    login(data);
  };

  const goToRegisterPage = () => history.push("/register");

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <Layout
      main={
        <>
          <Title>Login</Title>
          <LoginForm
            onSubmit={onSubmit}
            onRegister={goToRegisterPage}
            isLoading={isLoading}
          />
        </>
      }
    />
  );
};

const mapStateToProps = (state) => ({
  isLoginError: state.auth.actions.login.error,
  isLoginLoading: state.auth.actions.login.loading,
  isLoginSuccess: state.auth.actions.login.success,
  user: state.user.current,
});

const mapDispatchToProps = (dispatch) => ({
  login: (data) => dispatch(actions.login(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
