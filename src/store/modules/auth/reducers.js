import cloneDeep from "lodash.clonedeep";

import {
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT
} from "./constants";
import initialState from "./state";

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

  return newState;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_LOADING:
      return loginLoading(state);
    case LOGIN_FAILED:
      return loginFailed(state, action);
    case LOGIN_SUCCESS:
      return loginSuccess(state, action);
    case LOGOUT:
      return cloneDeep(initialState);
    default:
      return state;
  }
};

export default reducer;
