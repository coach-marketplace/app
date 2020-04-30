import API from "../../../services/api";

import {
  GET_WORKOUTS_FAILED,
  GET_WORKOUTS_LOADING,
  GET_WORKOUTS_SUCCESS,
  CREATE_WORKOUT_LOADING,
  CREATE_WORKOUT_FAILED,
  CREATE_WORKOUT_SUCCESS,
} from "./constants";
import store from "../../index";

const getAllLoading = () => ({ type: GET_WORKOUTS_LOADING });
const getAllSuccess = (payload) => ({ type: GET_WORKOUTS_SUCCESS, payload });
const getAllFailed = (error) => ({ type: GET_WORKOUTS_FAILED, error });

const createLoading = () => ({ type: CREATE_WORKOUT_LOADING });
const createSuccess = (payload) => ({ type: CREATE_WORKOUT_SUCCESS, payload });
const createFailed = (error) => ({ type: CREATE_WORKOUT_FAILED, error });

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

export const create = (data) => {
  return (dispatch) => {
    dispatch(createLoading());
    const {
      user: { current: user },
    } = store.getState();

    const normalizedData = {
      title: data.title,
      content: data.content,
      lang: data.lang || user.lang || "en",
      isPrivate: data.isPrivate,
      userOwnerId: user._id,
    };

    API.post(`coach/${user._id}/workouts`, normalizedData)
      .then((response) => {
        console.log("response", response);
        dispatch(createSuccess(response.data));
      })
      .catch((error) => {
        dispatch(createFailed(error.message));
      });
  };
};
