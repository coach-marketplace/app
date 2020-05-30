import cloneDeep from "lodash.clonedeep";

import {
  GET_CUSTOMERS_FAILED,
  GET_CUSTOMERS_LOADING,
  GET_CUSTOMERS_SUCCESS,
  FETCH_CUSTOMER_FAILED,
  FETCH_CUSTOMER_LOADING,
  FETCH_CUSTOMER_SUCCESS,
  CLEAN_FETCH_CUSTOMER,
  CREATE_LOADING,
  CREATE_FAILED,
  CREATE_SUCCESS,
} from "./constants";
import initialState from "./state";
import {
  ACTION_TYPE,
  INITIAL_ACTION_STATE_NEW,
} from "../../../helper/constants";

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

const fetchFailed = (state, action) => {
  const newState = cloneDeep(state);
  newState.actions.fetch.status = action.error;

  return newState;
};
const fetchSuccess = (state, action) => {
  const newState = cloneDeep(state);
  const fetchedCustomer = action.payload;
  const customerIndex = newState.list.findIndex(
    (customer) => customer._id === fetchedCustomer._id
  );

  if (customerIndex === -1) {
    newState.list.push(fetchedCustomer);
  } else {
    newState.list[customerIndex] = fetchedCustomer;
  }
  newState.actions.fetch = { status: ACTION_TYPE.SUCCESS, error: null };

  return newState;
};
const fetchLoading = (state) => {
  const newState = cloneDeep(state);
  newState.actions.fetch = { status: ACTION_TYPE.LOADING, error: null };

  return newState;
};
const fetchClean = (state) => {
  const newState = cloneDeep(state);
  newState.actions.fetch = { ...INITIAL_ACTION_STATE_NEW };

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

    case FETCH_CUSTOMER_FAILED:
      return fetchFailed(state, action);
    case FETCH_CUSTOMER_LOADING:
      return fetchLoading(state);
    case FETCH_CUSTOMER_SUCCESS:
      return fetchSuccess(state, action);
    case CLEAN_FETCH_CUSTOMER:
      return fetchClean(state);

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
