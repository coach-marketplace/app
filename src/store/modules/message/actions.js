import API from "../../../services/api";

import {
  GET_CONVERSATION_MESSAGES_FAILED,
  GET_CONVERSATION_MESSAGES_LOADING,
  GET_CONVERSATION_MESSAGES_SUCCESS,
} from "./constants";
import store from "../../index";

const getAllMessagesLoading = () => ({
  type: GET_CONVERSATION_MESSAGES_LOADING,
});
const getAllMessagesSuccess = (payload) => ({
  type: GET_CONVERSATION_MESSAGES_SUCCESS,
  payload,
});
const getAllMessagesFailed = (error) => ({
  type: GET_CONVERSATION_MESSAGES_FAILED,
  error,
});

export const retrieveAllConversationMessages = (conversationId) => {
  return (dispatch) => {
    dispatch(getAllMessagesLoading());
    const {
      user: { current: user },
    } = store.getState();

    API.get(`user/${user._id}/conversations//${conversationId}/messages`)
      .then((response) => {
        dispatch(getAllMessagesSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getAllMessagesFailed(error.message));
      });
  };
};
