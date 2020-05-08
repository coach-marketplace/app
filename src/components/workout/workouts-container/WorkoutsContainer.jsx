import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import WorkoutCard from "../workout-card/WorkoutCard";
import AddWorkoutModal from "../add-workout-modal/AddWorkoutModal";
import UpdateWorkoutModal from "../update-workout-modal/UpdateWorkoutModal";
import { Button, Pane } from "../../ui";
import { retrieveAll as retrieveAllWorkouts } from "../../../store/modules/workout/actions";
import { ACTION_TYPE } from "../../../helper/constants";

const WorkoutsContainer = ({
  fetchWorkoutsStatus,
  workouts,
  fetchWorkouts,
}) => {
  const [isAddWorkoutModalOpen, setIsAddWorkoutModalOpen] = useState(false);
  const [workoutIdSelected, setWorkoutIdSelected] = useState(null);

  useEffect(() => {
    ![ACTION_TYPE.LOADING, ACTION_TYPE.SUCCESS].includes(fetchWorkoutsStatus) &&
      fetchWorkouts();
  }, [fetchWorkouts, fetchWorkoutsStatus]);

  return (
    <>
      <AddWorkoutModal
        onToggle={() => setIsAddWorkoutModalOpen(!isAddWorkoutModalOpen)}
        isOpen={isAddWorkoutModalOpen}
      />
      <UpdateWorkoutModal
        onClose={() => setWorkoutIdSelected(null)}
        workoutId={workoutIdSelected}
      />

      <Button
        label="New"
        iconBefore="plus"
        appearance="minimal"
        onClick={() => setIsAddWorkoutModalOpen(true)}
      />

      <Pane>
        {workouts.map((workout) => (
          <WorkoutCard
            key={workout._id}
            workout={workout}
            onClick={() => setWorkoutIdSelected(workout._id)}
          />
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
  fetchWorkoutsStatus: state.workout.actions.getAll.status,
});

const mapDispatchToProps = (dispatch) => ({
  fetchWorkouts: () => dispatch(retrieveAllWorkouts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutsContainer);
