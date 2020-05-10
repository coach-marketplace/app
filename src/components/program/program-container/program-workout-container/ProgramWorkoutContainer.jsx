import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Draggable } from "react-beautiful-dnd";

import { Container } from "./styled";
import { Button, Text } from "../../../ui";
import {
  fetch as fetchWorkout,
  // cleanFetch,
} from "../../../../store/modules/workout/actions";
// import { ACTION_TYPE } from "../../../../helper/constants";

const ProgramDayContainer = ({ programWorkout, index, onRemove }) => {
  return (
    <Draggable draggableId={programWorkout._id} index={index}>
      {(provided) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Text size={300}>{programWorkout.workout}</Text>
          <Button
            iconBefore="cross"
            onClick={() => onRemove(programWorkout._id)}
          />
        </Container>
      )}
    </Draggable>
  );
};

ProgramDayContainer.propTypes = {
  programWorkout: PropTypes.shape({}),
  index: PropTypes.number,
};

const mapStateToProps = (state) => ({
  getWorkout: (id) => state.workout.list.find((w) => w._id === id),
});

const mapDispatchToProps = (dispatch) => ({
  fetchWorkout: (workoutId, callback) =>
    dispatch(fetchWorkout(workoutId, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgramDayContainer);
