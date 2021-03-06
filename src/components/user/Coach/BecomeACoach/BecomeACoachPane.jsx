import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  update as updateUser,
  cleanUpdate as cleanUpdateUser,
} from '../../../../store/modules/user/actions'
import { Button, Pane, toaster, Spinner } from '../../../ui/'

import IntroStep from './IntroStep'
import FinalStep from './FinalStep'

import { ACTION_TYPE } from '../../../../helper/constants'

export default function BecomeACoachPane() {
  const [step, setStep] = useState('intro')
  const userUpdateStatus = useSelector(
    (state) => state.user.actions.update.status,
  )
  const user = useSelector((state) => state.user.current)
  const dispatch = useDispatch()

  let steps = ['intro', 'final']

  useEffect(() => {
    if (user.isCoach) {
      setStep(steps[steps.length - 1])
    } else if (userUpdateStatus === ACTION_TYPE.SUCCESS) {
      setStep(steps[steps.length - 1])
      dispatch(cleanUpdateUser())
    } else if (userUpdateStatus === ACTION_TYPE.FAILED) {
      toaster.danger('An error occurred, please try again later')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps, userUpdateStatus, user])

  function goForward() {
    let nextStepIndex = steps.findIndex((elem) => elem === step) + 1
    if (nextStepIndex === steps.length - 1) {
      dispatch(updateUser({ isCoach: true }))
    } else {
      setStep(steps[nextStepIndex])
    }
  }

  if (userUpdateStatus === ACTION_TYPE.LOADING) {
    return <Spinner />
  } else {
    return (
      <Pane
        elevation={4}
        width="33%"
        alignItems="center"
        justifyContent="center"
        margin="auto"
      >
        {step === 'intro' && <IntroStep />}
        {step === 'final' && <FinalStep />}
        {step === 'intro' && (
          <Button
            type="submit"
            label="Start"
            appearance="primary"
            onClick={(e) => goForward()}
          />
        )}
      </Pane>
    )
  }
}
