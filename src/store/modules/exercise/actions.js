import API from "../../../services/api";

import {
  GET_EXERCISES_FAILED,
  GET_EXERCISES_LOADING,
  GET_EXERCISES_SUCCESS,
  CREATE_EXERCISE_LOADING,
  CREATE_EXERCISE_FAILED,
  CREATE_EXERCISE_SUCCESS,
} from "./constants";
import store from "../../index";

const getAllLoading = () => ({ type: GET_EXERCISES_LOADING });
const getAllSuccess = (payload) => ({ type: GET_EXERCISES_SUCCESS, payload });
const getAllFailed = (error) => ({ type: GET_EXERCISES_FAILED, error });

const createLoading = () => ({ type: CREATE_EXERCISE_LOADING });
const createSuccess = (payload) => ({ type: CREATE_EXERCISE_SUCCESS, payload });
const createFailed = (error) => ({ type: CREATE_EXERCISE_FAILED, error });

export const retrieveAll = () => {
  return (dispatch) => {
    dispatch(getAllLoading());
    const {
      auth: { authUser },
    } = store.getState();

    API.get(`coach/${authUser._id}/exercises`)
      .then((response) => {
        dispatch(getAllSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getAllFailed(error.message));
      });
  };
};

export const create = (data) => {
  return (dispatch) => {
    dispatch(createLoading());
    const {
      auth: { authUser },
    } = store.getState();

    const normalizedData = {
      name: data.name,
      instructions: data.instructions,
      lang: data.lang || authUser.lang,
      isPrivate: data.isPrivate,
      userOwnerId: authUser._id,
      videoUrl: data.videoUrl,
    };

    API.post(`coach/${authUser._id}/exercises/add`, normalizedData)
      .then((response) => {
        console.log("response", response);
        dispatch(createSuccess(response.data));
      })
      .catch((error) => {
        dispatch(createFailed(error.message));
      });
  };
};
