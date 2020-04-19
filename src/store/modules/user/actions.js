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
export const fetchAuthUser = () => {
  return (dispatch) => {
    dispatch(fetchAuthUserLoading());
    API.setToken(getTokenFromLocalStorage());
    API.get("user/me")
      .then((response) => {
        dispatch(fetchAuthUserSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchAuthUserFailed(error.message));
      });
  };
};

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

/**
 * Update profile infos
 */

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
