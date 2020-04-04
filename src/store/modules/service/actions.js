import API from "../../../services/api";

import {
  GET_ALL_FAILED,
  GET_ALL_LOADING,
  GET_ALL_SUCCESS,
  CREATE_LOADING,
  CREATE_FAILED,
  CREATE_SUCCESS,
} from "./constants";
import store from "../../index";

const getAllLoading = () => ({ type: GET_ALL_LOADING });
const getAllSuccess = (payload) => ({ type: GET_ALL_SUCCESS, user: payload });
const getAllFailed = (error) => ({ type: GET_ALL_FAILED, error });

const createLoading = () => ({ type: CREATE_LOADING });
const createSuccess = (payload) => ({ type: CREATE_SUCCESS, user: payload });
const createFailed = (error) => ({ type: CREATE_FAILED, error });

export const retrieveAll = () => {
  return (dispatch) => {
    dispatch(getAllLoading());
    const {
      auth: { authUser },
    } = store.getState();

    API.get(`coach/${authUser._id}/services`)
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
    console.log("action data", data);
    const normalizedData = {
      title: data.title,
      description: data.description,
      price: data.price * 100,
      currency: "EUR",
      address: data.address,
      coordinates: data.coordinates,
    };

    API.post(`coach/${authUser._id}/services/add`, normalizedData)
      .then((response) => {
        dispatch(createSuccess(response.data));
      })
      .catch((error) => {
        dispatch(createFailed(error.message));
      });
  };
};
