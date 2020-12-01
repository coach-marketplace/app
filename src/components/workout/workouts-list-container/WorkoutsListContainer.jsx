import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { Container } from './styled'
import { Pane, Text } from '../../ui'
import { retrieveAll as retrieveAllWorkouts } from '../../../store/modules/workout/actions'
import { ACTION_TYPE } from '../../../helper/constants'
import Workout from '../../../services/domains/Workout'

const WorkoutsListComponent = ({
  workouts,
  fetchWorkoutsStatus,
  fetchWorkouts,
  onWorkoutClicked,
}) => {
  useEffect(() => {
    ![ACTION_TYPE.LOADING, ACTION_TYPE.SUCCESS].includes(fetchWorkoutsStatus) &&
      fetchWorkouts()
  }, [fetchWorkouts, fetchWorkoutsStatus])

  if (!workouts.length) {
    return <Pane>no workouts</Pane>
  }

  return (
    <Pane>
      {workouts.map((workout) => {
        return (
          <Container
            key={workout._id}
            elevation={1}
            marginBottom={5}
            padding={5}
          >
            <Text onClick={() => onWorkoutClicked(workout._id)}>
              {workout.getTitle()}
            </Text>
          </Container>
        )
      })}
    </Pane>
  )
}

const mapStateToProps = (state) => ({
  workouts: state.workout.list.map((w) => new Workout(w)),
  fetchWorkoutsStatus: state.workout.actions.getAll.status,
})

const mapDispatchToProps = (dispatch) => ({
  fetchWorkouts: () => dispatch(retrieveAllWorkouts()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WorkoutsListComponent)
