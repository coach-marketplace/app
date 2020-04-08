import React, { Component } from "react";
import { connect } from "react-redux";

import Router from "./router";
import * as actions from "./store/modules/auth/actions";
import Spinner from "./components/ui/loader/Spinner";

import "./style/main.css";

class App extends Component {
  componentDidMount() {
    const { autoLogin } = this.props;

    autoLogin();
  }

  render() {
    const { isAutoLoginLoading } = this.props;

    if (isAutoLoginLoading) {
      return <Spinner />;
    }

    return <Router />;
  }
}

const mapStateToProps = (state) => ({
  isAutoLoginLoading: state.auth.actions.auto_login.loading,
});

const mapDispatchToProps = (dispatch) => ({
  autoLogin: () => dispatch(actions.tryAutoLogin()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
