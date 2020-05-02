import cloneDeep from "lodash.clonedeep";

import {
  GET_PROGRAMS_FAILED,
  GET_PROGRAMS_LOADING,
  GET_PROGRAMS_SUCCESS,
  CREATE_PROGRAM_LOADING,
  CREATE_PROGRAM_FAILED,
  CREATE_PROGRAM_SUCCESS,
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
  const programs = action.payload;

  newState.list = [...programs];
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
  const newProgram = action.payload;

  newState.list = [...newState.list, newProgram];
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
    case GET_PROGRAMS_FAILED:
      return getAllFailed(state, action);
    case GET_PROGRAMS_LOADING:
      return getAllLoading(state);
    case GET_PROGRAMS_SUCCESS:
      return getAllSuccess(state, action);
    case CREATE_PROGRAM_FAILED:
      return createFailed(state, action);
    case CREATE_PROGRAM_LOADING:
      return createLoading(state);
    case CREATE_PROGRAM_SUCCESS:
      return createSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
