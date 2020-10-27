import cloneDeep from 'lodash.clonedeep'

import initialState from './state'
import {
  FETCH_AUTH_USER_FAILED,
  FETCH_AUTH_USER_LOADING,
  FETCH_AUTH_USER_SUCCESS,
  UPDATE_USER_LOADING,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  CLEAN_UPDATE_USER,
  FETCH_USER_PHYSICAL_METRICS_LOADING,
  FETCH_USER_PHYSICAL_METRICS_SUCCESS,
  FETCH_USER_PHYSICAL_METRICS_FAILED,
  CLEAN_FETCH_USER_PHYSICAL_METRICS,
  ADD_USER_PHYSICAL_METRICS_LOADING,
  ADD_USER_PHYSICAL_METRICS_SUCCESS,
  ADD_USER_PHYSICAL_METRICS_FAILED,
  CLEAN_ADD_USER_PHYSICAL_METRICS,
  UPDATE_PASSWORD_LOADING,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILED,
  CLEAN_UPDATE_PASSWORD,
} from './constants'
import {
  ACTION_TYPE,
  INITIAL_ACTION_STATE_NEW,
} from '../../../helper/constants'

/**
 * Fetch auth user
 */
const fetchAuthUserFailed = (state, action) => {
  const newState = cloneDeep(state)
  newState.actions.fetchAuthUser = {
    status: ACTION_TYPE.FAILED,
    error: action.error,
  }

  return newState
}
const fetchAuthUserLoading = (state) => {
  const newState = cloneDeep(state)
  newState.actions.fetchAuthUser = { status: ACTION_TYPE.LOADING, error: null }

  return newState
}
const fetchAuthUserSuccess = (state, action) => {
  const newState = cloneDeep(state)
  newState.current = action.payload
  newState.actions.fetchAuthUser = { status: ACTION_TYPE.SUCCESS, error: null }

  return newState
}

/**
 * Update user
 */
const updateLoading = (state) => {
  const newState = cloneDeep(state)
  newState.actions.update = { status: ACTION_TYPE.LOADING, error: null }
  return newState
}
const updateSuccess = (state, action) => {
  const newState = cloneDeep(state)
  const {
    firstName,
    lastName,
    phone,
    gender,
    dateOfBirth,
    isCoach,
  } = action.payload
  newState.current.firstName = firstName
  newState.current.lastName = lastName
  newState.current.phone = phone
  newState.current.gender = gender
  newState.current.dateOfBirth = dateOfBirth
  newState.current.isCoach = isCoach
  newState.actions.update = { status: ACTION_TYPE.SUCCESS, error: null }

  return newState
}
const updateFailed = (state, action) => {
  const newState = cloneDeep(state)
  newState.actions.update = { status: ACTION_TYPE.FAILED, error: action.error }

  return newState
}
const updateClean = (state) => {
  const newState = cloneDeep(state)
  newState.actions.update = { ...INITIAL_ACTION_STATE_NEW }

  return newState
}

/**
 * Fetch user physical metrics
 */
const fetchUserPhysicalMetricsLoading = (state) => {
  const newState = cloneDeep(state)
  newState.actions.fetchPhysicalMetrics = {
    status: ACTION_TYPE.LOADING,
    error: null,
  }

  return newState
}
const fetchUserPhysicalMetricsSuccess = (state, action) => {
  const newState = cloneDeep(state)
  newState.physicalMetrics = [...action.payload]
  newState.actions.fetchPhysicalMetrics = {
    status: ACTION_TYPE.SUCCESS,
    error: null,
  }

  return newState
}
const fetchUserPhysicalMetricsFailed = (state, action) => {
  const newState = cloneDeep(state)
  newState.actions.fetchPhysicalMetrics = {
    status: ACTION_TYPE.FAILED,
    error: action.error,
  }

  return newState
}
const fetchUserPhysicalMetricsClean = (state) => {
  const newState = cloneDeep(state)
  newState.actions.fetchPhysicalMetrics = { ...INITIAL_ACTION_STATE_NEW }

  return newState
}

