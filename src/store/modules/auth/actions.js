import axios from "axios";

import {
  AUTO_LOGIN_FAILED,
  AUTO_LOGIN_LOADING,
  AUTO_LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGOUT
} from "./constants";
import { getTokenFromLocalStorage } from "../../../services/local-storage";

const { REACT_APP_API_URL } = process.env;

const autoLoginLoading = () => {
  return { type: AUTO_LOGIN_LOADING };
};

const autoLoginSuccess = payload => {
  return { type: AUTO_LOGIN_SUCCESS, user: payload };
};

const autoLoginFailed = error => {
  return { type: AUTO_LOGIN_FAILED, error };
};

const loginLoading = () => {
  return { type: LOGIN_LOADING };
};

const loginSuccess = payload => {
  return { type: LOGIN_SUCCESS, user: payload };
};

const loginFailed = error => {
  return { type: LOGIN_FAILED, error };
};

export const logout = () => {
  return { type: LOGOUT };
};

export const login = (email, password) => {
  return dispatch => {
    dispatch(loginLoading());
    axios
      .post(`${REACT_APP_API_URL}v1/auth/login`, { email, password })
      .then(response => {
        dispatch(loginSuccess(response.data));
      })
      .catch(error => {
        dispatch(loginFailed(error.message));
      });
  };
};

export const tryAutoLogin = () => {
  return dispatch => {
    dispatch(autoLoginLoading());
    const token = getTokenFromLocalStorage();
    if (!token) return;
    axios({
      method: "get",
      url: `${REACT_APP_API_URL}v1/auth/me`,
      headers: { authorization: token }
    })
      .then(response => {
        const user = response.data.user;
        user.token = token;
        dispatch(autoLoginSuccess(user));
      })
      .catch(error => {
        dispatch(autoLoginFailed(error.message));
      });
  };
};
