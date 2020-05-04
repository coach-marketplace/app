import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import WorkoutCard from "../workout-card/WorkoutCard";
import AddWorkoutModal from "../add-workout-modal/AddWorkoutModal";
import { Button, Pane } from "../../ui";
import { retrieveAll as retrieveAllWorkouts } from "../../../store/modules/workout/actions";

const WorkoutsContainer = ({
  isFetchWorkoutsLoading,
  isFetchWorkoutsSuccess,
  workouts,
  fetchWorkouts,
}) => {
  const [isAddWorkoutModalOpen, setIsAddWorkoutModalOpen] = useState(false);

  useEffect(() => {
    !isFetchWorkoutsLoading && !isFetchWorkoutsSuccess && fetchWorkouts();
  }, [fetchWorkouts, isFetchWorkoutsLoading, isFetchWorkoutsSuccess]);

  return (
    <>
      <AddWorkoutModal
        onToggle={() => setIsAddWorkoutModalOpen(!isAddWorkoutModalOpen)}
        isOpen={isAddWorkoutModalOpen}
      />

      <Button
        label="New"
        iconBefore="plus"
        appearance="minimal"
        onClick={() => setIsAddWorkoutModalOpen(true)}
      />

      <Pane>
        {workouts.map((workout) => (
          <WorkoutCard key={workout._id} workout={workout} />
        ))}
      </Pane>
    </>
  );
};

WorkoutsContainer.propTypes = {
  // onAdWorkoutClicked: PropTypes.func
};

WorkoutsContainer.defaultProps = {};

const mapStateToProps = (state) => ({
  workouts: state.workout.list,
  isFetchWorkoutsLoading: state.workout.actions.getAll.loading,
  isFetchWorkoutsSuccess: state.workout.actions.getAll.success,
  isFetchWorkoutsError: state.workout.actions.getAll.error,
});

const mapDispatchToProps = (dispatch) => ({
  fetchWorkouts: () => dispatch(retrieveAllWorkouts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutsContainer);
