import React, { Fragment } from "react";
import { Redirect } from "react-router";
import { Heading } from "evergreen-ui";

import Layout from "../../components/layout/main-page-layout/MainPageLayout";
import Header from "../../components/layout/header/Header";
import RegisterForm from "../../components/auth/register-form/RegisterForm";

class RegisterPage extends React.Component {
  render() {
    if (this.props.authUser) {
      return <Redirect to="/" />;
    }

    return (
      <Layout
        header={<Header />}
        main={
          <Fragment>
            <Heading size={900}>Register</Heading>
            <RegisterForm />
          </Fragment>
        }
      />
    );
  }
}

export default RegisterPage;
