import cloneDeep from "lodash.clonedeep";

import {
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGIN_CLEAN,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  REGISTER_CLEAN,
  LOGOUT,
} from "./constants";
import initialState from "./state";
import {
  addTokenToLocalStorage,
  removeTokenFromLocalStorage,
} from "../../../services/local-storage";

const loginLoading = (state) => {
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
  const { token } = action.payload;
  newState.token = token;
  newState.actions.login.loading = false;
  newState.actions.login.error = null;
  newState.actions.login.success = true;
  addTokenToLocalStorage(token);

  return newState;
};
const loginClean = (state) => {
  const newState = cloneDeep(state);
  newState.actions.login.loading = false;
  newState.actions.login.error = null;
  newState.actions.login.success = false;

  return newState;
};

const registerLoading = (state) => {
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
  newState.actions.register.loading = false;
  newState.actions.register.success = true;
  newState.actions.register.error = null;

  return newState;
};
const registerClean = (state) => {
  const newState = cloneDeep(state);
  newState.actions.register.loading = false;
  newState.actions.register.error = null;
  newState.actions.register.success = false;

  return newState;
};

const logout = (state) => {
  removeTokenFromLocalStorage();
  window.location = "/login";

  return cloneDeep(state);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_LOADING:
      return loginLoading(state);
    case LOGIN_FAILED:
      return loginFailed(state, action);
    case LOGIN_SUCCESS:
      return loginSuccess(state, action);
    case LOGIN_CLEAN:
      return loginClean(state);

    case REGISTER_LOADING:
      return registerLoading(state);
    case REGISTER_FAILED:
      return registerFailed(state, action);
    case REGISTER_SUCCESS:
      return registerSuccess(state, action);
    case REGISTER_CLEAN:
      return registerClean(state);

    case LOGOUT:
      return logout(initialState);
    default:
      return state;
  }
};

export default reducer;
