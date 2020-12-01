import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Dialog, Pane, Text, TabList, Tab, toaster } from '../../../ui'
import WorkoutForm from '../../../workout/workout-form/WorkoutForm'
import {
  create as createWorkout,
  cleanCreate,
} from '../../../../store/modules/workout/actions'
import { ACTION_TYPE } from '../../../../helper/constants'
import WorkoutsListContainer from '../../../workout/workouts-list-container/WorkoutsListContainer'

const AddWorkoutModal = ({
  isOpen,
  onClose,
  createWorkoutStatus,
  createWorkout,
  cleanCreateActionStore,
  onWorkoutChoose,
}) => {
  const tabs = ['Your workouts', 'Create new']
  const [selectedTabIndex, setSelectedTabIndex] = useState(0)

  useEffect(() => {
    if (!isOpen) return

    switch (createWorkoutStatus) {
      case ACTION_TYPE.FAILED:
        toaster.danger('Impossible to create the workout')
        cleanCreateActionStore()
        break
      case ACTION_TYPE.SUCCESS:
        toaster.success('Workout successfully created')
        cleanCreateActionStore()
        onClose()
        break
      default:
        return
    }
  }, [cleanCreateActionStore, createWorkoutStatus, isOpen, onClose])

  const onWorkoutSubmitted = (data) => {
    createWorkout(data, (newWorkoutId) => {
      onWorkoutChoose(newWorkoutId)
      onClose()
    })
  }

  const onWorkoutSelected = (workoutId) => {
    onWorkoutChoose(workoutId)
    onClose()
  }

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
          display={index === selectedTabIndex ? 'block' : 'none'}
        >
          {index === 0 && (
            <Pane>
              <Text marginBottom={10}>Select the workout you want to add:</Text>
              <WorkoutsListContainer onWorkoutClicked={onWorkoutSelected} />
            </Pane>
          )}
          {index === 1 && (
            <WorkoutForm
              onSubmit={onWorkoutSubmitted}
              isLoading={createWorkoutStatus === ACTION_TYPE.LOADING}
            />
          )}
        </Pane>
      ))}
    </Dialog>
  )
}

AddWorkoutModal.propTypes = {
  createWorkoutStatus: PropTypes.string,
}

const mapStateToProps = (state) => ({
  createWorkoutStatus: state.workout.actions.create.status,
})

const mapDispatchToProps = (dispatch) => ({
  createWorkout: (data, callback) => dispatch(createWorkout(data, callback)),
  cleanCreateActionStore: () => dispatch(cleanCreate()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddWorkoutModal)
