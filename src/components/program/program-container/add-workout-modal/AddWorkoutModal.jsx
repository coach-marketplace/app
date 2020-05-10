import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  Dialog,
  Pane,
  Text,
  TabList,
  Tab,
  toaster,
  // Field,
  // Form,
} from "../../../ui";
import WorkoutForm from "../../../workout/workout-form/WorkoutForm";
// import AddWorkoutToProgramForm from "../add-workout-to-program-form/AddWorkoutToForm";
import {
  create as createWorkout,
  cleanCreate,
} from "../../../../store/modules/workout/actions";
import {
  update as updateProgram,
  // clean,
} from "../../../../store/modules/program/actions";
import { ACTION_TYPE } from "../../../../helper/constants";
import WorkoutsListContainer from "../../../workout/workouts-list-container/WorkoutsListContainer";

const AddWorkoutModal = ({
  isOpen,
  onClose,
  createWorkoutStatus,
  createWorkout,
  cleanCreateActionStore,
  getWorkout,
  updateWorkout,
  workouts,
  onWorkoutChoose,
  // day,
}) => {
  const tabs = ["Your workouts", "Create new"];
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  // const [workoutToAdd, setWorkoutToAdd] = useState(null);

  useEffect(() => {
    switch (createWorkoutStatus) {
      case ACTION_TYPE.FAILED:
        toaster.danger("Impossible to create the workout");
        break;
      case ACTION_TYPE.SUCCESS:
        toaster.success("Workout successfully created");
        // cleanCreateActionStore();
        break;
      default:
        return;
    }
  }, [cleanCreateActionStore, createWorkoutStatus]);

  const onWorkoutSubmitted = (data) => {
    console.log("++", data);
    createWorkout(data, (newWorkoutId) => {
      // setWorkoutToAdd(getWorkout(newWorkoutId))
      const workout = getWorkout(newWorkoutId);
      console.log("new workout to add", workout);
      // updateWorkout()
      onWorkoutChoose(newWorkoutId);
    });
  };

  const onWorkoutSelected = (workoutId) => {
    // const programWorkout = {
    //   workoutId, day, startTime
    // }
    console.log("select w", workoutId);
    onWorkoutChoose(workoutId);
  };

  return (
    <Dialog
      isShown={isOpen}
      onCloseComplete={onClose}
      title="Add a workout"
      hasFooter={false}
    >
      <TabList marginBottom={16} flexBasis={240} marginRight={24}>
        {tabs.map((tabTitle, index) => (
          <Tab
            key={tabTitle}
            id={tabTitle}
            onSelect={() => setSelectedTabIndex(index)}
            isSelected={index === selectedTabIndex}
            aria-controls={`panel-${tabTitle}`}
          >
            {tabTitle}
          </Tab>
        ))}
      </TabList>
      {tabs.map((tabTitle, index) => (
        <Pane
          key={tabTitle}
          id={`panel-${tabTitle}`}
          role="tabpanel"
          aria-labelledby={tabTitle}
          aria-hidden={index !== selectedTabIndex}
          display={index === selectedTabIndex ? "block" : "none"}
        >
          {index === 0 && (
            <Pane>
              <Text>Selected id:</Text>

              <WorkoutsListContainer onWorkoutClicked={onWorkoutSelected} />
            </Pane>
          )}
          {index === 1 && (
            <WorkoutForm
              onSubmit={onWorkoutSubmitted}
              isLoading={createWorkoutStatus === ACTION_TYPE.LOADING}
            />
          )}
          {/* {workoutToAdd && <AddWorkoutToProgramForm day={day} />} */}
        </Pane>
      ))}
    </Dialog>
  );
};

AddWorkoutModal.propTypes = {
  // day: PropTypes.number,
};

AddWorkoutModal.defaultProps = {};

const mapStateToProps = (state) => ({
  createWorkoutStatus: state.workout.actions.create.status,
  getWorkout: (id) => state.workout.list.find((w) => w._id === id),
});

const mapDispatchToProps = (dispatch) => ({
  createWorkout: (data, callback) => dispatch(createWorkout(data, callback)),
  updateProgram: (ProgramId, data) => dispatch(updateProgram(ProgramId, data)),
  cleanCreateActionStore: () => dispatch(cleanCreate()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddWorkoutModal);
