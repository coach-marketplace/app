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

  FETCH_USER_BODY_INFOS_PENDING,
  FETCH_USER_BODY_INFOS_SUCCESS,
  FETCH_USER_BODY_INFOS_ERROR,

  UPDATE_USER_BODY_INFOS_PENDING,
  UPDATE_USER_BODY_INFOS_SUCCESS,
  UPDATE_USER_BODY_INFOS_ERROR,
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

// FETCH USER INFOS 

const userBodyDataLoading = state => {
  const newState = cloneDeep(state);
  newState.bodyData.status = FETCH_USER_BODY_INFOS_PENDING;
  return newState;
};

const userBodyDataSuccess = (state, payload) => {
  const newState = cloneDeep(state);
  newState.bodyData.status = FETCH_USER_BODY_INFOS_SUCCESS;
  newState.bodyData.firstName = payload.firstName !== undefined ? payload.firstName : "";
  newState.bodyData.lastName = payload.lastName !== undefined ? payload.lastName : "";
  newState.bodyData.email = payload.email !== undefined ? payload.email : "";
  newState.bodyData.phone = payload.phone !== undefined ? payload.phone : "";
  return newState;
};

const userBodyDataFailed = (state, payload) => {
  const newState = cloneDeep(state);
  newState.bodyData.status = FETCH_USER_BODY_INFOS_ERROR;
  newState.bodyData.message = payload.message;

  return newState;
};

//UPDATE USER INFOS

const userBodyDataUpdateLoading = state => {
  const newState = cloneDeep(state);
  newState.bodyData.status = UPDATE_USER_BODY_INFOS_PENDING;

  return newState;
};

const userBodyDataUpdateSuccess = (state, payload) => {
  const newState = cloneDeep(state);
  newState.bodyData.status = UPDATE_USER_BODY_INFOS_SUCCESS;
  newState.bodyData.message = payload.message !== undefined ? payload.message : "";
  newState.bodyData.weight = payload.weight !== undefined ? payload.weight : "";
  newState.bodyData.height = payload.height !== undefined ? payload.height : "";
  newState.bodyData.age = payload.age !== undefined ? payload.age : "";
  newState.bodyData.gender = payload.gender !== undefined ? payload.gender : "";

  return newState;
};

const userBodyDataUpdateFailed = (state, payload) => {
  const newState = cloneDeep(state);
  newState.bodyData.status = UPDATE_USER_BODY_INFOS_ERROR;
  newState.bodyData.message = payload.message;

  return newState;
};

// REDUCER

const reducer = (state = initialState, action) => {
    switch (action.type) {
      //FETCH USER BODY INFOS
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

      //FETCH USER BODY INFOS
      case FETCH_USER_BODY_INFOS_PENDING:
        return userBodyDataLoading(state);
      case FETCH_USER_BODY_INFOS_SUCCESS:
        return userBodyDataSuccess(state, action.data);
      case FETCH_USER_BODY_INFOS_ERROR:
        return userBodyDataFailed(state, action.data);
      
      //UPDATE USER BODY INFOS
      case UPDATE_USER_BODY_INFOS_PENDING:
        return userBodyDataUpdateLoading(state);
      case UPDATE_USER_BODY_INFOS_SUCCESS:
        return userBodyDataUpdateSuccess(state, action.data);
      case UPDATE_USER_BODY_INFOS_ERROR:
        return userBodyDataUpdateFailed(state, action.data);

      default:
        return state;
    }
  };

export default reducer;
