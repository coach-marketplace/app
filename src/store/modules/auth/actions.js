import API from "../../../services/api";

import {
  LOGIN_FAILED,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_CLEAN,
  REGISTER_FAILED,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_CLEAN,
  LOGOUT,
} from "./constants";

const loginLoading = () => ({ type: LOGIN_LOADING });
const loginSuccess = (payload) => ({ type: LOGIN_SUCCESS, payload });
const loginFailed = (error) => ({ type: LOGIN_FAILED, error });
const loginClean = () => ({ type: LOGIN_CLEAN });

const registerLoading = () => ({ type: REGISTER_LOADING });
const registerSuccess = (payload) => ({ type: REGISTER_SUCCESS, payload });
const registerFailed = (error) => ({ type: REGISTER_FAILED, error });
const registerClean = () => ({ type: REGISTER_CLEAN });

export const logout = () => ({ type: LOGOUT });

/**
 * Register
 * @param {object} data Register data
 * @param {string} data.email Email of the user
 * @param {string} data.password Password of the user
 * @return {void}
 */
export const register = (data) => {
  return (dispatch) => {
    dispatch(registerLoading());
    API.post("auth/register-local", data)
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
 * @param {object} data Authentication data
 * @param {string} data.email Email of the user
 * @param {string} data.password Password of the user
 * @return {void}
 */
export const login = (data) => {
  return (dispatch) => {
    dispatch(loginLoading());
    API.post("auth/login-local", { email: data.email, password: data.password })
      .then((response) => {
        dispatch(loginSuccess(response.data));
      })
      .catch((error) => {
        dispatch(loginFailed(error.message));
      });
  };
};

export const cleanLogin = () => (dispatch) => dispatch(loginClean());
export const cleanRegister = () => (dispatch) => dispatch(registerClean());
