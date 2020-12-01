import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ExerciseForm from '../exercise-form/ExerciseForm'
import SideModal from '../../ui/modal/SideModal'
import Title from '../../ui/typography/Title'
import toaster from '../../ui/toaster/toaster'
import {
  create as createExercise,
  cleanCreate,
} from '../../../store/modules/exercise/actions'
import { ACTION_TYPE } from '../../../helper/constants'

const CreateExerciseModal = ({
  createExercise,
  createExerciseStatus,
  onClose,
  isOpen,
  cleanCreateActionStore,
}) => {
  useEffect(() => {
    switch (createExerciseStatus) {
      case ACTION_TYPE.FAILED:
        toaster.danger('Error in creation, retry later')
        cleanCreateActionStore()
        break
      case ACTION_TYPE.SUCCESS:
        toaster.success('Exercise successfully created')
        cleanCreateActionStore()
        onClose()
        break
      default:
        return
    }
  })

  return (
    <SideModal isShown={isOpen} onCloseComplete={onClose}>
      <Title>Add an exercise</Title>
      <ExerciseForm onSubmit={createExercise} />
    </SideModal>
  )
}

CreateExerciseModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  createExerciseStatus: state.exercise.actions.create.status,
})

const mapDispatchToProps = (dispatch) => ({
  createExercise: (data) => dispatch(createExercise(data)),
  cleanCreateActionStore: () => dispatch(cleanCreate()),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateExerciseModal)
