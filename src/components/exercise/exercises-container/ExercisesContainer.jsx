import React, { Component } from "react";
import { connect } from "react-redux";

import ExerciseCard from "../exercise-card/ExerciseCard";
import AddExerciseFormModal from "../add-exercise-form-modal/AddExerciseFormModal";
import Button from "../../ui/button/Button";
import {
  retrieveAll as retrieveAllExercises,
  create as createExercise,
} from "../../../store/modules/exercise/actions";

class ExercisesContainer extends Component {
  state = { isAddExerciseModalOpen: false };

  componentDidMount() {
    const { exercises, getExercises } = this.props;

    !exercises.length && getExercises();
  }

  toggleAddExerciseModal = () => {
    const { isAddExerciseModalOpen } = this.state;

    this.setState({ isAddExerciseModalOpen: !isAddExerciseModalOpen });
  };

  render() {
    const { exercises, isCreateExerciseLoading } = this.props;
    const { isAddExerciseModalOpen } = this.state;

    return (
      <div>
        <AddExerciseFormModal
          onToggle={this.toggleAddExerciseModal}
          isOpen={isAddExerciseModalOpen}
          isLoading={isCreateExerciseLoading}
        />

        <Button
          label="New"
          iconBefore="plus"
          appearance="minimal"
          onClick={this.toggleAddExerciseModal}
        />

        <div>
          {exercises.map((exercise) => (
            <ExerciseCard key={exercise._id} title={exercise.content[0].name} />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  exercises: state.exercise.list,
  isCreateExerciseLoading: state.exercise.actions.create.loading,
  isCreateExerciseSuccess: state.exercise.actions.create.success,
  isCreateExerciseError: state.exercise.actions.create.error,
});

const mapDispatchToProps = (dispatch) => ({
  createExercise: (data) => dispatch(createExercise(data)),
  getExercises: () => dispatch(retrieveAllExercises()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExercisesContainer);
