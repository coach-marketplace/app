import React, { Component } from "react";
import { connect } from "react-redux";

import Socket from "./services/socket";
import Router from "./router";
import { fetchAuthUser } from "./store/modules/user/actions";
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

  componentDidUpdate() {
    const { user } = this.props;
    const { isAutoLoginDone } = this.state;

    isAutoLoginDone && user && Socket.init({ userId: user._id });
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
  user: state.user.current,
  isAutoLoginLoading: state.user.actions.fetchAuthUser.loading,
});

const mapDispatchToProps = (dispatch) => ({
  autoLogin: () => dispatch(fetchAuthUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
