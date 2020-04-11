import React, { Fragment } from "react";
import { Redirect } from "react-router";
import { Heading } from "evergreen-ui";

import Layout from "../../components/layout/main-page-layout/MainPageLayout";
import RegisterForm from "../../components/auth/register-form/RegisterForm";

class RegisterPage extends React.Component {
  goToLoginPage = () => {
    const { history } = this.props;

    history.push("/login");
  };

  render() {
    if (this.props.authUser) {
      return <Redirect to="/" />;
    }

    return (
      <Layout
        main={
          <Fragment>
            <Heading size={900}>Register</Heading>
            <RegisterForm onLogin={this.goToLoginPage} />
          </Fragment>
        }
      />
    );
  }
}

export default RegisterPage;
