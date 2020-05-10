import API from "../../../services/api";

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
import store from "../../index";

const getAllLoading = () => ({ type: GET_PROGRAMS_LOADING });
const getAllSuccess = (payload) => ({ type: GET_PROGRAMS_SUCCESS, payload });
const getAllFailed = (error) => ({ type: GET_PROGRAMS_FAILED, error });
const getAllClean = () => ({ type: CLEAN_GET_PROGRAMS });

const getOneLoading = () => ({ type: GET_ONE_LOADING });
const getOneSuccess = (payload) => ({ type: GET_ONE_SUCCESS, payload });
const getOneFailed = (error) => ({ type: GET_ONE_FAILED, error });
const getOneClean = () => ({ type: CLEAN_GET_ONE });

const createLoading = () => ({ type: CREATE_PROGRAM_LOADING });
const createSuccess = (payload) => ({ type: CREATE_PROGRAM_SUCCESS, payload });
const createFailed = (error) => ({ type: CREATE_PROGRAM_FAILED, error });
const createClean = () => ({ type: CLEAN_CREATE_PROGRAM });

const updateLoading = () => ({ type: UPDATE_PROGRAM_LOADING });
const updateSuccess = (payload) => ({ type: UPDATE_PROGRAM_SUCCESS, payload });
const updateFailed = (error) => ({ type: UPDATE_PROGRAM_FAILED, error });
const updateClean = () => ({ type: CLEAN_UPDATE_PROGRAM });

const deleteLoading = () => ({ type: DELETE_PROGRAM_LOADING });
const deleteSuccess = (payload) => ({ type: DELETE_PROGRAM_SUCCESS, payload });
const deleteFailed = (error) => ({ type: DELETE_PROGRAM_FAILED, error });
const deleteClean = () => ({ type: CLEAN_DELETE_PROGRAM });

export const retrieveAll = () => {
  return (dispatch) => {
    dispatch(getAllLoading());
    const {
      user: { current: user },
    } = store.getState();

    API.get(`coach/${user._id}/programs`)
      .then((response) => {
        dispatch(getAllSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getAllFailed(error.message));
      });
  };
};
export const cleanGetAll = () => (dispatch) => dispatch(getAllClean());

export const retrieveOne = (programId) => {
  return (dispatch) => {
    dispatch(getOneLoading());
    const {
      user: { current: user },
    } = store.getState();

    API.get(`coach/${user._id}/programs/${programId}`)
      .then((response) => {
        dispatch(getOneSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getOneFailed(error.message));
      });
  };
};
export const cleanGetOne = () => (dispatch) => dispatch(getOneClean());

export const create = (data, callback) => {
  return (dispatch) => {
    dispatch(createLoading());
    const {
      user: { current: user },
    } = store.getState();

    const normalizedData = {
      title: data.title,
      description: data.description,
      lang: data.lang || user.lang,
      isPrivate: data.isPrivate,
      userOwnerId: user._id,
      days: data.days,
      workouts: data.workouts || [],
    };

    API.post(`coach/${user._id}/programs`, normalizedData)
      .then((response) => {
        dispatch(createSuccess(response.data));
        callback && callback(response.data._id);
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

    API.put(`coach/${user._id}/programs/${programId}`, data)
      .then((response) => {
        dispatch(updateSuccess(response.data));
      })
      .catch((error) => {
        dispatch(updateFailed(error.message));
      });
  };
};
export const cleanUpdate = () => (dispatch) => dispatch(updateClean());

export const del = (programId) => {
  return (dispatch) => {
    dispatch(deleteLoading());
    const {
      user: { current: user },
    } = store.getState();

    API.delete(`coach/${user._id}/programs/${programId}`)
      .then(() => {
        dispatch(deleteSuccess(programId));
      })
      .catch((error) => {
        dispatch(deleteFailed(error.message));
      });
  };
};
export const cleanDelete = () => (dispatch) => dispatch(deleteClean());
