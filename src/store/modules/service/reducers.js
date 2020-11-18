import cloneDeep from 'lodash.clonedeep'

import {
  GET_SERVICES_FAILED,
  GET_SERVICES_LOADING,
  GET_SERVICES_SUCCESS,
  CREATE_SERVICE_LOADING,
  CREATE_SERVICE_FAILED,
  CREATE_SERVICE_SUCCESS,
  CLEAN_CREATE_SERVICE,
} from './constants'
import initialState from './state'
import { INITIAL_ACTION_STATE } from '../../../helper/constants'

const getServicesFailed = (state, action) => {
  const newState = cloneDeep(state)
  newState.actions.getAll.loading = false
  newState.actions.getAll.success = false
  newState.actions.getAll.error = action.error

  return newState
}

const getServicesSuccess = (state, action) => {
  const newState = cloneDeep(state)
  const services = action.payload

  newState.list = [...services]
  newState.actions.getAll.loading = false
  newState.actions.getAll.error = null
  newState.actions.getAll.success = true

  return newState
}

const getServicesLoading = (state) => {
  const newState = cloneDeep(state)
  newState.actions.getAll.loading = true
  newState.actions.getAll.success = false
  newState.actions.getAll.error = null

  return newState
}

const createFailed = (state, action) => {
  const newState = cloneDeep(state)
  newState.actions.create.loading = false
  newState.actions.create.success = false
  newState.actions.create.error = action.error

  return newState
}
const createSuccess = (state, action) => {
  const newState = cloneDeep(state)
  const newService = action.payload

  newState.list = [...newState.list, newService]
  newState.actions.create.loading = false
  newState.actions.create.error = null
  newState.actions.create.success = true

  return newState
}
const createLoading = (state) => {
  const newState = cloneDeep(state)
  newState.actions.create.loading = true
  newState.actions.create.success = false
  newState.actions.create.error = null

  return newState
}

const deleteCreate = (state) => {
  const newState = cloneDeep(state)
  newState.actions.create = { ...INITIAL_ACTION_STATE }

  return newState
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SERVICES_FAILED:
      return getServicesFailed(state, action)
    case GET_SERVICES_LOADING:
      return getServicesLoading(state)
    case GET_SERVICES_SUCCESS:
      return getServicesSuccess(state, action)
    case CREATE_SERVICE_FAILED:
      return createFailed(state, action)
    case CREATE_SERVICE_LOADING:
      return createLoading(state)
    case CREATE_SERVICE_SUCCESS:
      return createSuccess(state, action)
    case CLEAN_CREATE_SERVICE:
      return deleteCreate(state)
    default:
      return state
  }
}

export default reducer
