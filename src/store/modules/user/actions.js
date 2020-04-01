import {
    FETCH_USER_PROFILE_INFOS_PENDING,
    FETCH_USER_PROFILE_INFOS_SUCCESS,
    FETCH_USER_PROFILE_INFOS_ERROR
} from "./constants";

export const fetchUserProfileInfosPending = () => {
   return {type: FETCH_USER_PROFILE_INFOS_PENDING}
}
  
export const fetchUserProfileInfosSuccess = (payload) => {
   return {
       type: FETCH_USER_PROFILE_INFOS_SUCCESS,
       data: payload 
    }
} 

export const fetchUserProfileInfosFailed = () => {
   return {type: FETCH_USER_PROFILE_INFOS_ERROR}
} 
