import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import Layout from "../../components/ui/layout/main-page-layout/MainPageLayout";
import Header from "../../components/ui/layout/header/Header";

class HomePage extends Component {
  componentDidMount() {
    console.log("componentDidMount");
  }
  render() {
    if (!this.props.isAutoLoginLoading && !this.props.authUser) {
      return <Redirect to="/login" />;
    }

    return <Layout header={<Header />} main={<p>WIP</p>} />;
  }
}

const mapStateToProps = state => ({
  isAutoLoginLoading: state.auth.actions.auto_login.loading,
  authUser: state.auth.authUser
});

export default connect(mapStateToProps)(HomePage);
