import API from '../../../services/api'

import {
  GET_SPORTS_LOADING,
  GET_SPORTS_SUCCESS,
  GET_SPORTS_FAILURE,
} from './constants'

const getAllLoading = () => ({ type: GET_SPORTS_LOADING })
const getAllSuccess = (payload) => ({ type: GET_SPORTS_SUCCESS, payload })
const getAllFailed = (error) => ({ type: GET_SPORTS_FAILURE, error })

export const retrieveAll = () => {
  return (dispatch) => {
    dispatch(getAllLoading())

    API.get(`sport`)
      .then((response) => {
        dispatch(getAllSuccess(response.data))
      })
      .catch((error) => {
        dispatch(getAllFailed(error.message))
      })
  }
}
