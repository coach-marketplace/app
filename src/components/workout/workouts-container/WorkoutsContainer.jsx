import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import WorkoutCard from "../workout-card/WorkoutCard";
import AddWorkoutModal from "../add-workout-modal/AddWorkoutModal";
import { Button, Pane } from "../../ui";
// import {
//   retrieveAll as retrieveAllWorkouts,
//   create as createWorkout,
// } from "../../../store/modules/workout/actions";

const WorkoutsContainer = () => {
  const [isAddWorkoutModalOpen, setIsAddWorkoutModalOpen] = useState(false);

  return (
    <>
      <AddWorkoutModal
        onToggle={() => setIsAddWorkoutModalOpen(!isAddWorkoutModalOpen)}
        isOpen={isAddWorkoutModalOpen}
        // isLoading={isCreateWorkoutLoading}
      />

      <Button
        label="New"
        iconBefore="plus"
        appearance="minimal"
        onClick={() => setIsAddWorkoutModalOpen(true)}
      />

      <Pane>
        {
          /*workouts*/ [].map((workout) => (
            <WorkoutCard key={workout._id} workout={workout} />
          ))
        }
      </Pane>
    </>
  );
};

WorkoutsContainer.propTypes = {
  // onAdWorkoutClicked: PropTypes.func
};

WorkoutsContainer.defaultProps = {};

const mapStateToProps = (state) => ({
  // workouts: state.workout.list,
  // isCreateWorkoutLoading: state.workout.actions.create.loading,
  // isCreateWorkoutSuccess: state.workout.actions.create.success,
  // isCreateWorkoutError: state.workout.actions.create.error,
});

const mapDispatchToProps = (dispatch) => ({
  // createWorkout: (data) => dispatch(createWorkout(data)),
  // fetchWorkouts: () => dispatch(retrieveAllWorkouts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutsContainer);
