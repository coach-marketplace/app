import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import Layout from "../../components/layout/main-page-layout/MainPageLayout";
import Header from "../../components/layout/header/Header";
import ProgramContainer from "../../components/program/program-container/ProgramContainer";
import {
  retrieveOne as retrieveProgram,
  cleanGetOne as cleanGetProgram,
} from "../../store/modules/program/actions";
import { ACTION_TYPE } from "../../helper/constants";
import { Spinner } from "../../components/ui";

class EditProgramPage extends PureComponent {
  constructor(props) {
    super(props);

    // console.log("prop", props);
    const programId = props.match.params.id;
    // console.log("programId", programId);

    // console.log("++", props.getProgram(programId));
    const isProgramFetched = !!props.getProgram(programId);
    // console.log("isProgramFetched", isProgramFetched, props.fetchProgram);
    !isProgramFetched && props.fetchProgram(programId);

    this.state = {
      isProgramFetched,
      programId,
    };
  }

  renderContent = () => {
    const { fetchProgramStatus, getProgram } = this.props;
    const { programId } = this.state;

    if (fetchProgramStatus === ACTION_TYPE.LOADING) {
      return <Spinner />;
    }

    return <ProgramContainer program={getProgram(programId)} />;
  };

  render() {
    const { fetchProgramStatus } = this.props;

    if (fetchProgramStatus === ACTION_TYPE.FAILED) {
      return <Redirect to="/library/programs" />;
    }

    return (
      <Layout header={<Header />} main={this.renderContent()} isMainFull />
    );
  }
}

const mapStateToProps = (state) => ({
  getProgram: (id) => state.program.list.find((p) => p._id === id),
  fetchProgramStatus: state.program.actions.getOne.status,
});

const mapDispatchToProps = (dispatch) => ({
  fetchProgram: (programId) => dispatch(retrieveProgram(programId)),
  cleanFetchProgramActionStore: () => dispatch(cleanGetProgram()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProgramPage);
