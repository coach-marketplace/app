import API from '../../../services/api'

import {
  GET_CONVERSATION_MESSAGES_FAILED,
  GET_CONVERSATION_MESSAGES_LOADING,
  GET_CONVERSATION_MESSAGES_SUCCESS,
  POST_MESSAGE_FAILED,
  POST_MESSAGE_LOADING,
  POST_MESSAGE_SUCCESS,
} from './constants'
import store from '../../index'

const getAllMessagesLoading = () => ({
  type: GET_CONVERSATION_MESSAGES_LOADING,
})
const getAllMessagesSuccess = (payload) => ({
  type: GET_CONVERSATION_MESSAGES_SUCCESS,
  payload,
})
const getAllMessagesFailed = (error) => ({
  type: GET_CONVERSATION_MESSAGES_FAILED,
  error,
})

const postMessageLoading = () => ({
  type: POST_MESSAGE_LOADING,
})
const postMessageSuccess = (payload) => ({
  type: POST_MESSAGE_SUCCESS,
  payload,
})
const postMessageFailed = (error) => ({
  type: POST_MESSAGE_FAILED,
  error,
})

export const retrieveAllConversationMessages = (conversationId) => {
  return (dispatch) => {
    dispatch(getAllMessagesLoading())
    const {
      user: { current: user },
    } = store.getState()

    API.get(`user/${user._id}/conversations/${conversationId}/messages`)
      .then((response) => {
        dispatch(
          getAllMessagesSuccess({ conversationId, messages: response.data }),
        )
      })
      .catch((error) => {
        dispatch(getAllMessagesFailed(error.message))
      })
  }
}

export const postMessage = (conversationId, data, callback) => {
  return (dispatch) => {
    dispatch(postMessageLoading())
    const {
      user: { current: user },
    } = store.getState()

    API.post(`user/${user._id}/conversations/${conversationId}/messages`, data)
      .then((response) => {
        dispatch(postMessageSuccess({ conversationId, message: response.data }))
        callback && callback()
      })
      .catch((error) => {
        dispatch(postMessageFailed(error.message))
      })
  }
}
