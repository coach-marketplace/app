import cloneDeep from "lodash.clonedeep";

import {
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT
} from "./constants";

const initialActionsState = {
  loading: false,
  error: null,
  success: false
};

const initialState = {
  token: null,
  authUser: null,
  actions: {
    login: { ...initialActionsState }
  }
};

const reducer = (state = initialState, action) => {
  const newState = cloneDeep(state);

  switch (action.type) {
    case LOGIN_LOADING:
      newState.actions.login.loading = true;
      newState.actions.login.success = false;
      newState.actions.login.error = null;
      return newState;
    case LOGIN_SUCCESS:
      const token = action.user.token;
      const user = action.user;
      delete user.token;
      newState.token = token;
      newState.authUser = user;
      newState.actions.login.loading = false;
      newState.actions.login.error = null;
      newState.actions.login.success = true;
      return newState;
    case LOGIN_FAILED:
      newState.actions.login.error = action.error;
      newState.actions.login.success = false;
      newState.actions.login.loading = false;
      return newState;
    case LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
};

export default reducer;
