import API from "../../../services/api";

import {
  GET_CONVERSATIONS_FAILED,
  GET_CONVERSATIONS_LOADING,
  GET_CONVERSATIONS_SUCCESS,
  GET_CONVERSATION_FAILED,
  GET_CONVERSATION_LOADING,
  GET_CONVERSATION_SUCCESS,
  CREATE_CONVERSATION_LOADING,
  CREATE_CONVERSATION_FAILED,
  CREATE_CONVERSATION_SUCCESS,
  CREATE_CLEAN,
} from "./constants";
import store from "../../index";

const getAllLoading = () => ({ type: GET_CONVERSATIONS_LOADING });
const getAllSuccess = (payload) => ({
  type: GET_CONVERSATIONS_SUCCESS,
  payload,
});
const getAllFailed = (error) => ({ type: GET_CONVERSATIONS_FAILED, error });

const getOneLoading = () => ({ type: GET_CONVERSATION_LOADING });
const getOneSuccess = (payload) => ({
  type: GET_CONVERSATION_SUCCESS,
  payload,
});
const getOneFailed = (error) => ({ type: GET_CONVERSATION_FAILED, error });

const createLoading = () => ({ type: CREATE_CONVERSATION_LOADING });
const createSuccess = (payload) => ({
  type: CREATE_CONVERSATION_SUCCESS,
  payload,
});
const createFailed = (error) => ({ type: CREATE_CONVERSATION_FAILED, error });
const createClean = () => ({ type: CREATE_CLEAN });

export const retrieveAll = () => {
  return (dispatch) => {
    dispatch(getAllLoading());
    const {
      user: { current: user },
    } = store.getState();

    API.get(`user/${user._id}/conversations`)
      .then((response) => {
        dispatch(getAllSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getAllFailed(error.message));
      });
  };
};

export const retrieveOne = (conversationId) => {
  return (dispatch) => {
    dispatch(getOneLoading());
    const {
      user: { current: user },
    } = store.getState();

    API.get(`user/${user._id}/conversations/${conversationId}`)
      .then((response) => {
        dispatch(getOneSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getOneFailed(error.message));
      });
  };
};

export const create = (memberIds) => {
  return (dispatch) => {
    dispatch(createLoading());
    const {
      user: { current: user },
    } = store.getState();

    const normalizedData = {
      memberIds: [...memberIds],
    };

    API.post(`user/${user._id}/conversations`, normalizedData)
      .then((response) => {
        dispatch(createSuccess(response.data));
      })
      .catch((error) => {
        dispatch(createFailed(error.message));
      });
  };
};

export const resetCreateAction = () => (dispatch) => dispatch(createClean());
