import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import Layout from "../../components/layout/main-page-layout/MainPageLayout";
import Header from "../../components/layout/header/Header";
import ServiceSchedule from "../../components/service/service-schedule/ServiceSchedule";

class SchedulePage extends React.Component {
  render() {
    if (!this.props.isAutoLoginLoading && !this.props.authUser) {
      return <Redirect to="/login" />;
    }

    return (
      <Layout
        header={<Header />}
        main={
          <Fragment>
            <ServiceSchedule />
          </Fragment>
        }
      />
    );
  }
}

const mapStateToProps = (state) => ({
  isAutoLoginLoading: state.auth.actions.auto_login.loading,
  authUser: state.auth.authUser,
});

export default connect(mapStateToProps)(SchedulePage);
