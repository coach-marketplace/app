import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import { Container } from "./styled";
import { Title, toaster, Text } from "../../components/ui";
import Layout from "../../components/layout/main-page-layout/MainPageLayout";
import OAuthForm from "../../components/auth/o-auth-form/OAuthForm";
import LoginForm from "../../components/auth/login-form/LoginForm";
import * as actions from "../../store/modules/auth/actions";

const LoginPage = ({
  isLoginError,
  isLoginLoading,
  isLoginSuccess,
  user,
  history,
  login,
  cleanLoginStore,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isLoginLoading && isLoginSuccess) {
      window.location = "/";
    } else if (!isLoginLoading && isLoginError) {
      toaster.danger("Email or password incorrect");
      setIsLoading(false);
      cleanLoginStore();
    }
  }, [cleanLoginStore, isLoginError, isLoginLoading, isLoginSuccess]);

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
        <Container>
          <Title>Login</Title>
          <OAuthForm title="Connect with:" />
          <Text marginTop={30} marginBottom={30}>
            — or —
          </Text>
          <LoginForm
            onSubmit={onSubmit}
            onRegister={goToRegisterPage}
            isLoading={isLoading}
          />
        </Container>
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
  cleanLoginStore: () => dispatch(actions.cleanLogin()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
