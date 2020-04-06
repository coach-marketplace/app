import React, { Component } from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";

import Layout from "../../components/layout/main-page-layout/MainPageLayout";
import Header from "../../components/layout/header/Header";
import ProfileForm from "../../components/profile/ProfileForm";

class ProfilePage extends Component {
  render() {
    if (!this.props.isAutoLoginLoading && !this.props.authUser) {
      return <Redirect to="/login" />;
    }

    return <Layout header={<Header />} main={<ProfileForm />} />;
  }
}

const mapStateToProps = (state) => ({
  isAutoLoginLoading: state.auth.actions.auto_login.loading,
  authUser: state.auth.authUser,
});

export default connect(mapStateToProps)(ProfilePage);
