import cloneDeep from 'lodash.clonedeep'

import {
  GET_ASSIGNMENTS_FAILED,
  GET_ASSIGNMENTS_LOADING,
  GET_ASSIGNMENTS_SUCCESS,
  CLEAN_GET_ASSIGNMENTS,
  CREATE_ASSIGNMENT_LOADING,
  CREATE_ASSIGNMENT_FAILED,
  CREATE_ASSIGNMENT_SUCCESS,
  CLEAN_CREATE_ASSIGNMENT,
  UPDATE_ASSIGNMENT_LOADING,
  UPDATE_ASSIGNMENT_FAILED,
  UPDATE_ASSIGNMENT_SUCCESS,
  CLEAN_UPDATE_ASSIGNMENT,
  DELETE_ASSIGNMENT_LOADING,
  DELETE_ASSIGNMENT_FAILED,
  DELETE_ASSIGNMENT_SUCCESS,
  CLEAN_DELETE_ASSIGNMENT,
} from './constants'
import initialState from './state'
import {
  ACTION_TYPE,
  INITIAL_ACTION_STATE_NEW,
} from '../../../helper/constants'

const getByProgramFailed = (state, action) => {
  const newState = cloneDeep(state)
  newState.actions.getByProgram = {
    status: ACTION_TYPE.FAILED,
    error: action.error,
  }

  return newState
}
const getByProgramSuccess = (state, action) => {
  const newState = cloneDeep(state)
  const assignments = action.payload

  newState.list[action.programId] = [...assignments]
  newState.actions.getByProgram = { status: ACTION_TYPE.SUCCESS, error: null }

  return newState
}
const getByProgramLoading = (state) => {
  const newState = cloneDeep(state)
  newState.actions.getByProgram = { status: ACTION_TYPE.LOADING, error: null }

  return newState
}
const getByProgramClean = (state) => {
  const newState = cloneDeep(state)
  newState.actions.getByProgram = { ...INITIAL_ACTION_STATE_NEW }

  return newState
}

const createFailed = (state, action) => {
  const newState = cloneDeep(state)
  newState.actions.create = { status: ACTION_TYPE.FAILED, error: action.error }

  return newState
}
const createSuccess = (state, action) => {
  const newState = cloneDeep(state)
  const newAssignments = action.payload

  newState.list[action.programId] = {
    ...newState.list[action.programId],
    ...newAssignments,
  }
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
  const newAssignment = action.payload
  const updateAssignmentIndex = newState.list[action.programId].findIndex(
    (assignment) => assignment._id === newAssignment._id,
  )

  newState.list[action.programId][updateAssignmentIndex] = newAssignment
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
  const deletedAssignmentIds = action.payload
  deletedAssignmentIds.forEach((id) => {
    const assignmentIndex = newState.list[action.programId].findIndex(
      (assignment) => assignment._id === id,
    )
    if (assignmentIndex > -1) {
      newState.list.splice(assignmentIndex, 1)
    }
  })
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
    case GET_ASSIGNMENTS_FAILED:
      return getByProgramFailed(state, action)
    case GET_ASSIGNMENTS_LOADING:
      return getByProgramLoading(state)
    case GET_ASSIGNMENTS_SUCCESS:
      return getByProgramSuccess(state, action)
    case CLEAN_GET_ASSIGNMENTS:
      return getByProgramClean(state)

    case CREATE_ASSIGNMENT_FAILED:
      return createFailed(state, action)
    case CREATE_ASSIGNMENT_LOADING:
      return createLoading(state)
    case CREATE_ASSIGNMENT_SUCCESS:
      return createSuccess(state, action)
    case CLEAN_CREATE_ASSIGNMENT:
      return createClean(state)

    case UPDATE_ASSIGNMENT_FAILED:
      return updateFailed(state, action)
    case UPDATE_ASSIGNMENT_LOADING:
      return updateLoading(state)
    case UPDATE_ASSIGNMENT_SUCCESS:
      return updateSuccess(state, action)
    case CLEAN_UPDATE_ASSIGNMENT:
      return updateClean(state)

    case DELETE_ASSIGNMENT_FAILED:
      return deleteFailed(state, action)
    case DELETE_ASSIGNMENT_LOADING:
      return deleteLoading(state)
    case DELETE_ASSIGNMENT_SUCCESS:
      return deleteSuccess(state, action)
    case CLEAN_DELETE_ASSIGNMENT:
      return deleteClean(state)

    default:
      return state
  }
}

export default reducer
