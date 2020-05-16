import React, { useEffect } from "react";
import { connect } from "react-redux";

import Layout from "../../components/layout/main-page-layout/MainPageLayout";
import Header from "../../components/layout/header/Header";
import ProgramContainer from "../../components/program/program-container/ProgramContainer";
import {
  retrieveOne as retrieveProgram,
  cleanGetOne as cleanGetProgram,
  cleanUpdate as cleanUpdateProgram,
} from "../../store/modules/program/actions";
import { ACTION_TYPE } from "../../helper/constants";
import { Spinner, toaster } from "../../components/ui";

const EditProgramPage = React.memo(
  ({
    match,
    getProgram,
    fetchProgramStatus,
    fetchProgram,
    updateProgramStatus,
    history,
    cleanFetchProgramActionStore,
  }) => {
    const programId = match.params.id;

    useEffect(() => {
      !getProgram(programId) && fetchProgram(programId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      if (updateProgramStatus === ACTION_TYPE.SUCCESS) {
        toaster.success("Program successfully updated");
        // history.push("/library/programs");
        cleanUpdateProgram();
      }
    }, [history, updateProgramStatus]);

    useEffect(() => {
      if (fetchProgramStatus === ACTION_TYPE.FAILED) {
        toaster.danger("Program not found");
        history.push("/library/programs");
        cleanFetchProgramActionStore();
      }
    }, [history, fetchProgramStatus, cleanFetchProgramActionStore]);

    const program = getProgram(programId);

    return (
      <Layout
        header={<Header />}
        main={!program ? <Spinner /> : <ProgramContainer program={program} />}
        isMainFull
      />
    );
  }
);

const mapStateToProps = (state) => ({
  getProgram: (id) => state.program.list.find((p) => p._id === id),
  fetchProgramStatus: state.program.actions.getOne.status,
  updateProgramStatus: state.program.actions.update.status,
});

const mapDispatchToProps = (dispatch) => ({
  fetchProgram: (programId) => dispatch(retrieveProgram(programId)),
  cleanFetchProgramActionStore: () => dispatch(cleanGetProgram()),
  cleanUpdateProgramActionStore: () => dispatch(cleanUpdateProgram()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProgramPage);
