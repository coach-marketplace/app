import React, { Component } from "react";
import { connect } from "react-redux";

import Router from "./router";
import * as actions from "./store/modules/auth/actions";
import Spinner from "./components/ui/loader/Spinner";

import "./style/main.css";

class App extends Component {
  componentDidMount() {
    this.props.autoLogin();
  }

  render() {
    if (
      this.props.isAutoLoginLoading ||
      (!this.props.isAutoLoginSuccess && !this.props.isAutoLoginError)
    ) {
      return <Spinner />;
    }
    return <Router />;
  }
}

const mapStateToProps = state => ({
  authUser: state.auth.authUser,
  isAutoLoginLoading: state.auth.actions.auto_login.loading,
  isAutoLoginSuccess: state.auth.actions.auto_login.success,
  isAutoLoginError: state.auth.actions.auto_login.error
});

const mapDispatchToProps = dispatch => ({
  autoLogin: () => dispatch(actions.tryAutoLogin())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
