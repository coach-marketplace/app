import API from '../../../services/api'

import {
  GET_SERVICES_FAILED,
  GET_SERVICES_LOADING,
  GET_SERVICES_SUCCESS,
  CREATE_SERVICE_LOADING,
  CREATE_SERVICE_FAILED,
  CREATE_SERVICE_SUCCESS,
} from './constants'
import store from '../../index'

const getAllLoading = () => ({ type: GET_SERVICES_LOADING })
const getAllSuccess = (payload) => ({ type: GET_SERVICES_SUCCESS, payload })
const getAllFailed = (error) => ({ type: GET_SERVICES_FAILED, error })

const createLoading = () => ({ type: CREATE_SERVICE_LOADING })
const createSuccess = (payload) => ({ type: CREATE_SERVICE_SUCCESS, payload })
const createFailed = (error) => ({ type: CREATE_SERVICE_FAILED, error })

export const retrieveAll = () => {
  return (dispatch) => {
    dispatch(getAllLoading())
    const {
      user: { current: user },
    } = store.getState()

    API.get(`coach/${user._id}/services`)
      .then((response) => {
        dispatch(getAllSuccess(response.data))
      })
      .catch((error) => {
        dispatch(getAllFailed(error.message))
      })
  }
}

export const create = (data) => {
  return (dispatch) => {
    dispatch(createLoading())
    const {
      user: { current: user },
    } = store.getState()

    const normalizedData = {
      title: data.title,
      description: data.description,
      price: data.price * 100,
      currency: 'EUR',
      address: data.address,
      coordinates: data.coordinates,
    }

    API.post(`coach/${user._id}/services/add`, normalizedData)
      .then((response) => {
        dispatch(createSuccess(response.data))
      })
      .catch((error) => {
        dispatch(createFailed(error.message))
      })
  }
}
