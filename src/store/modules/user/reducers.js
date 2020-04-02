import initialState from "./state";

import {
  FETCH_USER_PROFILE_INFOS_PENDING,
  FETCH_USER_PROFILE_INFOS_SUCCESS,
  FETCH_USER_PROFILE_INFOS_ERROR,

  UPDATE_USER_PROFILE_INFOS_PENDING,
  UPDATE_USER_PROFILE_INFOS_SUCCESS,
  UPDATE_USER_PROFILE_INFOS_ERROR
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

const userProfileDataFailed = state => {
  const newState = cloneDeep(state);
  newState.profileData.status = FETCH_USER_PROFILE_INFOS_ERROR;

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
  newState.profileData.firstName = payload.firstName !== undefined ? payload.firstName : "";
  newState.profileData.lastName = payload.lastName !== undefined ? payload.lastName : "";
  newState.profileData.email = payload.email !== undefined ? payload.email : "";
  newState.profileData.phoneNumber = payload.phone !== undefined ? payload.phone : "";

  return newState;
};

const userProfileDataUpdateFailed = state => {
  const newState = cloneDeep(state);
  newState.profileData.status = UPDATE_USER_PROFILE_INFOS_ERROR;

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
        return userProfileDataFailed(state);
      
      //UPDATE USER PROFILE INFOS
      case UPDATE_USER_PROFILE_INFOS_PENDING:
        return userProfileDataUpdateLoading(state);
      case UPDATE_USER_PROFILE_INFOS_SUCCESS:
        return userProfileDataUpdateSuccess(state, action.data);
      case UPDATE_USER_PROFILE_INFOS_ERROR:
        return userProfileDataUpdateFailed(state);

      default:
        return state;
    }
  };

export default reducer;
