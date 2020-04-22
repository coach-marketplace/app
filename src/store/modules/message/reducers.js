import cloneDeep from "lodash.clonedeep";

import {
  GET_CONVERSATION_MESSAGES_FAILED,
  GET_CONVERSATION_MESSAGES_LOADING,
  GET_CONVERSATION_MESSAGES_SUCCESS,
} from "./constants";
import initialState from "./state";

const getAllFromConversationFailed = (state, action) => {
  const newState = cloneDeep(state);

  newState.actions.getAllFromConversation.loading = false;
  newState.actions.getAllFromConversation.success = false;
  newState.actions.getAllFromConversation.error = action.error;

  return newState;
};

const getAllFromConversationSuccess = (state, action) => {
  const newState = cloneDeep(state);
  const messages = action.payload;
  console.log("axction", action);

  newState.listByConversationId["id"] = [...messages];
  newState.actions.getAllFromConversation.loading = false;
  newState.actions.getAllFromConversation.error = null;
  newState.actions.getAllFromConversation.success = true;

  return newState;
};

const getAllFromConversationLoading = (state) => {
  const newState = cloneDeep(state);

  newState.actions.getAllFromConversation.loading = true;
  newState.actions.getAllFromConversation.success = false;
  newState.actions.getAllFromConversation.error = null;

  return newState;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CONVERSATION_MESSAGES_FAILED:
      return getAllFromConversationFailed(state, action);
    case GET_CONVERSATION_MESSAGES_LOADING:
      return getAllFromConversationLoading(state);
    case GET_CONVERSATION_MESSAGES_SUCCESS:
      return getAllFromConversationSuccess(state, action);

    default:
      return state;
  }
};

export default reducer;
