import cloneDeep from "lodash.clonedeep";

import {
  GET_EXERCISES_FAILED,
  GET_EXERCISES_LOADING,
  GET_EXERCISES_SUCCESS,
  CLEAN_GET_EXERCISES,
  CREATE_EXERCISE_LOADING,
  CREATE_EXERCISE_FAILED,
  CREATE_EXERCISE_SUCCESS,
  CLEAN_CREATE_EXERCISE,
  UPDATE_EXERCISE_LOADING,
  UPDATE_EXERCISE_FAILED,
  UPDATE_EXERCISE_SUCCESS,
  CLEAN_UPDATE_EXERCISE,
  DELETE_EXERCISE_LOADING,
  DELETE_EXERCISE_FAILED,
  DELETE_EXERCISE_SUCCESS,
  CLEAN_DELETE_EXERCISE,
} from "./constants";
import initialState from "./state";
import {
  ACTION_TYPE,
  INITIAL_ACTION_STATE_NEW,
} from "../../../helper/constants";

const getAllFailed = (state, action) => {
  const newState = cloneDeep(state);
  newState.actions.getAll = { status: ACTION_TYPE.FAILED, error: action.error };

  return newState;
};
const getAllSuccess = (state, action) => {
  const newState = cloneDeep(state);
  const exercises = action.payload;

  newState.list = [...exercises];
  newState.actions.getAll = { status: ACTION_TYPE.SUCCESS, error: null };

  return newState;
};
const getAllLoading = (state) => {
  const newState = cloneDeep(state);
  newState.actions.getAll = { status: ACTION_TYPE.LOADING, error: null };

  return newState;
};
const getAllClean = (state) => {
  const newState = cloneDeep(state);
  newState.actions.getAll = { ...INITIAL_ACTION_STATE_NEW };

  return newState;
};

const createFailed = (state, action) => {
  const newState = cloneDeep(state);
  newState.actions.create = { status: ACTION_TYPE.FAILED, error: action.error };

  return newState;
};
const createSuccess = (state, action) => {
  const newState = cloneDeep(state);
  const newExercise = action.payload;

  newState.list = [...newState.list, newExercise];
  newState.actions.create = { status: ACTION_TYPE.SUCCESS, error: null };

  return newState;
};
const createLoading = (state) => {
  const newState = cloneDeep(state);
  newState.actions.create = { status: ACTION_TYPE.LOADING, error: null };

  return newState;
};
const createClean = (state) => {
  const newState = cloneDeep(state);
  newState.actions.create = { ...INITIAL_ACTION_STATE_NEW };

  return newState;
};

const updateFailed = (state, action) => {
  const newState = cloneDeep(state);
  newState.actions.update = { status: ACTION_TYPE.FAILED, error: action.error };

  return newState;
};
const updateSuccess = (state, action) => {
  const newState = cloneDeep(state);
  const newExercise = action.payload;
  const updateExerciseIndex = newState.list.findIndex(
    (exercise) => exercise._id === newExercise._id
  );

  newState.list[updateExerciseIndex] = newExercise;
  newState.actions.update = { status: ACTION_TYPE.SUCCESS, error: null };

  return newState;
};
const updateLoading = (state) => {
  const newState = cloneDeep(state);
  newState.actions.update = { status: ACTION_TYPE.LOADING, error: null };

  return newState;
};
const updateClean = (state) => {
  const newState = cloneDeep(state);
  newState.actions.update = { ...INITIAL_ACTION_STATE_NEW };

  return newState;
};

const deleteFailed = (state, action) => {
  const newState = cloneDeep(state);
  newState.actions.delete = { status: ACTION_TYPE.FAILED, error: action.error };

  return newState;
};
const deleteSuccess = (state, action) => {
  const newState = cloneDeep(state);
  const deletedExerciseId = action.payload;
  const exerciseIndex = newState.list.findIndex(
    (exercise) => exercise._id === deletedExerciseId
  );
  if (exerciseIndex > -1) {
    newState.list.splice(exerciseIndex, 1);
  }
  newState.actions.delete = { status: ACTION_TYPE.SUCCESS, error: null };

  return newState;
};
const deleteLoading = (state) => {
  const newState = cloneDeep(state);
  newState.actions.delete = { status: ACTION_TYPE.LOADING, error: null };

  return newState;
};
const deleteClean = (state) => {
  const newState = cloneDeep(state);
  newState.actions.delete = { ...INITIAL_ACTION_STATE_NEW };

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
    case CLEAN_GET_EXERCISES:
      return getAllClean(state);

    case CREATE_EXERCISE_FAILED:
      return createFailed(state, action);
    case CREATE_EXERCISE_LOADING:
      return createLoading(state);
    case CREATE_EXERCISE_SUCCESS:
      return createSuccess(state, action);
    case CLEAN_CREATE_EXERCISE:
      return createClean(state);

    case UPDATE_EXERCISE_FAILED:
      return updateFailed(state, action);
    case UPDATE_EXERCISE_LOADING:
      return updateLoading(state);
    case UPDATE_EXERCISE_SUCCESS:
      return updateSuccess(state, action);
    case CLEAN_UPDATE_EXERCISE:
      return updateClean(state);

    case DELETE_EXERCISE_FAILED:
      return deleteFailed(state, action);
    case DELETE_EXERCISE_LOADING:
      return deleteLoading(state);
    case DELETE_EXERCISE_SUCCESS:
      return deleteSuccess(state, action);
    case CLEAN_DELETE_EXERCISE:
      return deleteClean(state);

    default:
      return state;
  }
};

export default reducer;
