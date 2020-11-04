import {
  FETCH_COACH_PROFILE_FAILED,
  FETCH_COACH_PROFILE_LOADING,
  FETCH_COACH_PROFILE_SUCCESS,

  UPDATE_COACH_PROFILE_LOADING,
  UPDATE_COACH_PROFILE_SUCCESS,
  UPDATE_COACH_PROFILE_FAILED,
} from './constants'
import store from '../../index'
import API from '../../../services/api'

/**
 * Fetch coach profile
 */
const fetchCoachProfileLoading = () => ({ type: FETCH_COACH_PROFILE_LOADING })
const fetchCoachProfileSuccess = (payload) => ({
  type: FETCH_COACH_PROFILE_SUCCESS,
  payload,
})
const fetchCoachProfileFailed = (error) => ({
  type: FETCH_COACH_PROFILE_FAILED,
  error,
})

/**
 * Update coach profile
 */
const updateCoachProfileLoading = () => ({ type: UPDATE_COACH_PROFILE_LOADING })
const updateCoachProfileSuccess = (payload) => ({ type: UPDATE_COACH_PROFILE_SUCCESS, payload })
const updateCoachProfileFailed = (error) => ({ type: UPDATE_COACH_PROFILE_FAILED, error })


/**
 * Fetch coach profile
 * @return {void}
 */
export const fetchCoachProfile = () => {
  return (dispatch) => {
    dispatch(fetchCoachProfileLoading())
    const {
      user: {current: user}
    } = store.getState()
    API.get(`coach/${user._id}/coach-profile`)
      .then((response) => {
        dispatch(fetchCoachProfileSuccess(response.data))
      })
      .catch((error) => {
        dispatch(fetchCoachProfileFailed(error.message))
      })
  }
}

export const updateCoachProfile = (data) => {
  return (dispatch) => {
    dispatch(updateCoachProfileLoading())
    const {
      coach: {coachProfile: coachProfile}
    } = store.getState()

    console.log(coachProfile)

    API.put(`coach/${coachProfile.coach}/coach-profile/${coachProfile._id}`, data)
      .then((response) => {
        dispatch(updateCoachProfileSuccess(response.data))
      })
      .catch((error) => {
        dispatch(
          updateCoachProfileFailed({
            error: 'We could not update your profile. Please try again later.',
          }),
        )
      })
  }
}
