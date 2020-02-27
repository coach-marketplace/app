import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import Layout from "../../components/ui/layout/main-page-layout/MainPageLayout";
import Header from "../../components/ui/layout/header/Header";
import Button from "../../components/ui/button/Button";

class ServicePage extends React.Component {
  render() {
    return (
      <Layout
        header={<Header />}
        main={
          <Fragment>
            <Link to="/services/new">
              <Button label="New" />
            </Link>
          </Fragment>
        }
      />
    );
  }
}

export default ServicePage;
