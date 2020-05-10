import cloneDeep from "lodash.clonedeep";

import initialState from "./state";
import {
  FETCH_AUTH_USER_FAILED,
  FETCH_AUTH_USER_LOADING,
  FETCH_AUTH_USER_SUCCESS,
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
  RESET_PROFILE_UPDATE_VALUE
} from "./constants";

const fetchAuthUserFailed = (state, action) => {
  const newState = cloneDeep(state);

  newState.actions.fetchAuthUser.loading = false;
  newState.actions.fetchAuthUser.success = false;
  newState.actions.fetchAuthUser.error = action.error;

  return newState;
};

const fetchAuthUserLoading = (state) => {
  const newState = cloneDeep(state);

  newState.actions.fetchAuthUser.loading = true;
  newState.actions.fetchAuthUser.success = false;
  newState.actions.fetchAuthUser.error = null;

  return newState;
};

const fetchAuthUserSuccess = (state, action) => {
  const newState = cloneDeep(state);

  newState.current = action.payload;
  newState.actions.fetchAuthUser.loading = false;
  newState.actions.fetchAuthUser.error = null;
  newState.actions.fetchAuthUser.success = true;

  console.log(newState)

  return newState;
};

/**
 * Fetch user profile
 */
const userProfileLoading = (state) => {
  console.log("reducer loading")
  const newState = cloneDeep(state);

  newState.actions.fetchUserProfile.status = FETCH_USER_PROFILE_PENDING;
  newState.actions.fetchUserProfile.error = "";

  return newState;
};

const userProfileSuccess = (state, payload) => {
  const newState = cloneDeep(state);
  const { firstName, lastName, email, phone, dateOfBirth, gender } = payload;

  firstName && (newState.firstName = firstName);
  lastName && (newState.lastName = lastName);
  email && (newState.email = email);
  phone && (newState.phone = phone);
  dateOfBirth && (newState.dateOfBirth = dateOfBirth);
  gender && (newState.gender = gender);

  newState.actions.fetchUserProfile.status = FETCH_USER_PROFILE_SUCCESS;
  newState.actions.fetchUserProfile.error = "";

  console.log(newState)

  return newState;
};

const userProfileFailed = (state, payload) => {
  const newState = cloneDeep(state);

  newState.actions.fetchUserProfile.status = FETCH_USER_PROFILE_ERROR;
  newState.actions.fetchUserProfile.error = payload.message;

  return newState;
};


/**
 * Update user profile
 */
const userProfileUpdateLoading = (state) => {
  const newState = cloneDeep(state);

  newState.actions.updateUserProfile.loading = true;
  newState.actions.updateUserProfile.success = false;
  newState.actions.updateUserProfile.error = null;

  return newState;
};

const userProfileUpdateSuccess = (state, payload) => {
  const newState = cloneDeep(state);
  const profile = (({ 
    firstName, 
    lastName, 
    email, 
    phone, 
    gender, 
    dateOfBirth 
  }) => ({ 
    firstName, 
    lastName, 
    email, 
    phone, 
    gender, 
    dateOfBirth 
   }))(payload);

   console.log(profile)

  newState.actions.updateUserProfile.loading = false;
  newState.actions.updateUserProfile.success = true;
  newState.actions.updateUserProfile.error = null;
  //newState.current = {...newState.current, profile}
  //newState.current.firstName = "Jean"



  return newState;
};

const userProfileUpdateFailed = (state, payload) => {
  const newState = cloneDeep(state);

  newState.actions.updateUserProfile.loading = false;
  newState.actions.updateUserProfile.success = false;
  newState.actions.updateUserProfile.error = payload.error;

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

  newState.actions.updatePassword.status = UPDATE_USER_PASSWORD_PENDING;
  newState.actions.updatePassword.error = "";

  return newState;
};

// const userProfileDataUpdateFailed = state => {
//   const newState = cloneDeep(state);
//   newState.profileData.status = UPDATE_USER_PROFILE_INFOS_ERROR;
const userPasswordSuccess = (state, payload) => {
  const newState = cloneDeep(state);

  newState.actions.updatePassword.status = UPDATE_USER_PASSWORD_SUCCESS;
  newState.actions.updatePassword.error = "";

  return newState;
};

