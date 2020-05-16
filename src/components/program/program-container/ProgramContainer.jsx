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
import { ACTION_TYPE } from "../../../helper/constants";

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
      updatedProgram: cloneDeep(props.program),
      isDeleteModalOpen: false,
      isProgramUpdated: false,
    };
  }

  /**
   * We need to hydrate the state with the new program value only if it just
   * being updated. If we do it in any cases, it will overwrite all changes
   * made, like re-order, add or delete program-workout
   */
  static getDerivedStateFromProps(props, state) {
    const { updateProgramStatus } = props;

    if (updateProgramStatus === ACTION_TYPE.LOADING) {
      return { isProgramUpdated: false };
    } else if (
      updateProgramStatus === ACTION_TYPE.SUCCESS &&
      !state.isProgramUpdated
    ) {
      return { updatedProgram: props.program };
    }
    return state;
  }

  /**
   * Get sorted program workouts from specific day
   *
   * This function will return the list of workout from a day correctly sorted
   *
   * @param {number} day
   * @return {array} Sorted program workouts list
   */
  getSortedProgramWorkoutsFromSpecificDay = (day) => {
    const { updatedProgram } = this.state;
    const newUpdatedProgram = cloneDeep(updatedProgram);

    if (!newUpdatedProgram.workouts.length) return [];

    const programWorkouts = newUpdatedProgram.workouts.filter(
      (workout) => workout.day === day
    );

    if (programWorkouts.length === 1) return programWorkouts;

    return programWorkouts.sort(
      (programWorkoutA, programWorkoutB) =>
        programWorkoutA.startTime - programWorkoutB.startTime
    );
  };

  /**
   * This function will re-order the startTime base on the index. They will
   * also assign the right day received in props
   *
   * The list should match with a unique day
   *
   * @param {array} list List to re-order and re-assign
   * @param {numner} day Day to set to each list
   */
  orderProgramWorkoutList = (list, day) => {
    list.forEach((pw, index) => {
      pw.startTime = index;
      pw.day = day;
    });

    return list;
  };

  dragEndHandler = (result) => {
    const { destination, source } = result;

    // If drop outside a droppable area
    if (!destination) return;

    const sourceDay = Number(source.droppableId);
    const destinationDay = Number(destination.droppableId);
    const sourceIndex = source.index;
    const destinationIndex = destination.index;
    const moveInsideSameDay = sourceDay === destinationDay;
    const moveInsideSameIndex = sourceIndex === destinationIndex;

    // if move to the same position
    if (moveInsideSameDay && moveInsideSameIndex) return;

    const { updatedProgram } = this.state;
    const newUpdatedProgram = cloneDeep(updatedProgram);
    // if move inside same day we have only one list to update
    if (moveInsideSameDay) {
      /**
       * Clone all concerned program workouts and order them
       */
      const sortedPW = this.getSortedProgramWorkoutsFromSpecificDay(sourceDay);
      const extractedPw = sortedPW.splice(sourceIndex, 1);
      sortedPW.splice(destinationIndex, 0, ...extractedPw);
      // Re assign the right order to same day program-workouts
      this.orderProgramWorkoutList(sortedPW, sourceDay);
      // Re-inject them into the new updated program
      newUpdatedProgram.workouts.forEach((pw, index) => {
        if (sortedPW.some((concernedPw) => concernedPw._id === pw._id)) {
          const newPw = sortedPW.find((p) => p._id === pw._id);
          newUpdatedProgram.workouts[index] = newPw;
        }
      });
      // Else if move into another day
    } else {
      /**
       * Clone all concerned program workouts and order them for the source
       * and for the destination day
       */
      const sortedPWSourceDay = this.getSortedProgramWorkoutsFromSpecificDay(
        sourceDay
      );
      const sortedPWDestDay = this.getSortedProgramWorkoutsFromSpecificDay(
        destinationDay
      );
      const extractedPw = sortedPWSourceDay.splice(sourceIndex, 1);
      sortedPWDestDay.splice(destinationIndex, 0, ...extractedPw);
      // Re assign the right order to same day program-workouts for both days
      this.orderProgramWorkoutList(sortedPWSourceDay, sourceDay);
      this.orderProgramWorkoutList(sortedPWDestDay, destinationDay);
      // Re-inject them into the new updated program
      newUpdatedProgram.workouts.forEach((pw, index) => {
        if (
          sortedPWSourceDay.some((concernedPw) => concernedPw._id === pw._id)
        ) {
          const newPw = sortedPWSourceDay.find((p) => p._id === pw._id);
          newUpdatedProgram.workouts[index] = newPw;
        } else if (
          sortedPWDestDay.some((concernedPw) => concernedPw._id === pw._id)
        ) {
          const newPw = sortedPWDestDay.find((p) => p._id === pw._id);
          newUpdatedProgram.workouts[index] = newPw;
        }
      });
    }

    this.setState({ updatedProgram: newUpdatedProgram });
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
    const sortedConcernedPW = this.getSortedProgramWorkoutsFromSpecificDay(
      concernedDay
    );
    this.orderProgramWorkoutList(sortedConcernedPW, concernedDay);

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
              const programWorkouts = updatedProgram.workouts.filter(
                (workout) => workout.day === dayNumber + 1
              );

              return (
                <DayContainer
                  day={dayNumber + 1}
                  key={titleCol}
                  title={titleCol}
                  programWorkouts={programWorkouts}
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
  updateProgramStatus: state.program.actions.update.status,
});

const mapDispatchToProps = (dispatch) => ({
  updateProgram: (programId, data) => dispatch(updateProgram(programId, data)),
  deleteProgram: (programId) => dispatch(deleteProgram(programId)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProgramContainer)
);
