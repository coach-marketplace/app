import cloneDeep from "lodash.clonedeep";

import initialState from "./state";
import {
  FETCH_AUTH_USER_FAILED,
  FETCH_AUTH_USER_LOADING,
  FETCH_AUTH_USER_SUCCESS,
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

  return newState;
};

// FETCH USER INFOS

// const userProfileDataLoading = state => {
//   const newState = cloneDeep(state);
//   newState.profileData.status = FETCH_USER_PROFILE_INFOS_PENDING;
//   return newState;
// };

// const userProfileDataSuccess = (state, payload) => {
//   const newState = cloneDeep(state);
//   newState.profileData.status = FETCH_USER_PROFILE_INFOS_SUCCESS;
//   newState.profileData.firstName = payload.firstName !== undefined ? payload.firstName : "";
//   newState.profileData.lastName = payload.lastName !== undefined ? payload.lastName : "";
//   newState.profileData.email = payload.email !== undefined ? payload.email : "";
//   newState.profileData.phone = payload.phone !== undefined ? payload.phone : "";
//   return newState;
// };

// const userProfileDataFailed = state => {
//   const newState = cloneDeep(state);
//   newState.profileData.status = FETCH_USER_PROFILE_INFOS_ERROR;

//   return newState;
// };

//UPDATE USER INFOS

// const userProfileDataUpdateLoading = state => {
//   const newState = cloneDeep(state);
//   newState.profileData.status = UPDATE_USER_PROFILE_INFOS_PENDING;

//   return newState;
// };

// const userProfileDataUpdateSuccess = (state, payload) => {
//   const newState = cloneDeep(state);
//   newState.profileData.status = UPDATE_USER_PROFILE_INFOS_SUCCESS;
//   newState.profileData.firstName = payload.firstName !== undefined ? payload.firstName : "";
//   newState.profileData.lastName = payload.lastName !== undefined ? payload.lastName : "";
//   newState.profileData.email = payload.email !== undefined ? payload.email : "";
//   newState.profileData.phoneNumber = payload.phone !== undefined ? payload.phone : "";

//   return newState;
// };

// const userProfileDataUpdateFailed = state => {
//   const newState = cloneDeep(state);
//   newState.profileData.status = UPDATE_USER_PROFILE_INFOS_ERROR;

//   return newState;
// };

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

    // //UPDATE USER PROFILE INFOS
    // case UPDATE_USER_PROFILE_INFOS_PENDING:
    //   return userProfileDataUpdateLoading(state);
    // case UPDATE_USER_PROFILE_INFOS_SUCCESS:
    //   return userProfileDataUpdateSuccess(state, action.data);
    // case UPDATE_USER_PROFILE_INFOS_ERROR:
    //   return userProfileDataUpdateFailed(state);

    default:
      return state;
  }
};

export default reducer;
