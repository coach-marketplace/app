import cloneDeep from "lodash.clonedeep";

import {
  AUTO_LOGIN_FAILED,
  AUTO_LOGIN_LOADING,
  AUTO_LOGIN_SUCCESS,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGOUT
} from "./constants";
import initialState from "./state";
import {
  addTokenToLocalStorage,
  removeTokenFromLocalStorage
} from "../../../services/local-storage";

const autoLoginLoading = state => {
  const newState = cloneDeep(state);
  newState.actions.auto_login.loading = true;
  newState.actions.auto_login.success = false;
  newState.actions.auto_login.error = null;

  return newState;
};

const autoLoginFailed = (state, action) => {
  const newState = cloneDeep(state);
  newState.actions.auto_login.loading = false;
  newState.actions.auto_login.success = false;
  newState.actions.auto_login.error = action.error;

  return newState;
};

const autoLoginSuccess = (state, action) => {
  const newState = cloneDeep(state);
  const token = action.user.token;
  const user = action.user;
  delete user.token;
  newState.token = token;
  newState.authUser = user;
  newState.actions.auto_login.loading = false;
  newState.actions.auto_login.error = null;
  newState.actions.auto_login.success = true;

  return newState;
};

const loginLoading = state => {
  const newState = cloneDeep(state);
  newState.actions.login.loading = true;
  newState.actions.login.success = false;
  newState.actions.login.error = null;

  return newState;
};

const loginFailed = (state, action) => {
  const newState = cloneDeep(state);
  newState.actions.login.loading = false;
  newState.actions.login.success = false;
  newState.actions.login.error = action.error;

  return newState;
};

const loginSuccess = (state, action) => {
  const newState = cloneDeep(state);
  const token = action.user.token;
  const user = action.user;
  delete user.token;
  newState.token = token;
  newState.authUser = user;
  newState.actions.login.loading = false;
  newState.actions.login.error = null;
  newState.actions.login.success = true;
  addTokenToLocalStorage(token);

  return newState;
};

const registerLoading = state => {
  const newState = cloneDeep(state);
  newState.actions.register.loading = true;
  newState.actions.register.success = false;
  newState.actions.register.error = null;

  return newState;
};

const registerFailed = (state, action) => {
  const newState = cloneDeep(state);
  newState.actions.register.loading = false;
  newState.actions.register.success = false;
  newState.actions.register.error = action.error;

  return newState;
};

const registerSuccess = (state, action) => {
  const newState = cloneDeep(state);

  return newState;
};

const logout = state => {
  removeTokenFromLocalStorage();

  return cloneDeep(state);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTO_LOGIN_FAILED:
      return autoLoginFailed(state, action);
    case AUTO_LOGIN_LOADING:
      return autoLoginLoading(state);
    case AUTO_LOGIN_SUCCESS:
      return autoLoginSuccess(state, action);
    case LOGIN_LOADING:
      return loginLoading(state);
    case LOGIN_FAILED:
      return loginFailed(state, action);
    case LOGIN_SUCCESS:
      return loginSuccess(state, action);
    case REGISTER_LOADING:
      return registerLoading(state);
    case REGISTER_FAILED:
      return registerFailed(state, action);
    case REGISTER_SUCCESS:
      return registerSuccess(state, action);
    case LOGOUT:
      return logout(initialState);
    default:
      return state;
  }
};

export default reducer;
