import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import WorkoutForm from "../workout-form/WorkoutForm";
import { SideModal, Title, toaster } from "../../ui";
import {
  update as updateWorkout,
  cleanUpdate,
  del as deleteWorkout,
} from "../../../store/modules/workout/actions";
import { ACTION_TYPE } from "../../../helper/constants";

const UpdateWorkoutModal = ({
  updateWorkout,
  updateWorkoutStatus,
  onClose,
  workoutId,
  cleanUpdateActionStore,
  workouts,
  deleteWorkout,
}) => {
  useEffect(() => {
    switch (updateWorkoutStatus) {
      case ACTION_TYPE.FAILED:
        toaster.danger("Error in edition, retry later");
        break;
      case ACTION_TYPE.SUCCESS:
        toaster.success("Workout successfully updated");
        cleanUpdateActionStore();
        break;
      default:
        return;
    }
  }, [cleanUpdateActionStore, updateWorkoutStatus]);

  const workoutToUpdate = workouts.find((workout) => workout._id === workoutId);

  const initialFormValues = workoutToUpdate
    ? {
        lang: workoutToUpdate.content[0].lang,
        title: workoutToUpdate.content[0].title,
        instructions: workoutToUpdate.content[0].instructions,
        isPrivate: workoutToUpdate.isPrivate,
      }
    : {};

  const onFormSubmitted = (data) => {
    const normalizedData = {
      isPrivate: workoutToUpdate.isPrivate,
      content: [],
    };
    workoutToUpdate.content.forEach((content) => {
      normalizedData.content.push({
        lang: data.lang || content.lang,
        title: data.title || content.title,
        instructions: data.instructions || content.instructions,
      });
    });

    updateWorkout(workoutId, normalizedData);
  };

  return (
    <SideModal isShown={!!workoutId} onCloseComplete={onClose}>
      <Title>Update a workout</Title>
      <WorkoutForm
        onSubmit={onFormSubmitted}
        submitText="Update"
        initialValues={initialFormValues}
        onDelete={() => deleteWorkout(workoutId)}
      />
    </SideModal>
  );
};

UpdateWorkoutModal.propTypes = {
  isWorkoutId: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  workouts: state.workout.list,
  updateWorkoutStatus: state.workout.actions.update.status,
  deleteWorkoutStatus: state.workout.actions.delete.status,
});

const mapDispatchToProps = (dispatch) => ({
  updateWorkout: (workoutId, data) => dispatch(updateWorkout(workoutId, data)),
  cleanUpdateActionStore: () => dispatch(cleanUpdate()),
  deleteWorkout: (workoutId) => dispatch(deleteWorkout(workoutId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateWorkoutModal);
