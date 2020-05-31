import {
  FETCH_AUTH_USER_FAILED,
  FETCH_AUTH_USER_LOADING,
  FETCH_AUTH_USER_SUCCESS,
  FETCH_USER_PROFILE_INFOS_FAILED,
  FETCH_USER_PROFILE_INFOS_LOADING,
  FETCH_USER_PROFILE_INFOS_SUCCESS,
  UPDATE_USER_PROFILE_INFOS_FAILED,
  UPDATE_USER_PROFILE_INFOS_LOADING,
  UPDATE_USER_PROFILE_INFOS_SUCCESS,
  FETCH_USER_PROFILE_LOADING,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_FAILED,
  CLEAN_UPDATE_USER,
  UPDATE_USER_LOADING,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  UPDATE_USER_PASSWORD_LOADING,
  UPDATE_USER_PASSWORD_SUCCESS,
  UPDATE_USER_PASSWORD_FAILED,
  FETCH_USER_PHYSICAL_METRICS_LOADING,
  FETCH_USER_PHYSICAL_METRICS_SUCCESS,
  FETCH_USER_PHYSICAL_METRICS_FAILED,
  ADD_USER_PHYSICAL_METRICS_LOADING,
  ADD_USER_PHYSICAL_METRICS_SUCCESS,
  ADD_USER_PHYSICAL_METRICS_FAILED,
  RESET_PROFILE_UPDATE_VALUE,
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
const updateUserPending = () => ({ type: UPDATE_USER_LOADING });
const updateUserSuccess = (payload) => ({ type: UPDATE_USER_SUCCESS, payload });
const updateUserFailed = (error) => ({ type: UPDATE_USER_FAILED, error });
const updateUserClean = () => ({ type: CLEAN_UPDATE_USER });

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
    dispatch(updateUserPending());
    const {
      user: { current: user },
    } = store.getState();
    console.log("CB???");
    API.put(`user/${user._id}`, data)
      .then((response) => {
        dispatch(updateUserSuccess(response.data));
      })
      .catch((error) => {
        console.log("error", error);
        // dispatch(
        //   updateUserFailed({
        //     error: "We could not update your profile. Please try again later.",
        //   })
        // );
      });
  };
};
export const cleanUpdate = () => (dispatch) => dispatch(updateUserClean());

// TODO: see if these comments are still relevant
/***
 * Fetch profile infos
 */
// export const fetchUserProfileInfosPending = () => ({
//   type: FETCH_USER_PROFILE_INFOS_LOADING,
// });
// export const fetchUserProfileInfosSuccess = (payload) => ({
//   type: FETCH_USER_PROFILE_INFOS_SUCCESS,
//   data: payload,
// });
// export const fetchUserProfileInfosFailed = () => ({
//   type: FETCH_USER_PROFILE_INFOS_FAILED,
// });

// export const fetchUserProfilePending = () => ({
//   type: FETCH_USER_PROFILE_LOADING,
// });
// export const fetchUserProfileSuccess = (payload) => ({
//   type: FETCH_USER_PROFILE_SUCCESS,
//   data: payload,
// });
// export const fetchUserProfileFailed = (payload) => ({
//   type: FETCH_USER_PROFILE_FAILED,
//   data: payload,
// });

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
export const updateUserPasswordLoading = () => ({
  type: UPDATE_USER_PASSWORD_LOADING,
});
export const updateUserPasswordSuccess = (payload) => ({
  type: UPDATE_USER_PASSWORD_SUCCESS,
  data: payload,
});
export const updateUserPasswordFailed = (payload) => ({
  type: UPDATE_USER_PASSWORD_FAILED,
  error: payload,
});

/***
 * Fetch physical metrics infos
 */
export const fetchUserPhysicalMetricsPending = () => ({
  type: FETCH_USER_PHYSICAL_METRICS_LOADING,
});
export const fetchUserPhysicalMetricsSuccess = (payload) => ({
  type: FETCH_USER_PHYSICAL_METRICS_SUCCESS,
  data: payload,
});
export const fetchUserPhysicalMetricsFailed = (payload) => ({
  type: FETCH_USER_PHYSICAL_METRICS_FAILED,
  data: payload,
});

/**
 * Add physical metrics
 */
export const addUserPhysicalMetricsPending = () => ({
  type: ADD_USER_PHYSICAL_METRICS_LOADING,
});
export const addUserPhysicalMetricsSuccess = (payload) => ({
  type: ADD_USER_PHYSICAL_METRICS_SUCCESS,
  data: payload,
});
export const addUserPhysicalMetricsFailed = (payload) => ({
  type: ADD_USER_PHYSICAL_METRICS_FAILED,
  data: payload,
});

/**
 * reset status
 */
export const resetProfileUpdateValues = () => ({
  type: RESET_PROFILE_UPDATE_VALUE,
});
