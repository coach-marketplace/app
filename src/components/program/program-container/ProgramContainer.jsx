import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import { withRouter } from "react-router-dom";
import cloneDeep from "lodash.clonedeep";

import DayContainer from "./day-container/DayContainer";
import DeleteProgramModal from "../delete-program-modal/DeleteProgramModal";
import { Spinner, Button } from "../../ui";
import {
  update as updateProgram,
  del as deleteProgram,
} from "../../../store/modules/program/actions";

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

class ProgramContainer extends Component {
  static propTypes = {
    program: PropTypes.shape({}),
  };

  constructor(props) {
    super(props);

    this.state = {
      updatedProgram: props.program,
      isDeleteModalOpen: false,
    };
  }

  dragEndHandler = (a, b) => {
    console.log("dropped", a, b);
  };

  saveProgram = () => {
    const { updateProgram } = this.props;
    const { updatedProgram } = this.state;

    updateProgram(updatedProgram._id, updatedProgram);
  };

  /**
   * Add Program-Workout To Program
   *
   * Will add a program-workout object to the local program
   * (not in the database, the user need to save to persist changes in database)
   *
   * @param {object} data Program-Workout data
   */
  addProgramWorkoutToProgram = (data) => {
    const { updatedProgram } = this.state;

    const newUpdatedProgram = updatedProgram;
    newUpdatedProgram.workouts.push(data);

    this.setState({ updatedProgram: newUpdatedProgram });
  };

  /**
   * Remove Program-Workout From Program
   *
   * Will remove a program-workout object from the local program
   * (not in the database, the user need to save to persist changes in database)
   *
   * @param {string} id Program-Workout id
   */
  removeProgramWorkoutFromProgram = (id) => {
    const { updatedProgram } = this.state;
    const newUpdatedProgram = cloneDeep(updatedProgram);
    const programWorkoutToRemove = newUpdatedProgram.workouts.find(
      (workout) => workout._id === id
    );
    const concernedDay = programWorkoutToRemove.day;
    /**
     * Remove the program-workout from the local program
     */
    const programWorkoutIndex = newUpdatedProgram.workouts.findIndex(
      (item) => item._id === id
    );

    if (programWorkoutIndex === -1) return;

    newUpdatedProgram.workouts.splice(programWorkoutIndex, 1);
    /**
     * Re-arrange startTime from same day program-workout to keep order clean
     */
    // If no program workout left -> return
    if (newUpdatedProgram.workouts.length) {
      // Get concerned program-workout (those from the same day)
      const concernedPW = newUpdatedProgram.workouts.filter(
        (workout) => workout.day === concernedDay
      );
      // If no program workout left for the concerned day -> return
      if (concernedPW.length) {
        // Sort them by startTime
        const sortConcernedPW = concernedPW.sort(
          (programWorkoutA, programWorkoutB) =>
            programWorkoutA.startTime - programWorkoutB.startTime
        );
        // Re-assign the right startTime order base on the index
        sortConcernedPW.forEach((pw, index) => {
          pw.startTime = index;
        });
      }
    }

    this.setState({ updatedProgram: newUpdatedProgram });
  };

  toggleDeleteProgramHandler = () => {
    const { isDeleteModalOpen } = this.state;
    this.setState({ isDeleteModalOpen: !isDeleteModalOpen });
  };

  goToPrograms = () => {
    const { history } = this.props;
    history.push("/library/programs");
  };

  render() {
    const { updatedProgram, isDeleteModalOpen } = this.state;

    if (!updatedProgram) {
      return <Spinner />;
    }

    return (
      <div>
        <DeleteProgramModal
          isOpen={isDeleteModalOpen}
          onClose={this.toggleDeleteProgramHandler}
          programTitle={updatedProgram.content[0].title}
          programId={updatedProgram._id}
        />
        <h1>{updatedProgram.content[0].title}</h1>
        <Button onClick={this.goToPrograms}>Back to programs</Button>
        <Button onClick={this.saveProgram}>Save</Button>
        <Button
          onClick={this.toggleDeleteProgramHandler}
          appearance="minimal"
          intent="danger"
        >
          Delete the program
        </Button>
        <DragDropContext onDragEnd={this.dragEndHandler}>
          <ListContainer>
            {[...Array(updatedProgram.days).keys()].map((dayNumber) => {
              const titleCol = `Day ${dayNumber + 1}`;

              return (
                <DayContainer
                  day={dayNumber + 1}
                  key={titleCol}
                  title={titleCol}
                  programWorkouts={updatedProgram.workouts.filter(
                    (workout) => workout.day === dayNumber + 1
                  )}
                  onWorkoutAdd={this.addProgramWorkoutToProgram}
                  onWorkoutRemove={this.removeProgramWorkoutFromProgram}
                  cols={updatedProgram.days}
                />
              );
            })}
          </ListContainer>
        </DragDropContext>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // updateProgramStatus: state.program.actions.update.loading,
});

const mapDispatchToProps = (dispatch) => ({
  updateProgram: (programId, data) => dispatch(updateProgram(programId, data)),
  deleteProgram: (programId) => dispatch(deleteProgram(programId)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProgramContainer)
);
