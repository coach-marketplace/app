import API from "../../../services/api";

import {
  GET_CONVERSATIONS_FAILED,
  GET_CONVERSATIONS_LOADING,
  GET_CONVERSATIONS_SUCCESS,
  // CREATE_CONVERSATION_LOADING,
  // CREATE_CONVERSATION_FAILED,
  // CREATE_CONVERSATION_SUCCESS,
} from "./constants";
import store from "../../index";

const getAllLoading = () => ({ type: GET_CONVERSATIONS_LOADING });
const getAllSuccess = (payload) => ({
  type: GET_CONVERSATIONS_SUCCESS,
  payload,
});
const getAllFailed = (error) => ({ type: GET_CONVERSATIONS_FAILED, error });

// const createLoading = () => ({ type: CREATE_CONVERSATION_LOADING });
// const createSuccess = (payload) => ({ type: CREATE_CONVERSATION_SUCCESS, payload });
// const createFailed = (error) => ({ type: CREATE_CONVERSATION_FAILED, error });

export const retrieveAll = () => {
  return (dispatch) => {
    dispatch(getAllLoading());
    const {
      user: { current: user },
    } = store.getState();

    API.get(`user/${user._id}/conversations`)
      .then((response) => {
        dispatch(getAllSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getAllFailed(error.message));
      });
  };
};

// export const create = (data) => {
//   return (dispatch) => {
//     dispatch(createLoading());
//     const {
//       auth: { authUser },
//     } = store.getState();

//     const normalizedData = {
//       name: data.name,
//       instructions: data.instructions,
//       lang: data.lang || authUser.lang,
//       isPrivate: data.isPrivate,
//       userOwnerId: authUser._id,
//       videoUrl: data.videoUrl,
//     };

// API.post(`coach/${authUser._id}/exercises/add`, normalizedData)
//   .then((response) => {
//     console.log("response", response);
//     dispatch(createSuccess(response.data));
//   })
//   .catch((error) => {
//     dispatch(createFailed(error.message));
//   });
// };
// };
