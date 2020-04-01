import initialState from "./state";

import {
  FETCH_USER_PROFILE_INFOS_PENDING,
  FETCH_USER_PROFILE_INFOS_SUCCESS,
  FETCH_USER_PROFILE_INFOS_ERROR
} from "./constants";

import cloneDeep from "lodash.clonedeep";


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
  newState.profileData.phoneNumber = payload.phoneNumber !== undefined ? payload.phoneNumber : "";
  return newState;
};

const userProfileDataFailed = state => {
  const newState = cloneDeep(state);
  newState.profileData.status = FETCH_USER_PROFILE_INFOS_ERROR;

  return newState;
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_USER_PROFILE_INFOS_PENDING:
        return userProfileDataLoading(state);
      case FETCH_USER_PROFILE_INFOS_SUCCESS:
        return userProfileDataSuccess(state, action.data);
      case FETCH_USER_PROFILE_INFOS_ERROR:
        return userProfileDataFailed(state);
      default:
        return state;
    }
  };

export default reducer;
