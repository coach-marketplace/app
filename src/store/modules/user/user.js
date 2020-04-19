import {
  fetchUserProfileInfosPending,
  fetchUserProfileInfosSuccess,
  fetchUserProfileInfosFailed,
  updateUserProfileInfosPending,
  updateUserProfileInfosSuccess,
  updateUserProfileInfosFailed,
} from "./actions";

import API from "../../../services/api";
import store from "../..";

export const fetchUserProfileInfos = () => {
  return (dispatch) => {
    dispatch(fetchUserProfileInfosPending());
    API.get("user/" + store.getState().user.current._id)
      .then((response) => {
        dispatch(fetchUserProfileInfosSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchUserProfileInfosFailed());
      });
  };
};

export const updateUserProfileInfos = (updatedProfileData) => {
  return (dispatch) => {
    dispatch(updateUserProfileInfosPending());
    API.post("user/" + store.getState().user.current._id, updatedProfileData)
      .then((response) => {
        dispatch(updateUserProfileInfosSuccess(updatedProfileData));
      })
      .catch((error) => {
        dispatch(updateUserProfileInfosFailed());
      });
  };
};
