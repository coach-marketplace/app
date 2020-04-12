import cloneDeep from "lodash.clonedeep";

import {
  GET_CUSTOMERS_FAILED,
  GET_CUSTOMERS_LOADING,
  GET_CUSTOMERS_SUCCESS,
  CREATE_LOADING,
  CREATE_FAILED,
  CREATE_SUCCESS,
} from "./constants";
import initialState from "./state";

const getAllFailed = (state, action) => {
  const newState = cloneDeep(state);
  newState.actions.getAll.loading = false;
  newState.actions.getAll.success = false;
  newState.actions.getAll.error = action.error;

  return newState;
};

const getAllSuccess = (state, action) => {
  const newState = cloneDeep(state);
  const customers = action.payload;

  newState.list = [...customers];
  newState.actions.getAll.loading = false;
  newState.actions.getAll.error = null;
  newState.actions.getAll.success = true;

  return newState;
};

const getAllLoading = (state) => {
  const newState = cloneDeep(state);

  newState.actions.getAll.loading = true;
  newState.actions.getAll.success = false;
  newState.actions.getAll.error = null;

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
  const newCustomer = action.payload;

  newState.list = [...newState.list, newCustomer];
  newState.actions.create.loading = false;
  newState.actions.create.error = null;
  newState.actions.create.success = true;

  return newState;
};

const createLoading = (state) => {
  const newState = cloneDeep(state);

  newState.actions.create.loading = true;
  newState.actions.create.success = false;
  newState.actions.create.error = null;

  return newState;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CUSTOMERS_FAILED:
      return getAllFailed(state, action);
    case GET_CUSTOMERS_LOADING:
      return getAllLoading(state);
    case GET_CUSTOMERS_SUCCESS:
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
