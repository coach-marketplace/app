import API from "../../../services/api";

import {
  GET_CUSTOMERS_FAILED,
  GET_CUSTOMERS_LOADING,
  GET_CUSTOMERS_SUCCESS,
  CREATE_LOADING,
  CREATE_FAILED,
  CREATE_SUCCESS,
} from "./constants";
import store from "../../index";

const getAllLoading = () => ({ type: GET_CUSTOMERS_LOADING });
const getAllSuccess = (payload) => ({ type: GET_CUSTOMERS_SUCCESS, payload });
const getAllFailed = (error) => ({ type: GET_CUSTOMERS_FAILED, error });

const createLoading = () => ({ type: CREATE_LOADING });
const createSuccess = (payload) => ({ type: CREATE_SUCCESS, payload });
const createFailed = (error) => ({ type: CREATE_FAILED, error });

export const retrieveAll = () => {
  return (dispatch) => {
    dispatch(getAllLoading());
    const {
      auth: { authUser },
    } = store.getState();

    API.get(`coach/${authUser._id}/customers`)
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
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
    };

    API.post(`coach/${authUser._id}/customers`, normalizedData)
      // .then(response => {
      //   const customerId = response.data.lead;

      //   return API.get(`coach/${authUser._id}/customers/${customerId}`);
      // })
      .then((response) => {
        dispatch(createSuccess(response.data));
      })
      .catch((error) => {
        dispatch(createFailed(error.message));
      });
  };
};
