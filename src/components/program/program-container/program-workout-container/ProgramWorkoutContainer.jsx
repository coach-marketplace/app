import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Draggable } from 'react-beautiful-dnd'

import { Container } from './styled.js'
import { Button, Text } from '../../../ui'
import { fetch as fetchWorkout } from '../../../../store/modules/workout/actions'

const ProgramDayContainer = ({
  programWorkout,
  index,
  onRemove,
  getWorkout,
  fetchWorkout,
}) => {
  useEffect(() => {
    const workout = getWorkout(programWorkout.workout)
    !workout && fetchWorkout(programWorkout.workout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderContent = () => {
    const workout = getWorkout(programWorkout.workout)
    if (!workout) {
      return <Text>Loading...</Text>
    }

    const title = workout.content[0].title

    return <Text size={300}>{title}</Text>
  }

  return (
    <Draggable draggableId={programWorkout._id} index={index}>
      {(provided) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {renderContent()}
          <Button
            iconBefore="cross"
            appearance="minimal"
            height={24}
            onClick={() => onRemove(programWorkout._id)}
          />
        </Container>
      )}
    </Draggable>
  )
}

ProgramDayContainer.propTypes = {
  programWorkout: PropTypes.shape({}),
  index: PropTypes.number,
}

const mapStateToProps = (state) => ({
  getWorkout: (id) => state.workout.list.find((w) => w._id === id),
})

const mapDispatchToProps = (dispatch) => ({
  fetchWorkout: (workoutId, callback) =>
    dispatch(fetchWorkout(workoutId, callback)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProgramDayContainer)