const userPasswordFailed = (state, payload) => {
  const newState = cloneDeep(state);

  newState.actions.updatePassword.status = UPDATE_USER_PASSWORD_ERROR;
  newState.actions.updatePassword.error = payload.message;

  return newState;
};

/**
 * Fetch user physical metrics
 */
const userPhysicalMetricsFetchLoading = (state) => {
  const newState = cloneDeep(state);

  newState.actions.fetchPhysicalMetrics.status = FETCH_USER_PHYSICAL_METRICS_PENDING;
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

  newState.actions.fetchPhysicalMetrics.status = FETCH_USER_PHYSICAL_METRICS_ERROR;
  newState.actions.fetchPhysicalMetrics.error = payload.message;

  return newState;
};

/**
 * Update user physical metrics
 */
const userPhysicalMetricsAddLoading = (state) => {
  const newState = cloneDeep(state);

  newState.actions.addPhysicalMetrics.status = ADD_USER_PHYSICAL_METRICS_PENDING;
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

  newState.actions.addPhysicalMetrics.status = ADD_USER_PHYSICAL_METRICS_ERROR;
  newState.actions.addPhysicalMetrics.error = payload.message;

  return newState;
};

const resetProfileUpdateSuccess = (state) => {
  const newState = cloneDeep(state);

  newState.actions.updateUserProfile.loading = false;
  newState.actions.updateUserProfile.success = false;
  newState.actions.updateUserProfile.error = null;

  return newState;
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_AUTH_USER_FAILED:
      return fetchAuthUserFailed(state, action);
    case FETCH_AUTH_USER_LOADING:
      return fetchAuthUserLoading(state);
    case FETCH_AUTH_USER_SUCCESS:
      return fetchAuthUserSuccess(state, action);
    //FETCH USER PROFILE INFOS
    // case FETCH_USER_PROFILE_INFOS_PENDING:
    //   return userProfileDataLoading(state);
    // case FETCH_USER_PROFILE_INFOS_SUCCESS:
    //   return userProfileDataSuccess(state, action.data);
    // case FETCH_USER_PROFILE_INFOS_ERROR:
    //   return userProfileDataFailed(state);

   
    //FETCH USER PROFILE INFOS
    case FETCH_USER_PROFILE_PENDING:
      return userProfileLoading(state);
    case FETCH_USER_PROFILE_SUCCESS:
      return userProfileSuccess(state, action.data);
    case FETCH_USER_PROFILE_ERROR:
      return userProfileFailed(state, action.data);

    //UPDATE USER PROFILE INFOS
    case UPDATE_USER_PROFILE_PENDING:
      return userProfileUpdateLoading(state);
    case UPDATE_USER_PROFILE_SUCCESS:
      return userProfileUpdateSuccess(state, action.data);
    case UPDATE_USER_PROFILE_ERROR:
      return userProfileUpdateFailed(state, action.data);

    //Update USER PASSWORD
    case UPDATE_USER_PASSWORD_PENDING:
      return userPasswordLoading(state);
    case UPDATE_USER_PASSWORD_SUCCESS:
      return userPasswordSuccess(state);
    case UPDATE_USER_PASSWORD_ERROR:
      return userPasswordFailed(state, action.data);

    //FETCH USER BODY INFOS
    case FETCH_USER_PHYSICAL_METRICS_PENDING:
      return userPhysicalMetricsFetchLoading(state);
    case FETCH_USER_PHYSICAL_METRICS_SUCCESS:
      return userPhysicalMetricsFetchSuccess(state, action.data);
    case FETCH_USER_PHYSICAL_METRICS_ERROR:
      return userPhysicalMetricsFetchFailed(state, action.data);

    //ADD USER BODY INFOS
    case ADD_USER_PHYSICAL_METRICS_PENDING:
      return userPhysicalMetricsAddLoading(state);
    case ADD_USER_PHYSICAL_METRICS_SUCCESS:
      return userPhysicalMetricsAddSuccess(state, action.data);
    case ADD_USER_PHYSICAL_METRICS_ERROR:
      return userPhysicalMetricsAddFailed(state, action.data);
    case RESET_PROFILE_UPDATE_VALUE:
      return resetProfileUpdateSuccess(state);

    default:
      return state;
  }
};

export default reducer;
