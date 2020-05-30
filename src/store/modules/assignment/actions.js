import API from "../../../services/api";

import {
  GET_ASSIGNMENTS_FAILED,
  GET_ASSIGNMENTS_LOADING,
  GET_ASSIGNMENTS_SUCCESS,
  CLEAN_GET_ASSIGNMENTS,
  CREATE_ASSIGNMENT_LOADING,
  CREATE_ASSIGNMENT_FAILED,
  CREATE_ASSIGNMENT_SUCCESS,
  CLEAN_CREATE_ASSIGNMENT,
  UPDATE_ASSIGNMENT_LOADING,
  UPDATE_ASSIGNMENT_FAILED,
  UPDATE_ASSIGNMENT_SUCCESS,
  CLEAN_UPDATE_ASSIGNMENT,
  DELETE_ASSIGNMENT_LOADING,
  DELETE_ASSIGNMENT_FAILED,
  DELETE_ASSIGNMENT_SUCCESS,
  CLEAN_DELETE_ASSIGNMENT,
} from "./constants";
import store from "../../index";

const getByProgramLoading = () => ({ type: GET_ASSIGNMENTS_LOADING });
const getByProgramSuccess = (programId, payload) => ({
  type: GET_ASSIGNMENTS_SUCCESS,
  payload,
});
const getByProgramFailed = (error) => ({ type: GET_ASSIGNMENTS_FAILED, error });
const getByProgramClean = () => ({ type: CLEAN_GET_ASSIGNMENTS });

const createLoading = () => ({ type: CREATE_ASSIGNMENT_LOADING });
const createSuccess = (programId, payload) => ({
  type: CREATE_ASSIGNMENT_SUCCESS,
  payload,
  programId,
});
const createFailed = (error) => ({ type: CREATE_ASSIGNMENT_FAILED, error });
const createClean = () => ({ type: CLEAN_CREATE_ASSIGNMENT });

const updateLoading = () => ({ type: UPDATE_ASSIGNMENT_LOADING });
const updateSuccess = (programId, payload) => ({
  type: UPDATE_ASSIGNMENT_SUCCESS,
  payload,
  programId,
});
const updateFailed = (error) => ({ type: UPDATE_ASSIGNMENT_FAILED, error });
const updateClean = () => ({ type: CLEAN_UPDATE_ASSIGNMENT });

const deleteLoading = () => ({ type: DELETE_ASSIGNMENT_LOADING });
const deleteSuccess = (programId, payload) => ({
  type: DELETE_ASSIGNMENT_SUCCESS,
  payload,
  programId,
});
const deleteFailed = (error) => ({ type: DELETE_ASSIGNMENT_FAILED, error });
const deleteClean = () => ({ type: CLEAN_DELETE_ASSIGNMENT });

export const retrieveByProgram = (programId) => {
  return (dispatch) => {
    dispatch(getByProgramLoading());
    const {
      user: { current: user },
    } = store.getState();

    API.get(`coach/${user._id}/programs/${programId}/assignments`)
      .then((response) => {
        dispatch(getByProgramSuccess(programId, response.data));
      })
      .catch((error) => {
        dispatch(getByProgramFailed(error.message));
      });
  };
};
export const cleanGetAll = () => (dispatch) => dispatch(getByProgramClean());

export const create = (programId, data) => {
  return (dispatch) => {
    dispatch(createLoading());
    const {
      user: { current: user },
    } = store.getState();

    API.post(`coach/${user._id}/programs/${programId}/assign`, data)
      .then((response) => {
        dispatch(createSuccess(programId, response.data));
      })
      .catch((error) => {
        dispatch(createFailed(error.message));
      });
  };
};
export const cleanCreate = () => (dispatch) => dispatch(createClean());

export const update = (programId, data) => {
  return (dispatch) => {
    dispatch(updateLoading());
    const {
      user: { current: user },
    } = store.getState();

    API.put(`coach/${user._id}/program/${programId}/assign`, data)
      .then((response) => {
        dispatch(updateSuccess(response.data));
      })
      .catch((error) => {
        dispatch(updateFailed(error.message));
      });
  };
};
export const cleanUpdate = () => (dispatch) => dispatch(updateClean());

export const del = (programId, assignmentId) => {
  return (dispatch) => {
    dispatch(deleteLoading());
    const {
      user: { current: user },
    } = store.getState();

    API.delete(`coach/${user._id}/program/${programId}/assign/${assignmentId}`)
      .then(() => {
        dispatch(deleteSuccess(assignmentId));
      })
      .catch((error) => {
        dispatch(deleteFailed(error.message));
      });
  };
};
export const cleanDelete = () => (dispatch) => dispatch(deleteClean());
