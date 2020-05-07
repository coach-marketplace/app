import {
  FETCH_AUTH_USER_FAILED,
  FETCH_AUTH_USER_LOADING,
  FETCH_AUTH_USER_SUCCESS,
  //   FETCH_USER_PROFILE_INFOS_FAILED,
  //   FETCH_USER_PROFILE_INFOS_LOADING,
  //   FETCH_USER_PROFILE_INFOS_SUCCESS,
  //   UPDATE_USER_PROFILE_INFOS_FAILED,
  //   UPDATE_USER_PROFILE_INFOS_LOADING,
  //   UPDATE_USER_PROFILE_INFOS_SUCCESS,
  FETCH_USER_PROFILE_PENDING,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_ERROR,
  UPDATE_USER_PROFILE_PENDING,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_ERROR,
  UPDATE_USER_PASSWORD_PENDING,
  UPDATE_USER_PASSWORD_SUCCESS,
  UPDATE_USER_PASSWORD_ERROR,
  FETCH_USER_PHYSICAL_METRICS_PENDING,
  FETCH_USER_PHYSICAL_METRICS_SUCCESS,
  FETCH_USER_PHYSICAL_METRICS_ERROR,
  ADD_USER_PHYSICAL_METRICS_PENDING,
  ADD_USER_PHYSICAL_METRICS_SUCCESS,
  ADD_USER_PHYSICAL_METRICS_ERROR,
} from "./constants";

import API from "../../../services/api";
import { getTokenFromLocalStorage } from "../../../services/local-storage";

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
 * Fetch auth user base on token in local storage
 * @return {void}
 */
export const fetchAuthUser = (token) => {
  return (dispatch) => {
    // TODO: find a way to store the token into the store state.auth.token
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

// TODO: see if these comments are still relevant
/***
 * Fetch profile infos
 */
// export const fetchUserProfileInfosPending = () => {
//   return { type: FETCH_USER_PROFILE_INFOS_LOADING };
// };

// export const fetchUserProfileInfosSuccess = (payload) => {
//   return {
//     type: FETCH_USER_PROFILE_INFOS_SUCCESS,
//     data: payload,
//   };
// };

// export const fetchUserProfileInfosFailed = () => {
//   return { type: FETCH_USER_PROFILE_INFOS_FAILED };
// };
export const fetchUserProfilePending = () => ({
  type: FETCH_USER_PROFILE_PENDING,
});
export const fetchUserProfileSuccess = (payload) => ({
  type: FETCH_USER_PROFILE_SUCCESS,
  data: payload,
});
export const fetchUserProfileFailed = (payload) => ({
  type: FETCH_USER_PROFILE_ERROR,
  data: payload,
});

/**
 * Update profile infos
 */
export const updateUserProfilePending = () => ({
  type: UPDATE_USER_PROFILE_PENDING,
});
export const updateUserProfileSuccess = (payload) => ({
  type: UPDATE_USER_PROFILE_SUCCESS,
  data: payload,
});
export const updateUserProfileFailed = (payload) => ({
  type: UPDATE_USER_PROFILE_ERROR,
  data: payload,
});

// export const updateUserProfileInfosPending = () => {
//   return { type: UPDATE_USER_PROFILE_INFOS_LOADING };
// };

// export const updateUserProfileInfosSuccess = (payload) => {
//   return {
//     type: UPDATE_USER_PROFILE_INFOS_SUCCESS,
//     data: payload,
//   };
// };

// export const updateUserProfileInfosFailed = () => {
//   return { type: UPDATE_USER_PROFILE_INFOS_FAILED };
// };
/**
 * Update user password
 */
export const updateUserPasswordPending = () => ({
  type: UPDATE_USER_PASSWORD_PENDING,
});
export const updateUserPasswordSuccess = (payload) => ({
  type: UPDATE_USER_PASSWORD_SUCCESS,
  data: payload,
});
export const updateUserPasswordFailed = (payload) => ({
  type: UPDATE_USER_PASSWORD_ERROR,
  data: payload,
});

/***
 * Fetch physical metrics infos
 */
export const fetchUserPhysicalMetricsPending = () => ({
  type: FETCH_USER_PHYSICAL_METRICS_PENDING,
});
export const fetchUserPhysicalMetricsSuccess = (payload) => ({
  type: FETCH_USER_PHYSICAL_METRICS_SUCCESS,
  data: payload,
});
export const fetchUserPhysicalMetricsFailed = (payload) => ({
  type: FETCH_USER_PHYSICAL_METRICS_ERROR,
  data: payload,
});

/**
 * Add physical metrics
 */
export const addUserPhysicalMetricsPending = () => ({
  type: ADD_USER_PHYSICAL_METRICS_PENDING,
});
export const addUserPhysicalMetricsSuccess = (payload) => ({
  type: ADD_USER_PHYSICAL_METRICS_SUCCESS,
  data: payload,
});
export const addUserPhysicalMetricsFailed = (payload) => ({
  type: ADD_USER_PHYSICAL_METRICS_ERROR,
  data: payload,
});
