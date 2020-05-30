import React, { Component } from "react";
import { connect } from "react-redux";
import queryString from "query-string";

import Socket from "./services/socket";
import Router from "./router";
import { fetchAuthUser } from "./store/modules/user/actions";
import Spinner from "./components/ui/loader/Spinner";
import { addTokenToLocalStorage } from "./services/local-storage";

import "./style/main.css";

class App extends Component {
  state = {
    previousIsAutoLoginLoading: false,
    isAutoLoginDone: false,
  };

  static getDerivedStateFromProps(props, state) {
    const { isAutoLoginLoading } = props;

    console.log(state)

    return {
      ...state,
      previousIsAutoLoginLoading: isAutoLoginLoading,
      isAutoLoginDone: state.previousIsAutoLoginLoading,
    };
  }

  componentDidMount() {
    const { autoLogin } = this.props;
    const hasUrlQuery = window.location.href.includes("?");
    const query = hasUrlQuery
      ? queryString.parse(window.location.href.split("?")[1])
      : null;
    const token = query && query.token ? query.token : null;
    /**
     * For any reason a '#' is added at the end of the token, which broke
     * the call
     */
    token && addTokenToLocalStorage(token.replace("#", ""));
    autoLogin();
  }

  componentDidUpdate() {
    const { user } = this.props;
    const { isAutoLoginDone } = this.state;

    console.log(user)

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
  isAutoLoginLoading: state.user.actions.fetchAuthUser.loading 
                      || state.user.actions.updateUserProfile.loading
});

const mapDispatchToProps = (dispatch) => ({
  autoLogin: (token) => dispatch(fetchAuthUser(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
