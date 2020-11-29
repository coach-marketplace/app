import cloneDeep from 'lodash.clonedeep'

import initialState from './state'
import {
  CREATE_COACH_PROFILE_FAILED,
  CREATE_COACH_PROFILE_LOADING,
  CREATE_COACH_PROFILE_SUCCESS,
  FETCH_COACH_PROFILE_FAILED,
  FETCH_COACH_PROFILE_LOADING,
  FETCH_COACH_PROFILE_SUCCESS,
  UPDATE_COACH_PROFILE_LOADING,
  UPDATE_COACH_PROFILE_SUCCESS,
  UPDATE_COACH_PROFILE_FAILED,
} from './constants'
import { ACTION_TYPE } from '../../../helper/constants'

/**
 * create coach profile
 */
const createCoachProfileFailed = (state, action) => {
  const newState = cloneDeep(state)
  newState.actions.createCoachProfile = {
    status: ACTION_TYPE.FAILED,
    error: action.error,
  }

  return newState
}
const createCoachProfileLoading = (state) => {
  const newState = cloneDeep(state)
  newState.actions.createCoachProfile = {
    status: ACTION_TYPE.LOADING,
    error: null,
  }

  return newState
}
const createCoachProfileSuccess = (state, action) => {
  const newState = cloneDeep(state)
  newState.coachProfile = action.payload
  newState.actions.createCoachProfile = {
    status: ACTION_TYPE.SUCCESS,
    error: null,
  }

  return newState
}

/**
 * Fetch coach profile
 */
const fetchCoachProfileFailed = (state, action) => {
  const newState = cloneDeep(state)
  newState.actions.fetchCoachProfile = {
    status: ACTION_TYPE.FAILED,
    error: action.error,
  }

  return newState
}
const fetchCoachProfileLoading = (state) => {
  const newState = cloneDeep(state)
  newState.actions.fetchCoachProfile = {
    status: ACTION_TYPE.LOADING,
    error: null,
  }

  return newState
}
const fetchCoachProfileSuccess = (state, action) => {
  const newState = cloneDeep(state)
  newState.coachProfile = action.payload
  newState.actions.fetchCoachProfile = {
    status: ACTION_TYPE.SUCCESS,
    error: null,
  }

  return newState
}

/**
 * Update user
 */
const updateCoachProfileLoading = (state) => {
  const newState = cloneDeep(state)
  newState.actions.updateCoachProfile = {
    status: ACTION_TYPE.LOADING,
    error: null,
  }

  return newState
}
const updateCoachProfileSuccess = (state, action) => {
  const newState = cloneDeep(state)
  const { description, company, sports } = action.payload
  newState.coachProfile.description = description
  newState.coachProfile.company = company
  newState.coachProfile.sports = sports

  newState.actions.updateCoachProfile = {
    status: ACTION_TYPE.SUCCESS,
    error: null,
  }

  return newState
}
const updateCoachProfileFailed = (state, action) => {
  const newState = cloneDeep(state)
  newState.actions.updateCoachProfile = {
    status: ACTION_TYPE.FAILED,
    error: action.error,
  }

  return newState
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_COACH_PROFILE_FAILED:
      return createCoachProfileFailed(state, action)
    case CREATE_COACH_PROFILE_LOADING:
      return createCoachProfileLoading(state)
    case CREATE_COACH_PROFILE_SUCCESS:
      return createCoachProfileSuccess(state, action)

    case FETCH_COACH_PROFILE_FAILED:
      return fetchCoachProfileFailed(state, action)
    case FETCH_COACH_PROFILE_LOADING:
      return fetchCoachProfileLoading(state)
    case FETCH_COACH_PROFILE_SUCCESS:
      return fetchCoachProfileSuccess(state, action)

    case UPDATE_COACH_PROFILE_LOADING:
      return updateCoachProfileLoading(state)
    case UPDATE_COACH_PROFILE_SUCCESS:
      return updateCoachProfileSuccess(state, action)
    case UPDATE_COACH_PROFILE_FAILED:
      return updateCoachProfileFailed(state, action)

    default:
      return state
  }
}

export default reducer
