import React, { Component } from "react";
import { connect } from "react-redux";

import Router from "./router";
import * as actions from "./store/modules/auth/actions";

import "./style/main.css";

class App extends Component {
  componentDidMount() {
    this.props.autoLogin();
  }

  render() {
    return <Router />;
  }
}

const mapStateToProps = state => ({
  authUser: state.auth.authUser
});

const mapDispatchToProps = dispatch => ({
  autoLogin: () => dispatch(actions.tryAutoLogin())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
