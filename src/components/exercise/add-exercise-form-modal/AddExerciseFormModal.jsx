import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ExerciseForm from "../exercise-form/ExerciseForm";
import SideModal from "../../ui/modal/SideModal";
import Title from "../../ui/typography/Title";
import toaster from "../../ui/toaster/toaster";
import { create as createExercise } from "../../../store/modules/exercise/actions";

class AddExerciseFormModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
  };

  state = {};

  static getDerivedStateFromProps(props, state) {
    const {
      isCreateExerciseError,
      isCreateExerciseLoading,
      isCreateExerciseSuccess,
    } = props;

    if (!isCreateExerciseLoading && isCreateExerciseSuccess) {
      toaster.success("Exercise successfully created");
      // TODO: reset and close the form modal
    } else if (!isCreateExerciseLoading && isCreateExerciseError) {
      toaster.danger("Error when creating the exercise");
    }

    return state;
  }

  onExerciseSubmitted = (data) => {
    const { createExercise } = this.props;

    createExercise(data);
  };

  render() {
    const { isOpen, onToggle } = this.props;

    return (
      <SideModal isShown={isOpen} onCloseComplete={onToggle}>
        <Title>Add an exercise</Title>
        <ExerciseForm onSubmit={this.onExerciseSubmitted} />
      </SideModal>
    );
  }
}

const mapStateToProps = (state) => ({
  isCreateExerciseLoading: state.exercise.actions.create.loading,
  isCreateExerciseSuccess: state.exercise.actions.create.success,
  isCreateExerciseError: state.exercise.actions.create.error,
});

const mapDispatchToProps = (dispatch) => ({
  createExercise: (data) => dispatch(createExercise(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddExerciseFormModal);
