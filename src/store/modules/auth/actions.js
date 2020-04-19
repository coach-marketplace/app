import API from "../../../services/api";

import {
  LOGIN_FAILED,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  REGISTER_FAILED,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  LOGOUT,
} from "./constants";

const loginLoading = () => ({ type: LOGIN_LOADING });
const loginSuccess = (payload) => ({ type: LOGIN_SUCCESS, payload });
const loginFailed = (error) => ({ type: LOGIN_FAILED, error });

const registerLoading = () => ({ type: REGISTER_LOADING });
const registerSuccess = (payload) => ({ type: REGISTER_SUCCESS, payload });
const registerFailed = (error) => ({ type: REGISTER_FAILED, error });

export const logout = () => {
  console.log("logout");
  return { type: LOGOUT };
};

/**
 * Register
 * @param {string} email Email of the user
 * @param {string} password Password of the user
 * @return {void}
 */
export const register = (email, password) => {
  return (dispatch) => {
    dispatch(registerLoading());
    API.post("auth/register-local", {
      email: email,
      password: password,
    })
      .then((response) => {
        dispatch(registerSuccess(response.data));
      })
      .catch((error) => {
        dispatch(registerFailed(error.message));
      });
  };
};

/**
 * Login
 * @param {string} email Email of the user
 * @param {string} password Password of the user
 * @return {void}
 */
export const login = (email, password) => {
  return (dispatch) => {
    dispatch(loginLoading());
    API.post("auth/login-local", { email, password })
      .then((response) => {
        dispatch(loginSuccess(response.data));
      })
      .catch((error) => {
        dispatch(loginFailed(error.message));
      });
  };
};
