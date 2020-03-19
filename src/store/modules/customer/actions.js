import API from "../../../services/api";

import {
  GET_ALL_FAILED,
  GET_ALL_LOADING,
  GET_ALL_SUCCESS,
  CREATE_LOADING,
  CREATE_FAILED,
  CREATE_SUCCESS
} from "./constants";
import store from "../../index";

const getAllLoading = () => {
  return { type: GET_ALL_LOADING };
};

const getAllSuccess = payload => {
  return { type: GET_ALL_SUCCESS, user: payload };
};

const getAllFailed = error => {
  return { type: GET_ALL_FAILED, error };
};

const createLoading = () => {
  return { type: CREATE_LOADING };
};

const createSuccess = payload => {
  return { type: CREATE_SUCCESS, user: payload };
};

const createFailed = error => {
  return { type: CREATE_FAILED, error };
};

export const getAll = () => {
  return dispatch => {
    dispatch(getAllLoading());
    const {
      auth: { authUser, token }
    } = store.getState();

    if (!authUser || !token) {
      return;
    }

    API.get(`coach/${authUser._id}/customers`)
      .then(response => {
        dispatch(getAllSuccess(response.data));
      })
      .catch(error => {
        dispatch(getAllFailed(error.message));
      });
  };
};

export const create = data => {
  return dispatch => {
    dispatch(createLoading());
    const {
      auth: { authUser, token }
    } = store.getState();

    if (!authUser || !token) {
      return;
    }

    const normalizedData = {
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      phone: data.phone
    };

    API.post(`coach/${authUser._id}/customers`, normalizedData)
      .then(response => {
        const customerId = response.data.lead;

        return API.get(`coach/${authUser._id}/customers/${customerId}`);
      })
      .then(response => {
        dispatch(createSuccess(response.data));
      })
      .catch(error => {
        dispatch(createFailed(error.message));
      });
  };
};
