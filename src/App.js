import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import queryString from "query-string";

import Socket from "./services/socket";
import Router from "./router";
import { fetchAuthUser } from "./store/modules/user/actions";
import Spinner from "./components/ui/loader/Spinner";
import { addTokenToLocalStorage } from "./services/local-storage";
import { ACTION_TYPE } from "./helper/constants";

import "./style/main.css";

const App = ({ autoLoginStatus, autoLogin, user }) => {
  const [isAutoLoginDone, setIsAutoLoginDone] = useState(false);
  const [isSocketInit, setIsSocketInit] = useState(false);

  useEffect(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isAutoLoginDone || !user || isSocketInit) return;
    Socket.init({ userId: user._id });
    setIsSocketInit(true);
  }, [isAutoLoginDone, isSocketInit, user]);

  useEffect(() => {
    if (
      autoLoginStatus === ACTION_TYPE.SUCCESS ||
      autoLoginStatus === ACTION_TYPE.FAILED
    ) {
      setIsAutoLoginDone(true);
    }
  }, [autoLoginStatus]);

  if (!isAutoLoginDone) {
    return <Spinner />;
  }

  return <Router />;
};

const mapStateToProps = (state) => ({
  user: state.user.current,
  autoLoginStatus: state.user.actions.fetchAuthUser.status,
});

const mapDispatchToProps = (dispatch) => ({
  autoLogin: (token) => dispatch(fetchAuthUser(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
