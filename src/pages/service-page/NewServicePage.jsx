import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import Layout from "../../components/ui/layout/main-page-layout/MainPageLayout";
import Header from "../../components/ui/layout/header/Header";
import ServiceForm from "../../components/service/service-form/ServiceForm";
import Button from "../../components/ui/button/Button";

class NewServicePage extends React.Component {
  render() {
    if (!this.props.isAutoLoginLoading && !this.props.authUser) {
      return <Redirect to="/login" />;
    }

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

const mapStateToProps = state => ({
  isAutoLoginLoading: state.auth.actions.auto_login.loading,
  authUser: state.auth.authUser
});

export default connect(mapStateToProps)(NewServicePage);
