import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import WorkoutForm from "../workout-form/WorkoutForm";
import { SideModal, Title, toaster } from "../../ui";
import { create as createWorkout } from "../../../store/modules/workout/actions";

const AddWorkoutModal = ({
  isOpen,
  onToggle,
  createWorkout,
  isCreateWorkoutLoading,
  isCreateWorkoutSuccess,
  isCreateWorkoutError,
}) => {
  useEffect(() => {
    if (!isCreateWorkoutLoading && isCreateWorkoutSuccess) {
      toaster.success("Workout successfully created");
    } else if (!isCreateWorkoutLoading && isCreateWorkoutError) {
      toaster.danger("Impossible to create the workout");
    }
  });

  const onWorkoutSubmitted = (data) => {
    createWorkout(data);
  };

  return (
    <SideModal isShown={isOpen} onCloseComplete={onToggle}>
      <Title>Add a workout</Title>
      <WorkoutForm
        onSubmit={onWorkoutSubmitted}
        isLoading={isCreateWorkoutLoading}
      />
    </SideModal>
  );
};

AddWorkoutModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isCreateWorkoutLoading: state.workout.actions.create.loading,
  isCreateWorkoutSuccess: state.workout.actions.create.success,
  isCreateWorkoutError: state.workout.actions.create.error,
});

const mapDispatchToProps = (dispatch) => ({
  createWorkout: (data) => dispatch(createWorkout(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddWorkoutModal);
