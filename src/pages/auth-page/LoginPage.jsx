import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Heading } from "evergreen-ui";

import Layout from "../../components/layout/main-page-layout/MainPageLayout";
import LoginForm from "../../components/auth/login-form/LoginForm";
import * as actions from "../../store/modules/auth/actions";

class LoginPage extends React.Component {
  onSubmit = ({ email, password }) => {
    this.props.login(email, password);
  };

  goToRegisterPage = () => {
    const { history } = this.props;

    history.push("/register");
  };

  render() {
    if (this.props.authUser) {
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
            />
          </Fragment>
        }
      />
    );
  }
}

const mapStateToProps = (state) => ({
  authUser: state.auth.authUser,
});

const mapDispatchToProps = (dispatch) => ({
  login: (email, password) => dispatch(actions.login(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
