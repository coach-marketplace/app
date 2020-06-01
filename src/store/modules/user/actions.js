import {
  FETCH_AUTH_USER_FAILED,
  FETCH_AUTH_USER_LOADING,
  FETCH_AUTH_USER_SUCCESS,
  UPDATE_USER_LOADING,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  CLEAN_UPDATE_USER,
  FETCH_USER_PHYSICAL_METRICS_LOADING,
  FETCH_USER_PHYSICAL_METRICS_SUCCESS,
  FETCH_USER_PHYSICAL_METRICS_FAILED,
  CLEAN_FETCH_USER_PHYSICAL_METRICS,
  ADD_USER_PHYSICAL_METRICS_LOADING,
  ADD_USER_PHYSICAL_METRICS_SUCCESS,
  ADD_USER_PHYSICAL_METRICS_FAILED,
  CLEAN_ADD_USER_PHYSICAL_METRICS,
  UPDATE_PASSWORD_LOADING,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILED,
  CLEAN_UPDATE_PASSWORD,
} from "./constants";
import store from "../../index";
import API from "../../../services/api";
import { getTokenFromLocalStorage } from "../../../services/local-storage";

/**
 * Fetch auth user
 */
const fetchAuthUserLoading = () => ({ type: FETCH_AUTH_USER_LOADING });
const fetchAuthUserSuccess = (payload) => ({
  type: FETCH_AUTH_USER_SUCCESS,
  payload,
});
const fetchAuthUserFailed = (error) => ({
  type: FETCH_AUTH_USER_FAILED,
  error,
});

/**
 * Update user
 */
const updateUserLoading = () => ({ type: UPDATE_USER_LOADING });
const updateUserSuccess = (payload) => ({ type: UPDATE_USER_SUCCESS, payload });
const updateUserFailed = (error) => ({ type: UPDATE_USER_FAILED, error });
const updateUserClean = () => ({ type: CLEAN_UPDATE_USER });

/**
 * Fetch user physical metrics
 */
const fetchPhysicalMetricsLoading = () => ({
  type: FETCH_USER_PHYSICAL_METRICS_LOADING,
});
const fetchPhysicalMetricsSuccess = (payload) => ({
  type: FETCH_USER_PHYSICAL_METRICS_SUCCESS,
  payload,
});
const fetchPhysicalMetricsFailed = (error) => ({
  type: FETCH_USER_PHYSICAL_METRICS_FAILED,
  error,
});
const fetchPhysicalMetricsClean = () => ({
  type: CLEAN_FETCH_USER_PHYSICAL_METRICS,
});

/**
 * Add user physical metrics
 */
const addPhysicalMetricsLoading = () => ({
  type: ADD_USER_PHYSICAL_METRICS_LOADING,
});
const addPhysicalMetricsSuccess = (payload) => ({
  type: ADD_USER_PHYSICAL_METRICS_SUCCESS,
  payload,
});
const addPhysicalMetricsFailed = (error) => ({
  type: ADD_USER_PHYSICAL_METRICS_FAILED,
  error,
});
const addPhysicalMetricsClean = () => ({
  type: CLEAN_ADD_USER_PHYSICAL_METRICS,
});

/**
 * Update user password
 */
const updatePasswordLoading = () => ({
  type: UPDATE_PASSWORD_LOADING,
});
const updatePasswordSuccess = (payload) => ({
  type: UPDATE_PASSWORD_SUCCESS,
  payload,
});
const updatePasswordFailed = (error) => ({
  type: UPDATE_PASSWORD_FAILED,
  error,
});
const updatePasswordClean = () => ({
  type: CLEAN_UPDATE_PASSWORD,
});

/**
 * Fetch auth user base on token in local storage
 * @return {void}
 */
export const fetchAuthUser = (token) => {
  return (dispatch) => {
    dispatch(fetchAuthUserLoading());
    API.setToken(token || getTokenFromLocalStorage());
    API.get("user/me")
      .then((response) => {
        dispatch(fetchAuthUserSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchAuthUserFailed(error.message));
      });
  };
};

export const update = (data) => {
  return (dispatch) => {
    dispatch(updateUserLoading());
    const {
      user: { current: user },
    } = store.getState();

    API.put(`user/${user._id}`, data)
      .then((response) => {
        dispatch(updateUserSuccess(response.data));
      })
      .catch((error) => {
        dispatch(
          updateUserFailed({
            error: "We could not update your profile. Please try again later.",
          })
        );
      });
  };
};
export const cleanUpdate = () => (dispatch) => dispatch(updateUserClean());

export const fetchPhysicalMetrics = () => {
  return (dispatch) => {
    dispatch(fetchPhysicalMetricsLoading());
    const {
      user: { current: user },
    } = store.getState();

    API.get(`user/${user._id}/physical-metrics`)
      .then((response) => {
        dispatch(fetchPhysicalMetricsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(
          fetchPhysicalMetricsFailed({
            error: "Error during fetching.",
          })
        );
      });
  };
};
export const cleanFetchPhysicalMetrics = () => (dispatch) =>
  dispatch(fetchPhysicalMetricsClean());

export const addPhysicalMetrics = (data) => {
  return (dispatch) => {
    dispatch(addPhysicalMetricsLoading());
    const {
      user: { current: user },
    } = store.getState();

    API.post(`user/${user._id}/physical-metrics`, data)
      .then((response) => {
        dispatch(addPhysicalMetricsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(addPhysicalMetricsFailed("Error during adding."));
      });
  };
};
export const cleanAddPhysicalMetrics = () => (dispatch) =>
  dispatch(addPhysicalMetricsClean());

export const updatePassword = (data) => {
  return (dispatch) => {
    dispatch(updatePasswordLoading());
    const {
      user: { current: user },
    } = store.getState();

    API.post(`user/${user._id}/change-password`, data)
      .then((response) => {
        dispatch(updatePasswordSuccess(response.data));
      })
      .catch((error) => {
        dispatch(updatePasswordFailed("Error during adding."));
      });
  };
};
export const cleanUpdatePassword = () => (dispatch) =>
  dispatch(updatePasswordClean());
