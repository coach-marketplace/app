import cloneDeep from "lodash.clonedeep";

import {
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGOUT,
  ACCOUNT_VALIDATION_LOADING,
  ACCOUNT_VALIDATION_SUCCESS,
  ACCOUNT_VALIDATION_FAILED,
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

const accountValidationLoading = (state) => {
  const newState = cloneDeep(state);

  newState.actions.accountValidation.state = ACCOUNT_VALIDATION_LOADING;
  newState.actions.accountValidation.error = null;

  return newState;
};

const accountValidationFailed = (state, action) => {
  const newState = cloneDeep(state);

  newState.actions.accountValidation.state = ACCOUNT_VALIDATION_FAILED;
  newState.actions.accountValidation.error = action.error;

  return newState;
};

const accountValidationSuccess = (state, action) => {
  const newState = cloneDeep(state);

  newState.actions.accountValidation.state = ACCOUNT_VALIDATION_SUCCESS;
  newState.actions.accountValidation.error = null;

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
    case REGISTER_LOADING:
      return registerLoading(state);
    case REGISTER_FAILED:
      return registerFailed(state, action);
    case REGISTER_SUCCESS:
      return registerSuccess(state, action);
    case LOGOUT:
      return logout(initialState);
    case ACCOUNT_VALIDATION_LOADING:
      return accountValidationLoading(state);
    case ACCOUNT_VALIDATION_FAILED:
      return accountValidationFailed(state, action);
    case ACCOUNT_VALIDATION_SUCCESS:
      return accountValidationSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
