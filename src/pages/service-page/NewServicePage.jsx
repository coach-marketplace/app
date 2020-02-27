import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import Layout from "../../components/ui/layout/main-page-layout/MainPageLayout";
import Header from "../../components/ui/layout/header/Header";
import ServiceForm from "../../components/service/service-form/ServiceForm";
import Button from "../../components/ui/button/Button";

class NewServicePage extends React.Component {
  render() {
    return (
      <Layout
        header={<Header />}
        main={
          <Fragment>
            <Link to="/services">
              <Button label="Back" />
            </Link>
            <ServiceForm />
          </Fragment>
        }
      />
    );
  }
}

export default NewServicePage;
