import {fetchUserProfileInfosPending, fetchUserProfileInfosSuccess, fetchUserProfileInfosFailed} from './actions';

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
                dispatch(fetchUserProfileInfosFailed());
            });
    }
}