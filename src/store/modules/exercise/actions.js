import API from "../../../services/api";

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
import store from "../../index";

const getAllLoading = () => ({ type: GET_EXERCISES_LOADING });
const getAllSuccess = (payload) => ({ type: GET_EXERCISES_SUCCESS, payload });
const getAllFailed = (error) => ({ type: GET_EXERCISES_FAILED, error });
const getAllClean = () => ({ type: CLEAN_GET_EXERCISES });

const createLoading = () => ({ type: CREATE_EXERCISE_LOADING });
const createSuccess = (payload) => ({ type: CREATE_EXERCISE_SUCCESS, payload });
const createFailed = (error) => ({ type: CREATE_EXERCISE_FAILED, error });
const createClean = () => ({ type: CLEAN_CREATE_EXERCISE });

const updateLoading = () => ({ type: UPDATE_EXERCISE_LOADING });
const updateSuccess = (payload) => ({ type: UPDATE_EXERCISE_SUCCESS, payload });
const updateFailed = (error) => ({ type: UPDATE_EXERCISE_FAILED, error });
const updateClean = () => ({ type: CLEAN_UPDATE_EXERCISE });

const deleteLoading = () => ({ type: DELETE_EXERCISE_LOADING });
const deleteSuccess = (payload) => ({ type: DELETE_EXERCISE_SUCCESS, payload });
const deleteFailed = (error) => ({ type: DELETE_EXERCISE_FAILED, error });
const deleteClean = () => ({ type: CLEAN_DELETE_EXERCISE });

export const retrieveAll = () => {
  return (dispatch) => {
    dispatch(getAllLoading());
    const {
      user: { current: user },
    } = store.getState();

    API.get(`coach/${user._id}/exercises`)
      .then((response) => {
        dispatch(getAllSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getAllFailed(error.message));
      });
  };
};
export const cleanGetAll = () => (dispatch) => dispatch(getAllClean());

export const create = (data) => {
  return (dispatch) => {
    dispatch(createLoading());
    const {
      user: { current: user },
    } = store.getState();

    const normalizedData = {
      name: data.name,
      instructions: data.instructions,
      lang: data.lang || user.lang,
      isPrivate: data.isPrivate,
      userOwnerId: user._id,
      videoUrl: data.videoUrl,
    };

    API.post(`coach/${user._id}/exercises`, normalizedData)
      .then((response) => {
        dispatch(createSuccess(response.data));
      })
      .catch((error) => {
        dispatch(createFailed(error.message));
      });
  };
};
export const cleanCreate = () => (dispatch) => dispatch(createClean());

export const update = (exerciseId, data) => {
  return (dispatch) => {
    dispatch(updateLoading());
    const {
      user: { current: user },
    } = store.getState();

    API.put(`coach/${user._id}/exercises/${exerciseId}`, data)
      .then((response) => {
        dispatch(updateSuccess(response.data));
      })
      .catch((error) => {
        dispatch(updateFailed(error.message));
      });
  };
};
export const cleanUpdate = () => (dispatch) => dispatch(updateClean());

export const del = (exerciseId) => {
  return (dispatch) => {
    dispatch(deleteLoading());
    const {
      user: { current: user },
    } = store.getState();

    API.delete(`coach/${user._id}/exercises/${exerciseId}`)
      .then(() => {
        dispatch(deleteSuccess(exerciseId));
      })
      .catch((error) => {
        dispatch(deleteFailed(error.message));
      });
  };
};
export const cleanDelete = () => (dispatch) => dispatch(deleteClean());
