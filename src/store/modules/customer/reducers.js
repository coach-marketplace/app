import cloneDeep from "lodash.clonedeep";

import { GET_ALL_FAILED, GET_ALL_LOADING, GET_ALL_SUCCESS } from "./constants";
import initialState from "./state";

const getAllFailed = (state, action) => {
  const newState = cloneDeep(state);
  newState.actions.get_all.loading = false;
  newState.actions.get_all.success = false;
  newState.actions.get_all.error = action.error;

  return newState;
};

const getAllSuccess = (state, action) => {
  const newState = cloneDeep(state);
  const users = action.user;
  newState.list = [...users];
  newState.actions.get_all.loading = false;
  newState.actions.get_all.error = null;
  newState.actions.get_all.success = true;

  return newState;
};

const getAllLoading = state => {
  const newState = cloneDeep(state);
  newState.actions.get_all.loading = true;
  newState.actions.get_all.success = false;
  newState.actions.get_all.error = null;

  return newState;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_FAILED:
      return getAllFailed(state, action);
    case GET_ALL_LOADING:
      return getAllLoading(state);
    case GET_ALL_SUCCESS:
      return getAllSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
