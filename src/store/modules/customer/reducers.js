import cloneDeep from "lodash.clonedeep";

import {
  GET_ALL_FAILED,
  GET_ALL_LOADING,
  GET_ALL_SUCCESS,
  CREATE_LOADING,
  CREATE_FAILED,
  CREATE_SUCCESS
} from "./constants";
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

const createFailed = (state, action) => {
  const newState = cloneDeep(state);
  newState.actions.create.loading = false;
  newState.actions.create.success = false;
  newState.actions.create.error = action.error;

  return newState;
};

const createSuccess = (state, action) => {
  const newState = cloneDeep(state);
  const user = action.user;
  newState.list = [...newState.list, user];
  newState.actions.create.loading = false;
  newState.actions.create.error = null;
  newState.actions.create.success = true;

  return newState;
};

const createLoading = state => {
  const newState = cloneDeep(state);
  newState.actions.create.loading = true;
  newState.actions.create.success = false;
  newState.actions.create.error = null;

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
    case CREATE_FAILED:
      return createFailed(state, action);
    case CREATE_LOADING:
      return createLoading(state);
    case CREATE_SUCCESS:
      return createSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
