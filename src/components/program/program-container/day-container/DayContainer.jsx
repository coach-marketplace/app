import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Droppable } from "react-beautiful-dnd";

import { Container } from "./styled";
import ProgramWorkoutContainer from "../program-workout-container/ProgramWorkoutContainer";
import AddWorkoutModal from "../add-workout-modal/AddWorkoutModal";
import { Button } from "../../../ui";
import { getRandomString } from "../../../../helper/utils";

const DayContainer = ({
  title,
  programWorkouts,
  day,
  cols,
  onWorkoutAdd,
  onWorkoutRemove,
}) => {
  const [isAddWorkoutModalOpen, setIsAddWorkoutModalOpen] = useState(false);

  const onWorkoutChoose = (workoutId) => {
    const orderNumbers = programWorkouts.map((workout) => workout.startTime);

    let startTime = 0;
    if (orderNumbers.length) {
      startTime = Math.max(...orderNumbers) + 1;
    }

    onWorkoutAdd({
      _id: getRandomString(),
      workout: workoutId,
      day,
      startTime,
    });
  };

  const sortedProgramWorkouts = programWorkouts.sort(
    (workoutA, workoutB) => workoutA.startTime - workoutB.startTime
  );

  return (
    <Container cols={cols}>
      <AddWorkoutModal
        isOpen={isAddWorkoutModalOpen}
        onClose={() => setIsAddWorkoutModalOpen(false)}
        onWorkoutChoose={onWorkoutChoose}
      />

      <h4>{title}</h4>
      <Droppable droppableId={String(day)}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {sortedProgramWorkouts.map((programWorkout, index) => {
              return (
                <ProgramWorkoutContainer
                  key={programWorkout._id}
                  index={index}
                  programWorkout={programWorkout}
                  onRemove={onWorkoutRemove}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <div>
        <Button onClick={() => setIsAddWorkoutModalOpen(true)}>Add</Button>
      </div>
    </Container>
  );
};

DayContainer.propTypes = {
  title: PropTypes.string,
  programWorkouts: PropTypes.arrayOf(PropTypes.shape({})),
  day: PropTypes.number,
  /**
   * Number of columns in program, corresponding to number of days into the
   * program, and help to calculate the width of the container
   */
  cols: PropTypes.number,
  onWorkoutAdd: PropTypes.func,
  onWorkoutRemove: PropTypes.func,
};

const mapStateToProps = (state) => ({
  // programs: state.program.list,
  // isFetchProgramsLoading: state.program.actions.getAll.loading,
  // isFetchProgramsSuccess: state.program.actions.getAll.success,
  // isFetchProgramsError: state.program.actions.getAll.error,
});

const mapDispatchToProps = (dispatch) => ({
  // fetchPrograms: () => dispatch(retrieveAllPrograms()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DayContainer);
