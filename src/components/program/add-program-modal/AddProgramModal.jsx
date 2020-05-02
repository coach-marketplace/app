import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ProgramForm from "../program-form/ProgramForm";
import { SideModal, Title, toaster } from "../../ui";
import { create as createProgram } from "../../../store/modules/program/actions";

const AddProgramModal = ({
  isOpen,
  onToggle,
  createProgram,
  isCreateProgramLoading,
  isCreateProgramSuccess,
  isCreateProgramError,
}) => {
  useEffect(() => {
    if (!isCreateProgramLoading && isCreateProgramSuccess) {
      toaster.success("Program successfully created");
    } else if (!isCreateProgramLoading && isCreateProgramError) {
      toaster.danger("Impossible to create the program");
    }
  });

  const onProgramSubmitted = (data) => {
    createProgram(data);
  };

  return (
    <SideModal isShown={isOpen} onCloseComplete={onToggle}>
      <Title>Create a program</Title>
      <ProgramForm
        onSubmit={onProgramSubmitted}
        isLoading={isCreateProgramLoading}
      />
    </SideModal>
  );
};

AddProgramModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isCreateProgramLoading: state.program.actions.create.loading,
  isCreateProgramSuccess: state.program.actions.create.success,
  isCreateProgramError: state.program.actions.create.error,
});

const mapDispatchToProps = (dispatch) => ({
  createProgram: (data) => dispatch(createProgram(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddProgramModal);
