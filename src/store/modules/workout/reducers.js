import cloneDeep from 'lodash.clonedeep'

import {
  GET_WORKOUTS_FAILED,
  GET_WORKOUTS_LOADING,
  GET_WORKOUTS_SUCCESS,
  CLEAN_GET_WORKOUTS,
  FETCH_WORKOUT_FAILED,
  FETCH_WORKOUT_LOADING,
  FETCH_WORKOUT_SUCCESS,
  CLEAN_FETCH_WORKOUT,
  CREATE_WORKOUT_LOADING,
  CREATE_WORKOUT_FAILED,
  CREATE_WORKOUT_SUCCESS,
  CLEAN_CREATE_WORKOUT,
  UPDATE_WORKOUT_LOADING,
  UPDATE_WORKOUT_FAILED,
  UPDATE_WORKOUT_SUCCESS,
  CLEAN_UPDATE_WORKOUT,
  DELETE_WORKOUT_LOADING,
  DELETE_WORKOUT_FAILED,
  DELETE_WORKOUT_SUCCESS,
  CLEAN_DELETE_WORKOUT,
} from './constants'
import initialState from './state'
import {
  ACTION_TYPE,
  INITIAL_ACTION_STATE_NEW,
} from '../../../helper/constants'

const getAllFailed = (state, action) => {
  const newState = cloneDeep(state)
  newState.actions.getAll = { status: ACTION_TYPE.FAILED, error: action.error }

  return newState
}
const getAllSuccess = (state, action) => {
  const newState = cloneDeep(state)
  const workouts = action.payload

  newState.list = [...workouts]
  newState.actions.getAll = { status: ACTION_TYPE.SUCCESS, error: null }

  return newState
}
const getAllLoading = (state) => {
  const newState = cloneDeep(state)
  newState.actions.getAll = { status: ACTION_TYPE.LOADING, error: null }

  return newState
}
const getAllClean = (state) => {
  const newState = cloneDeep(state)
  newState.actions.getAll = { ...INITIAL_ACTION_STATE_NEW }

  return newState
}

const fetchFailed = (state, action) => {
  const newState = cloneDeep(state)
  newState.actions.fetch = { status: ACTION_TYPE.FAILED, error: action.error }

  return newState
}
const fetchSuccess = (state, action) => {
  const newState = cloneDeep(state)
  const fetchedWorkout = action.payload
  const workoutIndex = newState.list.findIndex(
    (workout) => workout._id === fetchedWorkout._id,
  )

  if (workoutIndex === -1) {
    newState.list.push(fetchedWorkout)
  } else {
    newState.list[workoutIndex] = fetchedWorkout
  }
  newState.actions.fetch = { status: ACTION_TYPE.SUCCESS, error: null }

  return newState
}
const fetchLoading = (state) => {
  const newState = cloneDeep(state)
  newState.actions.fetch = { status: ACTION_TYPE.LOADING, error: null }

  return newState
}
const fetchClean = (state) => {
  const newState = cloneDeep(state)
  newState.actions.fetch = { ...INITIAL_ACTION_STATE_NEW }

  return newState
}

const createFailed = (state, action) => {
  const newState = cloneDeep(state)
  newState.actions.create = { status: ACTION_TYPE.FAILED, error: action.error }

  return newState
}
const createSuccess = (state, action) => {
  const newState = cloneDeep(state)
  const newWorkout = action.payload

  newState.list = [...newState.list, newWorkout]
  newState.actions.create = { status: ACTION_TYPE.SUCCESS, error: null }

  return newState
}
const createLoading = (state) => {
  const newState = cloneDeep(state)
  newState.actions.create = { status: ACTION_TYPE.LOADING, error: null }

  return newState
}
const createClean = (state) => {
  const newState = cloneDeep(state)
  newState.actions.create = { ...INITIAL_ACTION_STATE_NEW }

  return newState
}

const updateFailed = (state, action) => {
  const newState = cloneDeep(state)
  newState.actions.update = { status: ACTION_TYPE.FAILED, error: action.error }

  return newState
}
const updateSuccess = (state, action) => {
  const newState = cloneDeep(state)
  const newWorkout = action.payload
  const updateWorkoutIndex = newState.list.findIndex(
    (workout) => workout._id === newWorkout._id,
  )

  newState.list[updateWorkoutIndex] = newWorkout
  newState.actions.update = { status: ACTION_TYPE.SUCCESS, error: null }

  return newState
}
const updateLoading = (state) => {
  const newState = cloneDeep(state)
  newState.actions.update = { status: ACTION_TYPE.LOADING, error: null }

  return newState
}
const updateClean = (state) => {
  const newState = cloneDeep(state)
  newState.actions.update = { ...INITIAL_ACTION_STATE_NEW }

  return newState
}

const deleteFailed = (state, action) => {
  const newState = cloneDeep(state)
  newState.actions.delete = { status: ACTION_TYPE.FAILED, error: action.error }

  return newState
}
const deleteSuccess = (state, action) => {
  const newState = cloneDeep(state)
  const deletedWorkoutId = action.payload
  const workoutIndex = newState.list.findIndex(
    (workout) => workout._id === deletedWorkoutId,
  )
  if (workoutIndex > -1) {
    newState.list.splice(workoutIndex, 1)
  }
  newState.actions.delete = { status: ACTION_TYPE.SUCCESS, error: null }

  return newState
}
const deleteLoading = (state) => {
  const newState = cloneDeep(state)
  newState.actions.delete = { status: ACTION_TYPE.LOADING, error: null }

  return newState
}
const deleteClean = (state) => {
  const newState = cloneDeep(state)
  newState.actions.delete = { ...INITIAL_ACTION_STATE_NEW }

  return newState
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WORKOUTS_FAILED:
      return getAllFailed(state, action)
    case GET_WORKOUTS_LOADING:
      return getAllLoading(state)
    case GET_WORKOUTS_SUCCESS:
      return getAllSuccess(state, action)
    case CLEAN_GET_WORKOUTS:
      return getAllClean(state)

    case FETCH_WORKOUT_FAILED:
      return fetchFailed(state, action)
    case FETCH_WORKOUT_LOADING:
      return fetchLoading(state)
    case FETCH_WORKOUT_SUCCESS:
      return fetchSuccess(state, action)
    case CLEAN_FETCH_WORKOUT:
      return fetchClean(state)

    case CREATE_WORKOUT_FAILED:
      return createFailed(state, action)
    case CREATE_WORKOUT_LOADING:
      return createLoading(state)
    case CREATE_WORKOUT_SUCCESS:
      return createSuccess(state, action)
    case CLEAN_CREATE_WORKOUT:
      return createClean(state)

    case UPDATE_WORKOUT_FAILED:
      return updateFailed(state, action)
    case UPDATE_WORKOUT_LOADING:
      return updateLoading(state)
    case UPDATE_WORKOUT_SUCCESS:
      return updateSuccess(state, action)
    case CLEAN_UPDATE_WORKOUT:
      return updateClean(state)

    case DELETE_WORKOUT_FAILED:
      return deleteFailed(state, action)
    case DELETE_WORKOUT_LOADING:
      return deleteLoading(state)
    case DELETE_WORKOUT_SUCCESS:
      return deleteSuccess(state, action)
    case CLEAN_DELETE_WORKOUT:
      return deleteClean(state)

    default:
      return state
  }
}

export default reducer
