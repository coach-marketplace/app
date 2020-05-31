import cloneDeep from "lodash.clonedeep";

import initialState from "./state";
import {
  FETCH_AUTH_USER_FAILED,
  FETCH_AUTH_USER_LOADING,
  FETCH_AUTH_USER_SUCCESS,
  FETCH_USER_PROFILE_LOADING,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_FAILED,
  UPDATE_USER_LOADING,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  CLEAN_UPDATE_USER,
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
import {
  ACTION_TYPE,
  INITIAL_ACTION_STATE_NEW,
} from "../../../helper/constants";

const fetchAuthUserFailed = (state, action) => {
  const newState = cloneDeep(state);
  newState.actions.fetchAuthUser = {
    status: ACTION_TYPE.FAILED,
    error: action.error,
  };

  return newState;
};
const fetchAuthUserLoading = (state) => {
  const newState = cloneDeep(state);
  newState.actions.fetchAuthUser = { status: ACTION_TYPE.LOADING, error: null };

  return newState;
};
const fetchAuthUserSuccess = (state, action) => {
  const newState = cloneDeep(state);
  newState.current = action.payload;
  newState.actions.fetchAuthUser = { status: ACTION_TYPE.SUCCESS, error: null };

  return newState;
};

/**
 * Fetch user profile
 */
// const userProfileLoading = (state) => {
//   console.log("reducer loading")
//   const newState = cloneDeep(state);

//   newState.actions.fetchUserProfile.status = FETCH_USER_PROFILE_LOADING;
//   newState.actions.fetchUserProfile.error = "";

//   return newState;
// };
// const userProfileSuccess = (state, payload) => {
//   const newState = cloneDeep(state);
//   const { firstName, lastName, email, phone, dateOfBirth, gender } = payload;

//   firstName && (newState.firstName = firstName);
//   lastName && (newState.lastName = lastName);
//   email && (newState.email = email);
//   phone && (newState.phone = phone);
//   dateOfBirth && (newState.dateOfBirth = dateOfBirth);
//   gender && (newState.gender = gender);

//   newState.actions.fetchUserProfile.status = FETCH_USER_PROFILE_SUCCESS;
//   newState.actions.fetchUserProfile.error = "";

//   console.log(newState)

//   return newState;
// };

// const userProfileFailed = (state, payload) => {
//   const newState = cloneDeep(state);

//   newState.actions.fetchUserProfile.status = FETCH_USER_PROFILE_FAILED;
//   newState.actions.fetchUserProfile.error = payload.message;

//   return newState;
// };

/**
 * Update user profile
 */
const updateLoading = (state) => {
  const newState = cloneDeep(state);
  newState.actions.update = { status: ACTION_TYPE.LOADING, error: null };

  return newState;
};
const updateSuccess = (state, action) => {
  const newState = cloneDeep(state);
  // console.log("ok", action);
  // console.log(newState.current);
  try {
    const { firstName, lastName, phone, gender, dateOfBirth } = action.payload;
    console.log("pay", action.payload);
    newState.current.firstName = firstName;
    newState.current.lastName = lastName;
    newState.current.phone = phone;
    newState.current.gender = gender;
    newState.current.dateOfBirth = dateOfBirth;
    newState.actions.update = { status: ACTION_TYPE.SUCCESS, error: null };
  } catch (e) {
    console.log("catch", e);
  }
  return newState;
};
const updateFailed = (state, action) => {
  const newState = cloneDeep(state);
  console.log("coo");
  newState.actions.update = { status: ACTION_TYPE.FAILED, error: action.error };

  return newState;
};
const updateClean = (state) => {
  const newState = cloneDeep(state);
  newState.actions.update = { ...INITIAL_ACTION_STATE_NEW };

  return newState;
};

// const userProfileDataUpdateSuccess = (state, payload) => {
//   const newState = cloneDeep(state);
//   newState.profileData.status = UPDATE_USER_PROFILE_INFOS_SUCCESS;
//   newState.profileData.firstName = payload.firstName !== undefined ? payload.firstName : "";
//   newState.profileData.lastName = payload.lastName !== undefined ? payload.lastName : "";
//   newState.profileData.email = payload.email !== undefined ? payload.email : "";
//   newState.profileData.phoneNumber = payload.phone !== undefined ? payload.phone : "";
/**
 * Update user password
 */
const userPasswordLoading = (state) => {
  const newState = cloneDeep(state);

  newState.actions.updatePassword.status = UPDATE_USER_PASSWORD_LOADING;
  newState.actions.updatePassword.error = "";

  return newState;
};

// const userProfileDataUpdateFailed = state => {
//   const newState = cloneDeep(state);
//   newState.profileData.status = UPDATE_USER_PROFILE_INFOS_FAILED;
const userPasswordSuccess = (state, payload) => {
  const newState = cloneDeep(state);

  newState.actions.updatePassword.status = UPDATE_USER_PASSWORD_SUCCESS;
  newState.actions.updatePassword.error = "";

  return newState;
};

const userPasswordFailed = (state, payload) => {
  const newState = cloneDeep(state);

  newState.actions.updatePassword.status = UPDATE_USER_PASSWORD_FAILED;
  newState.actions.updatePassword.error = payload.message;

  return newState;
};

/**
 * Fetch user physical metrics
 */
const userPhysicalMetricsFetchLoading = (state) => {
  const newState = cloneDeep(state);

  newState.actions.fetchPhysicalMetrics.status = FETCH_USER_PHYSICAL_METRICS_LOADING;
  newState.actions.fetchPhysicalMetrics.error = "";

  return newState;
};

const userPhysicalMetricsFetchSuccess = (state, payload) => {
  const newState = cloneDeep(state);

  newState.physicalMetrics = [...payload];

  newState.actions.fetchPhysicalMetrics.status = FETCH_USER_PHYSICAL_METRICS_SUCCESS;
  newState.actions.fetchPhysicalMetrics.error = "";

  return newState;
};

const userPhysicalMetricsFetchFailed = (state, payload) => {
  const newState = cloneDeep(state);

  newState.actions.fetchPhysicalMetrics.status = FETCH_USER_PHYSICAL_METRICS_FAILED;
  newState.actions.fetchPhysicalMetrics.error = payload.message;

  return newState;
};

/**
 * Update user physical metrics
 */
const userPhysicalMetricsAddLoading = (state) => {
  const newState = cloneDeep(state);

  newState.actions.addPhysicalMetrics.status = ADD_USER_PHYSICAL_METRICS_LOADING;
  newState.actions.addPhysicalMetrics.error = "";

  return newState;
};

const userPhysicalMetricsAddSuccess = (state, payload) => {
  const newState = cloneDeep(state);

  newState.physicalMetrics.push(payload);

  newState.actions.addPhysicalMetrics.status = ADD_USER_PHYSICAL_METRICS_SUCCESS;
  newState.actions.addPhysicalMetrics.error = "";

  return newState;
};

const userPhysicalMetricsAddFailed = (state, payload) => {
  const newState = cloneDeep(state);

  newState.actions.addPhysicalMetrics.status = ADD_USER_PHYSICAL_METRICS_FAILED;
  newState.actions.addPhysicalMetrics.error = payload.message;

  return newState;
};

const resetProfileUpdateSuccess = (state) => {
  const newState = cloneDeep(state);

  newState.actions.updateUserProfile.loading = false;
  newState.actions.updateUserProfile.success = false;
  newState.actions.updateUserProfile.error = null;

  return newState;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_AUTH_USER_FAILED:
      return fetchAuthUserFailed(state, action);
    case FETCH_AUTH_USER_LOADING:
      return fetchAuthUserLoading(state);
    case FETCH_AUTH_USER_SUCCESS:
      return fetchAuthUserSuccess(state, action);
    //FETCH USER PROFILE INFOS
    // case FETCH_USER_PROFILE_INFOS_LOADING:
    //   return userProfileDataLoading(state);
    // case FETCH_USER_PROFILE_INFOS_SUCCESS:
    //   return userProfileDataSuccess(state, action.data);
    // case FETCH_USER_PROFILE_INFOS_FAILED:
    //   return userProfileDataFailed(state);

    //FETCH USER PROFILE INFOS
    // case FETCH_USER_PROFILE_LOADING:
    //   return userProfileLoading(state);
    // case FETCH_USER_PROFILE_SUCCESS:
    //   return userProfileSuccess(state, action.data);
    // case FETCH_USER_PROFILE_FAILED:
    //   return userProfileFailed(state, action.data);

    //UPDATE USER
    case UPDATE_USER_LOADING:
      return updateLoading(state);
    case UPDATE_USER_SUCCESS:
      return updateSuccess(state, action);
    case UPDATE_USER_FAILED:
      return updateFailed(state, action);
    case CLEAN_UPDATE_USER:
      return updateClean(state);

    //Update USER PASSWORD
    // case UPDATE_USER_PASSWORD_LOADING:
    //   return userPasswordLoading(state);
    // case UPDATE_USER_PASSWORD_SUCCESS:
    //   return userPasswordSuccess(state);
    // case UPDATE_USER_PASSWORD_FAILED:
    //   return userPasswordFailed(state, action.data);

    //FETCH USER BODY INFOS
    // case FETCH_USER_PHYSICAL_METRICS_LOADING:
    //   return userPhysicalMetricsFetchLoading(state);
    // case FETCH_USER_PHYSICAL_METRICS_SUCCESS:
    //   return userPhysicalMetricsFetchSuccess(state, action.data);
    // case FETCH_USER_PHYSICAL_METRICS_FAILED:
    //   return userPhysicalMetricsFetchFailed(state, action.data);

    //ADD USER BODY INFOS
    // case ADD_USER_PHYSICAL_METRICS_LOADING:
    //   return userPhysicalMetricsAddLoading(state);
    // case ADD_USER_PHYSICAL_METRICS_SUCCESS:
    //   return userPhysicalMetricsAddSuccess(state, action.data);
    // case ADD_USER_PHYSICAL_METRICS_FAILED:
    //   return userPhysicalMetricsAddFailed(state, action.data);
    // case RESET_PROFILE_UPDATE_VALUE:
    //   return resetProfileUpdateSuccess(state);

    default:
      return state;
  }
};

export default reducer;
