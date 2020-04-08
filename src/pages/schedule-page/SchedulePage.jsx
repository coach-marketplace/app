import React, { Fragment } from "react";

import Layout from "../../components/layout/main-page-layout/MainPageLayout";
import Header from "../../components/layout/header/Header";
import ServiceSchedule from "../../components/service/service-schedule/ServiceSchedule";

class SchedulePage extends React.Component {
  render() {
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

export default SchedulePage;
