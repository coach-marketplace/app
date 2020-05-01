import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import queryString from "query-string";

import { Title, toaster, Button } from "../../components/ui";
import Layout from "../../components/layout/main-page-layout/MainPageLayout";
import LoginForm from "../../components/auth/login-form/LoginForm";
import * as actions from "../../store/modules/auth/actions";

/**
 * Get Filtered Query String
 *
 * When we redirect to the backend endpoint to connect with OAuth, we send
 * the url containing the query string, but if we allow everything, the user
 * can introduce data. To control that, we filter query string and only send
 * the requestUrl.
 * It also prevent to send the token and have some conflict
 *
 * @param {string} search Search part of the url
 * @return {string} The allowed queryString for the login with OAuth
 */
const getFilteredQueryString = (search) => {
  const parsed = queryString.parse(search);
  const filtered = {};
  parsed.requestUri && (filtered.requestUri = parsed.requestUri);

  const qs = queryString.stringify(filtered);

  return qs ? `?${qs}` : "";
};

const LoginPage = ({
  isLoginError,
  isLoginLoading,
  isLoginSuccess,
  user,
  history,
  login,
  location,
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

  const onLoginWithGoogle = () => {
    const { pathname, search } = location;
    /**
     * Don't forget to remove the last `/` from the base url
     */
    const completeCurrentUrl = `${process.env.REACT_APP_BASE_URL.slice(
      0,
      -1
    )}${pathname}${getFilteredQueryString(search)}`;

    window.location = `${process.env.REACT_APP_API_URL}v1/auth/login-google?isCoach=true&redirectUrl=${completeCurrentUrl}`;
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
          <Button onClick={onLoginWithGoogle}>Login google</Button>
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
