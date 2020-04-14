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

/***
 * Fetch profile infos
 */
export const fetchUserProfileInfosPending = () => {
   return {type: FETCH_USER_PROFILE_INFOS_PENDING}
}
  
export const fetchUserProfileInfosSuccess = (payload) => {
   return {
       type: FETCH_USER_PROFILE_INFOS_SUCCESS,
       data: payload 
    }
} 

export const fetchUserProfileInfosFailed = (payload) => {
   return {
      type: FETCH_USER_PROFILE_INFOS_ERROR,
      data: payload 
   }
} 

/**
 * Update profile infos
 */

export const updateUserProfileInfosPending = () => {
   return { type: UPDATE_USER_PROFILE_INFOS_PENDING }
}

export const updateUserProfileInfosSuccess = (payload) => {
   return {
      type: UPDATE_USER_PROFILE_INFOS_SUCCESS,
      data: payload
   }
}

export const updateUserProfileInfosFailed = (payload) => {
   return { 
      type: UPDATE_USER_PROFILE_INFOS_ERROR,
      data: payload,
   }
}

/**
 * change user password
 */

export const changeUserPasswordPending = () => {
   return { type: UPDATE_USER_PASSWORD_PENDING }
}

export const changeUserPasswordSuccess = (payload) => {
   return { 
      type: UPDATE_USER_PASSWORD_SUCCESS,
      data: payload
   }
}

export const changeUserPasswordFailed = (payload) => {
   return { 
            type: UPDATE_USER_PASSWORD_ERROR,
            data: payload
         }
}

/***
 * Fetch BODY infos
 */
export const fetchUserBodyInfosPending = () => {
   return {type: FETCH_USER_BODY_INFOS_PENDING}
}
  
export const fetchUserBodyInfosSuccess = (payload) => {
   return {
       type: FETCH_USER_BODY_INFOS_SUCCESS,
       data: payload 
    }
} 

export const fetchUserBodyInfosFailed = (payload) => {
   return {
      type: FETCH_USER_BODY_INFOS_ERROR,
      data: payload 
   }
} 

/**
 * Update Body infos
 */

export const updateUserBodyInfosPending = () => {
   return { type: UPDATE_USER_BODY_INFOS_PENDING }
}

export const updateUserBodyInfosSuccess = (payload) => {
   return {
      type: UPDATE_USER_BODY_INFOS_SUCCESS,
      data: payload
   }
}

export const updateUserBodyInfosFailed = (payload) => {
   return { 
      type: UPDATE_USER_BODY_INFOS_ERROR,
      data: payload,
   }
}