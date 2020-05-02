import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";

import { Container } from "./styled";
import {
  register as registerUser,
  login as loginUser,
  cleanRegister,
  cleanLogin,
} from "../../store/modules/auth/actions";
import { Title, toaster, Text } from "../../components/ui";
import Layout from "../../components/layout/main-page-layout/MainPageLayout";
import OAuthForm from "../../components/auth/o-auth-form/OAuthForm";
import RegisterForm from "../../components/auth/register-form/RegisterForm";

const RegisterPage = ({
  cleanRegisterStore,
  cleanLoginStore,
  history,
  isRegisterLoading,
  isRegisterError,
  isRegisterSuccess,
  isLoginLoading,
  isLoginError,
  isLoginSuccess,
  login,
  register,
  user,
}) => {
  const [loginData, setLoginData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isRegisterLoading && isRegisterError) {
      toaster.danger("Error during registration");
      setIsLoading(false);
      cleanRegisterStore();
    } else if (!isRegisterLoading && isRegisterSuccess) {
      login(loginData);
    }
  }, [
    cleanRegisterStore,
    isRegisterError,
    isRegisterLoading,
    isRegisterSuccess,
    login,
    loginData,
  ]);

  useEffect(() => {
    if (!isLoginLoading && isLoginError) {
      toaster.danger("Error during authentication, try to login");
      setIsLoading(false);
      cleanLoginStore();
    } else if (!isLoginLoading && isLoginSuccess) {
      window.location = "/";
    }
  }, [cleanLoginStore, isLoginError, isLoginLoading, isLoginSuccess]);

  const onSubmit = (data) => {
    setLoginData({ email: data.email, password: data.password });
    register(data);
  };

  const goToLoginPage = () => {
    history.push("/login");
  };

  if (user) return <Redirect to="/" />;

  return (
    <Layout
      main={
        <Container>
          <Title>Register</Title>
          <OAuthForm title="Register with:" />
          <Text marginTop={30} marginBottom={30}>
            — or —
          </Text>
          <RegisterForm
            onLogin={goToLoginPage}
            onSubmit={onSubmit}
            isLoading={isLoading}
          />
        </Container>
      }
    />
  );
};

const mapStateToProps = (state) => ({
  isRegisterLoading: state.auth.actions.register.loading,
  isRegisterError: state.auth.actions.register.error,
  isRegisterSuccess: state.auth.actions.register.success,
  isLoginLoading: state.auth.actions.login.loading,
  isLoginError: state.auth.actions.login.error,
  isLoginSuccess: state.auth.actions.login.success,
  user: state.user.current,
});

const mapDispatchToProps = (dispatch) => ({
  register: (data) => dispatch(registerUser(data)),
  login: (data) => dispatch(loginUser(data)),
  cleanLoginStore: () => dispatch(cleanLogin()),
  cleanRegisterStore: () => dispatch(cleanRegister()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
