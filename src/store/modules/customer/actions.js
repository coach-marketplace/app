import axios from "axios";

import { GET_ALL_FAILED, GET_ALL_LOADING, GET_ALL_SUCCESS } from "./constants";

const getAllLoading = () => {
  return { type: GET_ALL_LOADING };
};

const getAllSuccess = payload => {
  return { type: GET_ALL_SUCCESS, user: payload };
};

const getAllFailed = error => {
  return { type: GET_ALL_FAILED, error };
};

export const getAll = () => {
  return dispatch => {
    dispatch(getAllLoading());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        dispatch(getAllSuccess(response.data));
      })
      .catch(error => {
        dispatch(getAllFailed(error.message));
      });
  };
};
