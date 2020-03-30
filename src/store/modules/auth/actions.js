import API from "../../../services/api";

import {
  AUTO_LOGIN_FAILED,
  AUTO_LOGIN_LOADING,
  AUTO_LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  REGISTER_FAILED,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  LOGOUT
} from "./constants";
import { getTokenFromLocalStorage } from "../../../services/local-storage";

const autoLoginLoading = () => ({ type: AUTO_LOGIN_LOADING });
const autoLoginSuccess = payload => ({
  type: AUTO_LOGIN_SUCCESS,
  user: payload
});
const autoLoginFailed = error => ({ type: AUTO_LOGIN_FAILED, error });

const loginLoading = () => ({ type: LOGIN_LOADING });
const loginSuccess = payload => ({ type: LOGIN_SUCCESS, user: payload });
const loginFailed = error => ({ type: LOGIN_FAILED, error });

const registerLoading = () => ({ type: REGISTER_LOADING });
const registerSuccess = payload => ({ type: REGISTER_SUCCESS, user: payload });
const registerFailed = error => ({ type: REGISTER_FAILED, error });

export const logout = () => ({ type: LOGOUT });

export const register = data => {
  return dispatch => {
    dispatch(registerLoading());
    API.post("auth/register-local", {
      email: data.email,
      password: data.password
    })
      .then(response => {
        dispatch(registerSuccess(response.data));
      })
      .catch(error => {
        dispatch(registerFailed(error.message));
      });
  };
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
