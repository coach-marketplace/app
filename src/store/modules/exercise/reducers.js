import cloneDeep from "lodash.clonedeep";

import {
  GET_EXERCISES_FAILED,
  GET_EXERCISES_LOADING,
  GET_EXERCISES_SUCCESS,
  CREATE_EXERCISE_LOADING,
  CREATE_EXERCISE_FAILED,
  CREATE_EXERCISE_SUCCESS,
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
  const exercises = action.payload;

  newState.list = [...exercises];
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
  const newExercise = action.payload;

  newState.list = [...newState.list, newExercise];
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
    case GET_EXERCISES_FAILED:
      return getAllFailed(state, action);
    case GET_EXERCISES_LOADING:
      return getAllLoading(state);
    case GET_EXERCISES_SUCCESS:
      return getAllSuccess(state, action);
    case CREATE_EXERCISE_FAILED:
      return createFailed(state, action);
    case CREATE_EXERCISE_LOADING:
      return createLoading(state);
    case CREATE_EXERCISE_SUCCESS:
      return createSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
