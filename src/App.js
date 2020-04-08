import React, { Component } from "react";
import { connect } from "react-redux";

import Router from "./router";
import * as actions from "./store/modules/auth/actions";
import Spinner from "./components/ui/loader/Spinner";

import "./style/main.css";

class App extends Component {
  state = {
    previousIsAutoLoginLoading: false,
    isAutoLoginDone: false,
  };

  static getDerivedStateFromProps(props, state) {
    const { isAutoLoginLoading } = props;

    return {
      ...state,
      previousIsAutoLoginLoading: isAutoLoginLoading,
      isAutoLoginDone: state.previousIsAutoLoginLoading,
    };
  }

  componentDidMount() {
    const { autoLogin } = this.props;

    autoLogin();
  }

  render() {
    const { isAutoLoginDone } = this.state;

    if (!isAutoLoginDone) {
      return <Spinner />;
    }

    return <Router />;
  }
}

const mapStateToProps = (state) => ({
  isAutoLoginLoading: state.auth.actions.autoLogin.loading,
});

const mapDispatchToProps = (dispatch) => ({
  autoLogin: () => dispatch(actions.tryAutoLogin()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
