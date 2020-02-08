import axios from "axios";

import {
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT
} from "./constants";

const { REACT_APP_API_URL } = process.env;

export const loginLoading = () => {
  return { type: LOGIN_LOADING };
};

export const loginSuccess = payload => {
  return { type: LOGIN_SUCCESS, user: payload };
};

export const loginFailed = error => {
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
