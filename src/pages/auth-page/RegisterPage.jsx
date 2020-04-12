import React, { Fragment, Component } from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";

import {
  register as registerUser,
  login as loginUser,
} from "../../store/modules/auth/actions";
import Title from "../../components/ui/typography/Title";
import toaster from "../../components/ui/toaster/toaster";
import Layout from "../../components/layout/main-page-layout/MainPageLayout";
import RegisterForm from "../../components/auth/register-form/RegisterForm";

class RegisterPage extends Component {
  state = {
    isRegisterTried: false,
    isRegisterDone: false,
    isLoading: false,
    email: "",
    password: "",
  };

  static getDerivedStateFromProps(props, state) {
    const {
      isRegisterError,
      isRegisterLoading,
      isRegisterSuccess,
      isLoginLoading,
      isLoginSuccess,
      isLoginError,
      login,
    } = props;
    const { isRegisterTried, isRegisterDone } = state;

    if (isRegisterLoading || isLoginLoading)
      return { isLoading: true, isRegisterTried: true };

    if (isRegisterError || isLoginError) {
      isRegisterTried && toaster.danger("Error during registration");

      return { isLoading: false, isRegisterTried: false };
    }

    if (isRegisterSuccess && !isRegisterDone) {
      login(state.email, state.password);

      return { isRegisterDone: true };
    }

    if (isLoginSuccess && isRegisterDone)
      return { isLoading: false, isRegisterDone: false };

    return null;
  }

  onSubmit = (data) => {
    this.setState(
      {
        isLoading: true,
        email: data.email,
        password: data.password,
      },
      () => {
        this.props.register(data.email, data.password);
      }
    );
  };

  goToLoginPage = () => {
    const { history } = this.props;

    history.push("/login");
  };

  render() {
    const { authUser, isLoading } = this.props;

    if (authUser) return <Redirect to="/" />;

    return (
      <Layout
        main={
          <Fragment>
            <Title>Register</Title>
            <RegisterForm
              onLogin={this.goToLoginPage}
              onSubmit={this.onSubmit}
              isLoading={isLoading}
            />
          </Fragment>
        }
      />
    );
  }
}

const mapStateToProps = (state) => ({
  isRegisterLoading: state.auth.actions.register.loading,
  isRegisterError: state.auth.actions.register.error,
  isRegisterSuccess: state.auth.actions.register.success,
  isLoginLoading: state.auth.actions.login.loading,
  isLoginError: state.auth.actions.login.error,
  isLoginSuccess: state.auth.actions.login.success,
  authUser: state.auth.authUser,
});

const mapDispatchToProps = (dispatch) => ({
  register: (email, password) => dispatch(registerUser(email, password)),
  login: (email, password) => dispatch(loginUser(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
