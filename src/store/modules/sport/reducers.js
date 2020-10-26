import cloneDeep from 'lodash.clonedeep'

import {
  GET_SPORTS_FAILURE,
  GET_SPORTS_LOADING,
  GET_SPORTS_SUCCESS,
} from './constants'
import initialState from './state'
import { ACTION_TYPE } from '../../../helper/constants'

const getAllFailed = (state, action) => {
  const newState = cloneDeep(state)
  newState.actions.getAll = { status: ACTION_TYPE.FAILURE, error: action.error }

  return newState
}
const getAllSuccess = (state, action) => {
  const newState = cloneDeep(state)
  const sports = action.payload

  newState.list = [...sports]
  newState.actions.getAll = { status: ACTION_TYPE.SUCCESS, error: null }

  return newState
}
const getAllLoading = (state) => {
  const newState = cloneDeep(state)
  newState.actions.getAll = { status: ACTION_TYPE.LOADING, error: null }

  return newState
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SPORTS_FAILURE:
      return getAllFailed(state, action)
    case GET_SPORTS_LOADING:
      return getAllLoading(state)
    case GET_SPORTS_SUCCESS:
      return getAllSuccess(state, action)

    default:
      return state
  }
}

export default reducer
