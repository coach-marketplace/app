import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";

import {
  register as registerUser,
  login as loginUser,
} from "../../store/modules/auth/actions";
import { Title, toaster, Button } from "../../components/ui";
import Layout from "../../components/layout/main-page-layout/MainPageLayout";
import RegisterForm from "../../components/auth/register-form/RegisterForm";

const RegisterPage = ({
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
    } else if (!isRegisterLoading && isRegisterSuccess) {
      login(loginData);
    }
  }, [isRegisterError, isRegisterLoading, isRegisterSuccess, login, loginData]);

  useEffect(() => {
    if (!isLoginLoading && isLoginError) {
      toaster.danger("Error during authentication, try to login");
    } else if (!isLoginLoading && isLoginSuccess) {
      window.location = "/";
    }
  }, [isLoginError, isLoginLoading, isLoginSuccess]);

  const onSubmit = (data) => {
    setLoginData({ email: data.email, password: data.password });
    register(data);
  };

  const onRegisterWithGoogle = () => {
    console.log("google");
  };

  const goToLoginPage = () => {
    history.push("/login");
  };

  if (user) return <Redirect to="/" />;

  return (
    <Layout
      main={
        <>
          <Title>Register</Title>
          <Button onClick={onRegisterWithGoogle}>Register google</Button>
          <RegisterForm
            onLogin={goToLoginPage}
            onSubmit={onSubmit}
            isLoading={isLoading}
          />
        </>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