/**
 * Add user physical metrics
 */
const addUserPhysicalMetricsLoading = (state) => {
  const newState = cloneDeep(state)
  newState.actions.addPhysicalMetrics = {
    status: ACTION_TYPE.LOADING,
    error: null,
  }

  return newState
}
const addUserPhysicalMetricsSuccess = (state, action) => {
  const newState = cloneDeep(state)
  newState.physicalMetrics.push(action.payload)
  newState.actions.addPhysicalMetrics = {
    status: ACTION_TYPE.SUCCESS,
    error: null,
  }

  return newState
}
const addUserPhysicalMetricsFailed = (state, action) => {
  const newState = cloneDeep(state)
  newState.actions.addPhysicalMetrics = {
    status: ACTION_TYPE.FAILED,
    error: action.error,
  }

  return newState
}
const addUserPhysicalMetricsClean = (state) => {
  const newState = cloneDeep(state)
  newState.actions.addPhysicalMetrics = { ...INITIAL_ACTION_STATE_NEW }

  return newState
}

/**
 * Update user password
 */
const updatePasswordLoading = (state) => {
  const newState = cloneDeep(state)
  newState.actions.updatePassword = {
    status: ACTION_TYPE.LOADING,
    error: null,
  }

  return newState
}
const updatePasswordSuccess = (state, action) => {
  const newState = cloneDeep(state)
  // const { firstName, lastName, phone, gender, dateOfBirth } = action.payload;
  newState.actions.updatePassword = {
    status: ACTION_TYPE.SUCCESS,
    error: null,
  }

  return newState
}
const updatePasswordFailed = (state, action) => {
  const newState = cloneDeep(state)
  newState.actions.updatePassword = {
    status: ACTION_TYPE.FAILED,
    error: action.error,
  }

  return newState
}
const updatePasswordClean = (state) => {
  const newState = cloneDeep(state)
  newState.actions.updatePassword = { ...INITIAL_ACTION_STATE_NEW }

  return newState
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_AUTH_USER_FAILED:
      return fetchAuthUserFailed(state, action)
    case FETCH_AUTH_USER_LOADING:
      return fetchAuthUserLoading(state)
    case FETCH_AUTH_USER_SUCCESS:
      return fetchAuthUserSuccess(state, action)

    case UPDATE_USER_LOADING:
      return updateLoading(state)
    case UPDATE_USER_SUCCESS:
      return updateSuccess(state, action)
    case UPDATE_USER_FAILED:
      return updateFailed(state, action)
    case CLEAN_UPDATE_USER:
      return updateClean(state)

    case FETCH_USER_PHYSICAL_METRICS_LOADING:
      return fetchUserPhysicalMetricsLoading(state)
    case FETCH_USER_PHYSICAL_METRICS_SUCCESS:
      return fetchUserPhysicalMetricsSuccess(state, action)
    case FETCH_USER_PHYSICAL_METRICS_FAILED:
      return fetchUserPhysicalMetricsFailed(state, action)
    case CLEAN_FETCH_USER_PHYSICAL_METRICS:
      return fetchUserPhysicalMetricsClean(state)

    case ADD_USER_PHYSICAL_METRICS_LOADING:
      return addUserPhysicalMetricsLoading(state)
    case ADD_USER_PHYSICAL_METRICS_SUCCESS:
      return addUserPhysicalMetricsSuccess(state, action)
    case ADD_USER_PHYSICAL_METRICS_FAILED:
      return addUserPhysicalMetricsFailed(state, action)
    case CLEAN_ADD_USER_PHYSICAL_METRICS:
      return addUserPhysicalMetricsClean(state)

    case UPDATE_PASSWORD_LOADING:
      return updatePasswordLoading(state)
    case UPDATE_PASSWORD_SUCCESS:
      return updatePasswordSuccess(state, action)
    case UPDATE_PASSWORD_FAILED:
      return updatePasswordFailed(state, action)
    case CLEAN_UPDATE_PASSWORD:
      return updatePasswordClean(state)

    default:
      return state
  }
}

export default reducer
