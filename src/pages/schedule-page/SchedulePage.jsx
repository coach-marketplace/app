import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import Layout from "../../components/ui/layout/main-page-layout/MainPageLayout";
import Header from "../../components/ui/layout/header/Header";
import ServiceSchedule from "../../components/service/service-schedule/ServiceSchedule";
// import Button from "../../components/ui/button/Button";

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

const mapStateToProps = state => ({
  isAutoLoginLoading: state.auth.actions.auto_login.loading,
  authUser: state.auth.authUser
});

export default connect(mapStateToProps)(SchedulePage);
