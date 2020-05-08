import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import WorkoutForm from "../workout-form/WorkoutForm";
import { SideModal, Title, toaster } from "../../ui";
import {
  create as createWorkout,
  cleanCreate,
} from "../../../store/modules/workout/actions";
import { ACTION_TYPE } from "../../../helper/constants";

const AddWorkoutModal = ({
  isOpen,
  onToggle,
  createWorkout,
  createWorkoutStatus,
  cleanCreateActionStore,
}) => {
  useEffect(() => {
    switch (createWorkoutStatus) {
      case ACTION_TYPE.FAILED:
        toaster.danger("Impossible to create the workout");
        break;
      case ACTION_TYPE.SUCCESS:
        toaster.success("Workout successfully created");
        cleanCreateActionStore();
        break;
      default:
        return;
    }
  }, [cleanCreateActionStore, createWorkoutStatus]);

  const onWorkoutSubmitted = (data) => {
    createWorkout(data);
  };

  return (
    <SideModal isShown={isOpen} onCloseComplete={onToggle}>
      <Title>Add a workout</Title>
      <WorkoutForm
        onSubmit={onWorkoutSubmitted}
        isLoading={createWorkoutStatus === ACTION_TYPE.LOADING}
      />
    </SideModal>
  );
};

AddWorkoutModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  createWorkoutStatus: state.workout.actions.create.status,
});

const mapDispatchToProps = (dispatch) => ({
  createWorkout: (data) => dispatch(createWorkout(data)),
  cleanCreateActionStore: () => dispatch(cleanCreate()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddWorkoutModal);
