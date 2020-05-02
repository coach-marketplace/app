import API from "../../../services/api";

import {
  LOGIN_FAILED,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  REGISTER_FAILED,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  LOGOUT,
  ACCOUNT_VALIDATION_FAILED,
  ACCOUNT_VALIDATION_LOADING,
  ACCOUNT_VALIDATION_SUCCESS,
} from "./constants";

const loginLoading = () => ({ type: LOGIN_LOADING });
const loginSuccess = (payload) => ({ type: LOGIN_SUCCESS, payload });
const loginFailed = (error) => ({ type: LOGIN_FAILED, error });

const registerLoading = () => ({ type: REGISTER_LOADING });
const registerSuccess = (payload) => ({ type: REGISTER_SUCCESS, payload });
const registerFailed = (error) => ({ type: REGISTER_FAILED, error });

export const accountValidationLoading = () => ({ type: ACCOUNT_VALIDATION_LOADING });
export const accountValidationSuccess = (payload) => ({ type: ACCOUNT_VALIDATION_SUCCESS, payload });
export const accountValidationFailed = (error) => ({ type: ACCOUNT_VALIDATION_FAILED, error: error });

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
        dispatch(registerFailed(error.response.data.message));
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
        dispatch(loginFailed(error.response.data.message));
      });
  };
};
