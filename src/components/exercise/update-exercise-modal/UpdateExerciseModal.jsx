import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ExerciseForm from '../exercise-form/ExerciseForm'
import SideModal from '../../ui/modal/SideModal'
import Title from '../../ui/typography/Title'
import toaster from '../../ui/toaster/toaster'
import {
  update as updateExercise,
  cleanUpdate,
  del as deleteExercise,
  cleanDelete,
} from '../../../store/modules/exercise/actions'
import { ACTION_TYPE } from '../../../helper/constants'

const UpdateExerciseModal = ({
  cleanDeleteActionStore,
  cleanUpdateActionStore,
  deleteExercise,
  exerciseId,
  exercises,
  onClose,
  updateExercise,
  updateExerciseStatus,
  deleteExerciseStatus,
}) => {
  useEffect(() => {
    switch (updateExerciseStatus) {
      case ACTION_TYPE.FAILED:
        toaster.danger('Error in edition, retry later')
        cleanUpdateActionStore()
        break
      case ACTION_TYPE.SUCCESS:
        toaster.success('Exercise successfully updated')
        cleanUpdateActionStore()
        onClose()
        break
      default:
        return
    }
  }, [cleanUpdateActionStore, onClose, updateExerciseStatus])

  useEffect(() => {
    switch (deleteExerciseStatus) {
      case ACTION_TYPE.FAILED:
        toaster.danger('Error in deletion, retry later')
        cleanDeleteActionStore()
        break
      case ACTION_TYPE.SUCCESS:
        toaster.success('Exercise successfully deleted')
        cleanDeleteActionStore()
        onClose()
        break
      default:
        return
    }
  }, [cleanDeleteActionStore, onClose, deleteExerciseStatus])

  const exerciseToUpdate = exercises.find(
    (exercise) => exercise._id === exerciseId,
  )

  const initialFormValues = exerciseToUpdate
    ? {
        lang: exerciseToUpdate.content[0].lang,
        name: exerciseToUpdate.content[0].name,
        instructions: exerciseToUpdate.content[0].instructions,
        videoUrl: exerciseToUpdate.content[0].videoUrl,
        isPrivate: exerciseToUpdate.isPrivate,
      }
    : {}

  const onFormSubmitted = (data) => {
    const normalizedData = {
      isPrivate: exerciseToUpdate.isPrivate,
      content: [],
    }
    exerciseToUpdate.content.forEach((content) => {
      normalizedData.content.push({
        lang: data.lang || content.lang,
        name: data.name || content.name,
        instructions: data.instructions || content.instructions,
      })
    })

    updateExercise(exerciseId, normalizedData)
  }

  return (
    <SideModal isShown={!!exerciseId} onCloseComplete={onClose}>
      <Title>Edit an exercise</Title>
      <ExerciseForm
        onSubmit={onFormSubmitted}
        submitText="Update"
        initialValues={initialFormValues}
        onDelete={() => deleteExercise(exerciseId)}
      />
    </SideModal>
  )
}

UpdateExerciseModal.propTypes = {
  isExerciseId: PropTypes.string,
  onClose: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  exercises: state.exercise.list,
  updateExerciseStatus: state.exercise.actions.update.status,
  deleteExerciseStatus: state.exercise.actions.delete.status,
})

const mapDispatchToProps = (dispatch) => ({
  updateExercise: (exerciseId, data) =>
    dispatch(updateExercise(exerciseId, data)),
  cleanUpdateActionStore: () => dispatch(cleanUpdate()),
  deleteExercise: (exerciseId) => dispatch(deleteExercise(exerciseId)),
  cleanDeleteActionStore: () => dispatch(cleanDelete()),
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdateExerciseModal)
