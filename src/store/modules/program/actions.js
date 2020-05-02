import API from "../../../services/api";

import {
  GET_PROGRAMS_FAILED,
  GET_PROGRAMS_LOADING,
  GET_PROGRAMS_SUCCESS,
  CREATE_PROGRAM_LOADING,
  CREATE_PROGRAM_FAILED,
  CREATE_PROGRAM_SUCCESS,
} from "./constants";
import store from "../../index";

const getAllLoading = () => ({ type: GET_PROGRAMS_LOADING });
const getAllSuccess = (payload) => ({ type: GET_PROGRAMS_SUCCESS, payload });
const getAllFailed = (error) => ({ type: GET_PROGRAMS_FAILED, error });

const createLoading = () => ({ type: CREATE_PROGRAM_LOADING });
const createSuccess = (payload) => ({ type: CREATE_PROGRAM_SUCCESS, payload });
const createFailed = (error) => ({ type: CREATE_PROGRAM_FAILED, error });

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

export const create = (data) => {
  return (dispatch) => {
    dispatch(createLoading());
    const {
      user: { current: user },
    } = store.getState();

    const normalizedData = {
      title: data.title,
      description: data.description,
      lang: data.lang || user.lang || "en",
      isPrivate: data.isPrivate,
      userOwnerId: user._id,
      days: data.days,
      workouts: data.workouts,
    };

    API.post(`coach/${user._id}/programs`, normalizedData)
      .then((response) => {
        console.log("response", response);
        dispatch(createSuccess(response.data));
      })
      .catch((error) => {
        dispatch(createFailed(error.message));
      });
  };
};
