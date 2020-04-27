import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// import ExerciseForm from "../exercise-form/ExerciseForm";
import { SideModal, Title, toaster } from "../../ui";
// import { create as createExercise } from "../../../store/modules/exercise/actions";

const AddWorkoutModal = ({ isOpen, onToggle, createWorkout }) => {
  // static getDerivedStateFromProps(props, state) {
  //   const {
  //     isCreateExerciseError,
  //     isCreateExerciseLoading,
  //     isCreateExerciseSuccess,
  //   } = props;

  //   if (!isCreateExerciseLoading && isCreateExerciseSuccess) {
  //     toaster.success("Exercise successfully created");
  //     // TODO: reset and close the form modal
  //   } else if (!isCreateExerciseLoading && isCreateExerciseError) {
  //     toaster.danger("Error when creating the exercise");
  //   }

  //   return state;
  // }

  const onWorkoutSubmitted = (data) => {
    // createWorkout(data);
  };

  return (
    <SideModal isShown={isOpen} onCloseComplete={onToggle}>
      <Title>Add an exercise</Title>
      {/* <WorkoutForm onSubmit={onWorkoutSubmitted} /> */}
    </SideModal>
  );
};

AddWorkoutModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  // isCreateWorkoutLoading: state.workout.actions.create.loading,
  // isCreateWorkoutSuccess: state.workout.actions.create.success,
  // isCreateWorkoutError: state.workout.actions.create.error,
});

const mapDispatchToProps = (dispatch) => ({
  // createWorkout: (data) => dispatch(createWorkout(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddWorkoutModal);
