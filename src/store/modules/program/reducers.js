import cloneDeep from "lodash.clonedeep";

import {
  GET_PROGRAMS_FAILED,
  GET_PROGRAMS_LOADING,
  GET_PROGRAMS_SUCCESS,
  CLEAN_GET_PROGRAMS,
  GET_ONE_FAILED,
  GET_ONE_LOADING,
  GET_ONE_SUCCESS,
  CLEAN_GET_ONE,
  CREATE_PROGRAM_LOADING,
  CREATE_PROGRAM_FAILED,
  CREATE_PROGRAM_SUCCESS,
  CLEAN_CREATE_PROGRAM,
  UPDATE_PROGRAM_LOADING,
  UPDATE_PROGRAM_FAILED,
  UPDATE_PROGRAM_SUCCESS,
  CLEAN_UPDATE_PROGRAM,
  DELETE_PROGRAM_LOADING,
  DELETE_PROGRAM_FAILED,
  DELETE_PROGRAM_SUCCESS,
  CLEAN_DELETE_PROGRAM,
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
  const programs = action.payload;

  newState.list = [...programs];
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

const getOneFailed = (state, action) => {
  const newState = cloneDeep(state);
  newState.actions.getOne = { status: ACTION_TYPE.FAILED, error: action.error };

  return newState;
};
const getOneSuccess = (state, action) => {
  const newState = cloneDeep(state);
  const fetchedProgram = action.payload;
  const fetchedProgramIndex = newState.list.findIndex(
    (program) => program._id === fetchedProgram._id
  );

  if (fetchedProgramIndex !== -1) {
    newState.list[fetchedProgramIndex] = fetchedProgram;
  } else {
    newState.list = [...newState.list, fetchedProgram];
  }
  newState.actions.getOne = { status: ACTION_TYPE.SUCCESS, error: null };

  return newState;
};
const getOneLoading = (state) => {
  const newState = cloneDeep(state);
  newState.actions.getOne = { status: ACTION_TYPE.LOADING, error: null };

  return newState;
};
const getOneClean = (state) => {
  const newState = cloneDeep(state);
  newState.actions.getOne = { ...INITIAL_ACTION_STATE_NEW };

  return newState;
};

const createFailed = (state, action) => {
  const newState = cloneDeep(state);
  newState.actions.create = { status: ACTION_TYPE.FAILED, error: action.error };

  return newState;
};
const createSuccess = (state, action) => {
  const newState = cloneDeep(state);
  const newProgram = action.payload;

  newState.list = [...newState.list, newProgram];
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
  const newProgram = action.payload;
  const updateProgramIndex = newState.list.findIndex(
    (program) => program._id === newProgram._id
  );

  newState.list[updateProgramIndex] = newProgram;
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
  const deletedProgramId = action.payload;
  const programIndex = newState.list.findIndex(
    (program) => program._id === deletedProgramId
  );
  if (programIndex > -1) {
    newState.list.splice(programIndex, 1);
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
    case GET_PROGRAMS_FAILED:
      return getAllFailed(state, action);
    case GET_PROGRAMS_LOADING:
      return getAllLoading(state);
    case GET_PROGRAMS_SUCCESS:
      return getAllSuccess(state, action);
    case CLEAN_GET_PROGRAMS:
      return getAllClean(state);

    case GET_ONE_FAILED:
      return getOneFailed(state, action);
    case GET_ONE_LOADING:
      return getOneLoading(state);
    case GET_ONE_SUCCESS:
      return getOneSuccess(state, action);
    case CLEAN_GET_ONE:
      return getOneClean(state);

    case CREATE_PROGRAM_FAILED:
      return createFailed(state, action);
    case CREATE_PROGRAM_LOADING:
      return createLoading(state);
    case CREATE_PROGRAM_SUCCESS:
      return createSuccess(state, action);
    case CLEAN_CREATE_PROGRAM:
      return createClean(state);

    case UPDATE_PROGRAM_FAILED:
      return updateFailed(state, action);
    case UPDATE_PROGRAM_LOADING:
      return updateLoading(state);
    case UPDATE_PROGRAM_SUCCESS:
      return updateSuccess(state, action);
    case CLEAN_UPDATE_PROGRAM:
      return updateClean(state);

    case DELETE_PROGRAM_FAILED:
      return deleteFailed(state, action);
    case DELETE_PROGRAM_LOADING:
      return deleteLoading(state);
    case DELETE_PROGRAM_SUCCESS:
      return deleteSuccess(state, action);
    case CLEAN_DELETE_PROGRAM:
      return deleteClean(state);

    default:
      return state;
  }
};

export default reducer;
