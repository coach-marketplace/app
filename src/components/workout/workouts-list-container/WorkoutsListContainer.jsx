import React, { useEffect } from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Pane, Text } from "../../ui";
import { retrieveAll as retrieveAllWorkouts } from "../../../store/modules/workout/actions";
import { ACTION_TYPE } from "../../../helper/constants";
import Workout from "../../../services/domains/Workout";

const WorkoutsListComponent = ({
  workouts,
  fetchWorkoutsStatus,
  fetchWorkouts,
  onWorkoutClicked,
}) => {
  // const [workoutIdSelected, setWorkoutIdSelected] = useState(null);

  useEffect(() => {
    ![ACTION_TYPE.LOADING, ACTION_TYPE.SUCCESS].includes(fetchWorkoutsStatus) &&
      fetchWorkouts();
  }, [fetchWorkouts, fetchWorkoutsStatus]);

  if (!workouts.length) {
    return <Pane>no workouts</Pane>;
  }

  return (
    <Pane>
      {workouts.map((workout) => {
        return (
          <Pane key={workout._id}>
            <Text onClick={() => onWorkoutClicked(workout._id)}>
              {workout.getTitle()}
            </Text>
          </Pane>
        );
      })}
    </Pane>
  );
};

WorkoutsListComponent.propTypes = {};

WorkoutsListComponent.defaultProps = {};

const mapStateToProps = (state) => ({
  workouts: state.workout.list.map((w) => new Workout(w)),
  fetchWorkoutsStatus: state.workout.actions.getAll.status,
});

const mapDispatchToProps = (dispatch) => ({
  fetchWorkouts: () => dispatch(retrieveAllWorkouts()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkoutsListComponent);
