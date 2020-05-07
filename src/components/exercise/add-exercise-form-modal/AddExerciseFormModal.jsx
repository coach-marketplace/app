import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ExerciseForm from "../exercise-form/ExerciseForm";
import SideModal from "../../ui/modal/SideModal";
import Title from "../../ui/typography/Title";
import toaster from "../../ui/toaster/toaster";
import {
  create as createExercise,
  cleanCreate,
} from "../../../store/modules/exercise/actions";
import { ACTION_TYPE } from "../../../helper/constants";

const AddExerciseFormModal = ({
  createExercise,
  createExerciseStatus,
  onToggle,
  isOpen,
  cleanCreateActionStore,
}) => {
  useEffect(() => {
    switch (createExerciseStatus) {
      case ACTION_TYPE.FAILED:
        toaster.danger("Error in creation, retry later");
        break;
      case ACTION_TYPE.SUCCESS:
        toaster.success("Exercise successfully created");
        cleanCreateActionStore();
        break;
      default:
        return;
    }
  });

  return (
    <SideModal isShown={isOpen} onCloseComplete={onToggle}>
      <Title>Add an exercise</Title>
      <ExerciseForm onSubmit={createExercise} />
    </SideModal>
  );
};

AddExerciseFormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  createExerciseStatus: state.exercise.actions.create.status,
});

const mapDispatchToProps = (dispatch) => ({
  createExercise: (data) => dispatch(createExercise(data)),
  cleanCreateActionStore: () => dispatch(cleanCreate()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddExerciseFormModal);
