import cloneDeep from 'lodash.clonedeep'

import {
  GET_CONVERSATION_MESSAGES_FAILED,
  GET_CONVERSATION_MESSAGES_LOADING,
  GET_CONVERSATION_MESSAGES_SUCCESS,
  POST_MESSAGE_FAILED,
  POST_MESSAGE_LOADING,
  POST_MESSAGE_SUCCESS,
} from './constants'
import initialState from './state'

const getAllFromConversationFailed = (state, action) => {
  const newState = cloneDeep(state)

  newState.actions.getAllFromConversation.loading = false
  newState.actions.getAllFromConversation.success = false
  newState.actions.getAllFromConversation.error = action.error

  return newState
}

const getAllFromConversationSuccess = (state, action) => {
  const newState = cloneDeep(state)
  const { conversationId, messages } = action.payload

  newState.listByConversationId[conversationId] = [...messages]
  newState.actions.getAllFromConversation.loading = false
  newState.actions.getAllFromConversation.error = null
  newState.actions.getAllFromConversation.success = true

  return newState
}

const getAllFromConversationLoading = (state) => {
  const newState = cloneDeep(state)

  newState.actions.getAllFromConversation.loading = true
  newState.actions.getAllFromConversation.success = false
  newState.actions.getAllFromConversation.error = null

  return newState
}

const postMessageFailed = (state, action) => {
  const newState = cloneDeep(state)

  newState.actions.postMessage.loading = false
  newState.actions.postMessage.success = false
  newState.actions.postMessage.error = action.error

  return newState
}

const postMessageSuccess = (state, action) => {
  const newState = cloneDeep(state)
  const { conversationId, message } = action.payload

  newState.listByConversationId[conversationId] = [
    ...newState.listByConversationId[conversationId],
    message,
  ]
  newState.actions.postMessage.loading = false
  newState.actions.postMessage.error = null
  newState.actions.postMessage.success = true

  return newState
}

const postMessageLoading = (state) => {
  const newState = cloneDeep(state)

  newState.actions.postMessage.loading = true
  newState.actions.postMessage.success = false
  newState.actions.postMessage.error = null

  return newState
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CONVERSATION_MESSAGES_FAILED:
      return getAllFromConversationFailed(state, action)
    case GET_CONVERSATION_MESSAGES_LOADING:
      return getAllFromConversationLoading(state)
    case GET_CONVERSATION_MESSAGES_SUCCESS:
      return getAllFromConversationSuccess(state, action)

    case POST_MESSAGE_FAILED:
      return postMessageFailed(state, action)
    case POST_MESSAGE_LOADING:
      return postMessageLoading(state)
    case POST_MESSAGE_SUCCESS:
      return postMessageSuccess(state, action)

    default:
      return state
  }
}

export default reducer
