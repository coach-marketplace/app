import {
    fetchUserProfileInfosPending, 
    fetchUserProfileInfosSuccess, 
    fetchUserProfileInfosFailed,

    updateUserProfileInfosPending,
    updateUserProfileInfosSuccess,
    updateUserProfileInfosFailed,

    changeUserPasswordPending,
    changeUserPasswordSuccess,
    changeUserPasswordFailed } from './actions';

import API from "../../../services/api";
import store from "../..";

export const fetchUserProfileInfos = () => {
    return dispatch => { 
        dispatch(fetchUserProfileInfosPending());
        API.get("user/"+store.getState().auth.authUser._id)
            .then( response => {
                dispatch(fetchUserProfileInfosSuccess(response.data))
            })
            .catch(error => {
                dispatch(fetchUserProfileInfosFailed({message:"We could not retrieve your data. PLease try again later."}));
            });
    }
}

export const updateUserProfileInfos = (updatedProfileData) => {
    return dispatch => {
        dispatch(updateUserProfileInfosPending());
        API.post("user/"+store.getState().auth.authUser._id, updatedProfileData)
            .then( response => {
                updatedProfileData.message = "We updated your profile succesfully!"
                dispatch(updateUserProfileInfosSuccess(updatedProfileData));
            })
            .catch(error => {
                dispatch(updateUserProfileInfosFailed({message: "We could not update your profile. Please try again later."}));
            });
    }
}

export const changeUserPassword = (passwords) => {
    return dispatch => {
        dispatch(changeUserPasswordPending());
        if(passwords.newPwd !== passwords.newPwdConf || passwords.newPwd === ""){
            dispatch(changeUserPasswordFailed({message:"passwords don't match or are empty"}))
        }
        else {
            API.post("user/password/"+store.getState().auth.authUser._id, 
            {currentPassword:passwords.oldPwd, newPassword:passwords.newPwd})
            .then( response => {
                dispatch(changeUserPasswordSuccess({message:"your password has been successfully changed"}));        
            })
            .catch( error => {
                //TODO: how to get error public message?
                dispatch(changeUserPasswordFailed({message:"We could not update your password. Please try again later."}));
            })
        }
    }
}