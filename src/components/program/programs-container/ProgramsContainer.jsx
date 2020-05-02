import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ProgramCard from "../program-card/ProgramCard";
import AddProgramModal from "../add-program-modal/AddProgramModal";
import { Button, Pane } from "../../ui";
import { retrieveAll as retrieveAllPrograms } from "../../../store/modules/program/actions";

const ProgramsContainer = ({
  isFetchProgramsLoading,
  isFetchProgramsSuccess,
  programs,
  fetchPrograms,
}) => {
  const [isAddProgramModalOpen, setIsAddProgramModalOpen] = useState(false);

  useEffect(() => {
    !isFetchProgramsLoading && !isFetchProgramsSuccess && fetchPrograms();
  }, [fetchPrograms, isFetchProgramsLoading, isFetchProgramsSuccess]);

  return (
    <>
      <AddProgramModal
        onToggle={() => setIsAddProgramModalOpen(!isAddProgramModalOpen)}
        isOpen={isAddProgramModalOpen}
      />

      <Button
        label="New"
        iconBefore="plus"
        appearance="minimal"
        onClick={() => setIsAddProgramModalOpen(true)}
      />

      <Pane>
        {programs.map((program) => (
          <ProgramCard key={program._id} program={program} />
        ))}
      </Pane>
    </>
  );
};

ProgramsContainer.propTypes = {
  onAdProgramClicked: PropTypes.func,
};

ProgramsContainer.defaultProps = {};

const mapStateToProps = (state) => ({
  programs: state.program.list,
  isFetchProgramsLoading: state.program.actions.getAll.loading,
  isFetchProgramsSuccess: state.program.actions.getAll.success,
  isFetchProgramsError: state.program.actions.getAll.error,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPrograms: () => dispatch(retrieveAllPrograms()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProgramsContainer);
