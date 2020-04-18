import cloneDeep from "lodash.clonedeep";

import initialState from "./state";
import {
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

/**
 * Fetch user profile
 */
const userProfileLoading = (state) => {
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

  newState.actions.updateUserProfile.status = UPDATE_USER_PROFILE_PENDING;
  newState.actions.updateUserProfile.error = "";

  return newState;
};

const userProfileUpdateSuccess = (state, payload) => {
  const newState = cloneDeep(state);
  const { firstName, lastName, email, phone, dateOfBirth, gender } = payload;

  firstName && (newState.firstName = firstName);
  lastName && (newState.lastName = lastName);
  email && (newState.email = email);
  phone && (newState.phone = phone);
  dateOfBirth && (newState.dateOfBirth = dateOfBirth);
  gender && (newState.gender = gender);

  newState.actions.updateUserProfile.status = UPDATE_USER_PROFILE_SUCCESS;
  newState.actions.updateUserProfile.error = "";

  return newState;
};

const userProfileUpdateFailed = (state, payload) => {
  const newState = cloneDeep(state);

  newState.actions.updateUserProfile.status = UPDATE_USER_PROFILE_ERROR;
  newState.actions.updateUserProfile.error = payload.message;

  return newState;
};

/**
 * Update user password
 */
const userPasswordLoading = (state) => {
  const newState = cloneDeep(state);

  newState.actions.updatePassword.status = UPDATE_USER_PASSWORD_PENDING;
  newState.actions.updatePassword.error = "";

  return newState;
};

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

const reducer = (state = initialState, action) => {
  switch (action.type) {
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

    default:
      return state;
  }
};

export default reducer;
