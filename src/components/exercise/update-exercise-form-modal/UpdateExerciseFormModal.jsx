import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ExerciseForm from "../exercise-form/ExerciseForm";
import SideModal from "../../ui/modal/SideModal";
import Title from "../../ui/typography/Title";
import toaster from "../../ui/toaster/toaster";
import {
  update as updateExercise,
  cleanUpdate,
  del as deleteExercise,
} from "../../../store/modules/exercise/actions";
import { ACTION_TYPE } from "../../../helper/constants";

const UpdateExerciseFormModal = ({
  updateExercise,
  updateExerciseStatus,
  onClose,
  exerciseId,
  cleanUpdateActionStore,
  exercises,
  deleteExercise,
}) => {
  useEffect(() => {
    switch (updateExerciseStatus) {
      case ACTION_TYPE.FAILED:
        toaster.danger("Error in edition, retry later");
        break;
      case ACTION_TYPE.SUCCESS:
        toaster.success("Exercise successfully updated");
        cleanUpdateActionStore();
        break;
      default:
        return;
    }
  });

  const exerciseToUpdate = exercises.find(
    (exercise) => exercise._id === exerciseId
  );

  const initialFormValues = exerciseToUpdate
    ? {
        name: exerciseToUpdate.content[0].name,
        instructions: exerciseToUpdate.content[0].instructions,
        videoUrl: exerciseToUpdate.content[0].videoUrl,
      }
    : {};

  return (
    <SideModal isShown={!!exerciseId} onCloseComplete={onClose}>
      <Title>Edit an exercise</Title>
      <ExerciseForm
        onSubmit={updateExercise}
        submitText="Update"
        initialValues={initialFormValues}
        onDelete={() => deleteExercise(exerciseId)}
      />
    </SideModal>
  );
};

UpdateExerciseFormModal.propTypes = {
  isExerciseId: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  exercises: state.exercise.list,
  updateExerciseStatus: state.exercise.actions.update.status,
  deleteExerciseStatus: state.exercise.actions.delete.status,
});

const mapDispatchToProps = (dispatch) => ({
  updateExercise: (data) => dispatch(updateExercise(data)),
  cleanCreateActionStore: () => dispatch(cleanUpdate()),
  deleteExercise: (exerciseId) => dispatch(deleteExercise(exerciseId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateExerciseFormModal);
