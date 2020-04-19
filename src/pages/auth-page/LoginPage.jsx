import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Heading } from "evergreen-ui";

import toaster from "../../components/ui/toaster/toaster";
import Layout from "../../components/layout/main-page-layout/MainPageLayout";
import LoginForm from "../../components/auth/login-form/LoginForm";
import * as actions from "../../store/modules/auth/actions";

class LoginPage extends React.Component {
  state = {
    isLoading: false,
  };

  static getDerivedStateFromProps(props, state) {
    const { isLoginError, isLoginLoading, isLoginSuccess, user } = props;

    if (user) {
      return null;
    }

    if (isLoginLoading) {
      return { isLoading: true };
    } else if (isLoginError) {
      toaster.danger("Error during login");

      return { isLoading: false };
    } else if (isLoginSuccess) {
      window.location = "/";

      return { step: 1 };
    }
  }

  onSubmit = ({ email, password }) => {
    const { login } = this.props;

    login(email, password);
  };

  goToRegisterPage = () => {
    const { history } = this.props;

    history.push("/register");
  };

  render() {
    const { user } = this.props;
    const { isLoading } = this.state;

    if (user) {
      return <Redirect to="/" />;
    }

    return (
      <Layout
        main={
          <Fragment>
            <Heading size={900}>Login</Heading>
            <LoginForm
              onSubmit={this.onSubmit}
              onRegister={this.goToRegisterPage}
              isLoading={isLoading}
            />
          </Fragment>
        }
      />
    );
  }
}

const mapStateToProps = (state) => ({
  isLoginError: state.auth.actions.login.error,
  isLoginLoading: state.auth.actions.login.loading,
  isLoginSuccess: state.auth.actions.login.success,
  user: state.user.current,
});

const mapDispatchToProps = (dispatch) => ({
  login: (email, password) => dispatch(actions.login(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
