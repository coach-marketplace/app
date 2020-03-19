import axios from "axios";
import API from "../../../services/api";

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
    API.post("auth/login-local", { email, password })
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
    API.setToken(token);
    API.get("auth/me")
      .then(response => {
        const user = response.data;
        user.token = token;
        dispatch(autoLoginSuccess(user));
      })
      .catch(error => {
        dispatch(autoLoginFailed(error.message));
      });
  };
};
