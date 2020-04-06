import initialState from "./state";

import {
  FETCH_USER_PROFILE_INFOS_PENDING,
  FETCH_USER_PROFILE_INFOS_SUCCESS,
  FETCH_USER_PROFILE_INFOS_ERROR,

  UPDATE_USER_PROFILE_INFOS_PENDING,
  UPDATE_USER_PROFILE_INFOS_SUCCESS,
  UPDATE_USER_PROFILE_INFOS_ERROR,

  UPDATE_USER_PASSWORD_PENDING,
  UPDATE_USER_PASSWORD_SUCCESS,
  UPDATE_USER_PASSWORD_ERROR,
} from "./constants";

import cloneDeep from "lodash.clonedeep";

// FETCH USER INFOS 

const userProfileDataLoading = state => {
  const newState = cloneDeep(state);
  newState.profileData.status = FETCH_USER_PROFILE_INFOS_PENDING;
  return newState;
};

const userProfileDataSuccess = (state, payload) => {
  const newState = cloneDeep(state);
  newState.profileData.status = FETCH_USER_PROFILE_INFOS_SUCCESS;
  newState.profileData.firstName = payload.firstName !== undefined ? payload.firstName : "";
  newState.profileData.lastName = payload.lastName !== undefined ? payload.lastName : "";
  newState.profileData.email = payload.email !== undefined ? payload.email : "";
  newState.profileData.phone = payload.phone !== undefined ? payload.phone : "";
  return newState;
};

const userProfileDataFailed = (state, payload) => {
  const newState = cloneDeep(state);
  newState.profileData.status = FETCH_USER_PROFILE_INFOS_ERROR;
  newState.profileData.message = payload.message;

  return newState;
};

//UPDATE USER INFOS

const userProfileDataUpdateLoading = state => {
  const newState = cloneDeep(state);
  newState.profileData.status = UPDATE_USER_PROFILE_INFOS_PENDING;

  return newState;
};

const userProfileDataUpdateSuccess = (state, payload) => {
  const newState = cloneDeep(state);
  newState.profileData.status = UPDATE_USER_PROFILE_INFOS_SUCCESS;
  newState.profileData.message = payload.message !== undefined ? payload.message : "";
  newState.profileData.firstName = payload.firstName !== undefined ? payload.firstName : "";
  newState.profileData.lastName = payload.lastName !== undefined ? payload.lastName : "";
  newState.profileData.email = payload.email !== undefined ? payload.email : "";
  newState.profileData.phoneNumber = payload.phone !== undefined ? payload.phone : "";

  return newState;
};

const userProfileDataUpdateFailed = (state, payload) => {
  const newState = cloneDeep(state);
  newState.profileData.status = UPDATE_USER_PROFILE_INFOS_ERROR;
  newState.profileData.message = payload.message;

  return newState;
};

// CHANGE USER PASSWORD

const changeUserPasswordLoading = state => {
  const newState = cloneDeep(state);
  newState.passwordData.status = UPDATE_USER_PASSWORD_PENDING;

  return newState;
};

const changeUserPasswordSuccess = (state, payload) => {
  const newState = cloneDeep(state);
  newState.passwordData.status = UPDATE_USER_PASSWORD_SUCCESS;
  newState.passwordData.message = payload.message;
  
  return newState;
};

const changeUserPasswordFailed = (state, payload) => {
  const newState = cloneDeep(state);
  newState.passwordData.status = UPDATE_USER_PASSWORD_ERROR;
  newState.passwordData.message = payload.message;

  return newState;
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
      //FETCH USER PROFILE INFOS
      case FETCH_USER_PROFILE_INFOS_PENDING:
        return userProfileDataLoading(state);
      case FETCH_USER_PROFILE_INFOS_SUCCESS:
        return userProfileDataSuccess(state, action.data);
      case FETCH_USER_PROFILE_INFOS_ERROR:
        return userProfileDataFailed(state, action.data);
      
      //UPDATE USER PROFILE INFOS
      case UPDATE_USER_PROFILE_INFOS_PENDING:
        return userProfileDataUpdateLoading(state);
      case UPDATE_USER_PROFILE_INFOS_SUCCESS:
        return userProfileDataUpdateSuccess(state, action.data);
      case UPDATE_USER_PROFILE_INFOS_ERROR:
        return userProfileDataUpdateFailed(state, action.data);

      //CHANGE USER PASSWORD
      case UPDATE_USER_PASSWORD_PENDING:
        return changeUserPasswordLoading(state);
      case UPDATE_USER_PASSWORD_SUCCESS:
        return changeUserPasswordSuccess(state, action.data);
      case UPDATE_USER_PASSWORD_ERROR:
        return changeUserPasswordFailed(state, action.data);

      default:
        return state;
    }
  };

export default reducer;
