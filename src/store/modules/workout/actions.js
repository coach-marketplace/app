import API from "../../../services/api";

import {
  GET_WORKOUTS_FAILED,
  GET_WORKOUTS_LOADING,
  GET_WORKOUTS_SUCCESS,
  CLEAN_GET_WORKOUTS,
  FETCH_WORKOUT_FAILED,
  FETCH_WORKOUT_LOADING,
  FETCH_WORKOUT_SUCCESS,
  CLEAN_FETCH_WORKOUT,
  CREATE_WORKOUT_LOADING,
  CREATE_WORKOUT_FAILED,
  CREATE_WORKOUT_SUCCESS,
  CLEAN_CREATE_WORKOUT,
  UPDATE_WORKOUT_LOADING,
  UPDATE_WORKOUT_FAILED,
  UPDATE_WORKOUT_SUCCESS,
  CLEAN_UPDATE_WORKOUT,
  DELETE_WORKOUT_LOADING,
  DELETE_WORKOUT_FAILED,
  DELETE_WORKOUT_SUCCESS,
  CLEAN_DELETE_WORKOUT,
} from "./constants";
import store from "../../index";

const getAllLoading = () => ({ type: GET_WORKOUTS_LOADING });
const getAllSuccess = (payload) => ({ type: GET_WORKOUTS_SUCCESS, payload });
const getAllFailed = (error) => ({ type: GET_WORKOUTS_FAILED, error });
const getAllClean = () => ({ type: CLEAN_GET_WORKOUTS });

const fetchLoading = () => ({ type: FETCH_WORKOUT_LOADING });
const fetchSuccess = (payload) => ({ type: FETCH_WORKOUT_SUCCESS, payload });
const fetchFailed = (error) => ({ type: FETCH_WORKOUT_FAILED, error });
const fetchClean = () => ({ type: CLEAN_FETCH_WORKOUT });

const createLoading = () => ({ type: CREATE_WORKOUT_LOADING });
const createSuccess = (payload) => ({ type: CREATE_WORKOUT_SUCCESS, payload });
const createFailed = (error) => ({ type: CREATE_WORKOUT_FAILED, error });
const createClean = () => ({ type: CLEAN_CREATE_WORKOUT });

const updateLoading = () => ({ type: UPDATE_WORKOUT_LOADING });
const updateSuccess = (payload) => ({ type: UPDATE_WORKOUT_SUCCESS, payload });
const updateFailed = (error) => ({ type: UPDATE_WORKOUT_FAILED, error });
const updateClean = () => ({ type: CLEAN_UPDATE_WORKOUT });

const deleteLoading = () => ({ type: DELETE_WORKOUT_LOADING });
const deleteSuccess = (payload) => ({ type: DELETE_WORKOUT_SUCCESS, payload });
const deleteFailed = (error) => ({ type: DELETE_WORKOUT_FAILED, error });
const deleteClean = () => ({ type: CLEAN_DELETE_WORKOUT });

export const retrieveAll = () => {
  return (dispatch) => {
    dispatch(getAllLoading());
    const {
      user: { current: user },
    } = store.getState();

    API.get(`coach/${user._id}/workouts`)
      .then((response) => {
        dispatch(getAllSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getAllFailed(error.message));
      });
  };
};
export const cleanGetAll = () => (dispatch) => dispatch(getAllClean());

export const fetch = (workoutId, callback) => {
  return (dispatch) => {
    dispatch(fetchLoading());
    const {
      user: { current: user },
    } = store.getState();

    API.get(`coach/${user._id}/workouts/${workoutId}`)
      .then((response) => {
        dispatch(fetchSuccess(response.data));
        callback(response.data);
      })
      .catch((error) => {
        dispatch(fetchFailed(error.message));
      });
  };
};
export const cleanFetchOne = () => (dispatch) => dispatch(fetchClean());

export const create = (data, callback) => {
  return (dispatch) => {
    dispatch(createLoading());
    const {
      user: { current: user },
    } = store.getState();

    const normalizedData = {
      title: data.title,
      instructions: data.instructions,
      lang: data.lang || user.lang || "en",
      isPrivate: data.isPrivate,
      userOwnerId: user._id,
    };

    API.post(`coach/${user._id}/workouts`, normalizedData)
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

export const update = (workoutId, data) => {
  return (dispatch) => {
    dispatch(updateLoading());
    const {
      user: { current: user },
    } = store.getState();

    API.put(`coach/${user._id}/workouts/${workoutId}`, data)
      .then((response) => {
        console.log("lol", response.data);
        dispatch(updateSuccess(response.data));
      })
      .catch((error) => {
        dispatch(updateFailed(error.message));
      });
  };
};
export const cleanUpdate = () => (dispatch) => dispatch(updateClean());

export const del = (workoutId) => {
  return (dispatch) => {
    dispatch(deleteLoading());
    const {
      user: { current: user },
    } = store.getState();

    API.delete(`coach/${user._id}/workouts/${workoutId}`)
      .then(() => {
        dispatch(deleteSuccess(workoutId));
      })
      .catch((error) => {
        dispatch(deleteFailed(error.message));
      });
  };
};
export const cleanDelete = () => (dispatch) => dispatch(deleteClean());
