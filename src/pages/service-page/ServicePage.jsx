import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import Layout from "../../components/ui/layout/main-page-layout/MainPageLayout";
import Header from "../../components/ui/layout/header/Header";
import Button from "../../components/ui/button/Button";

class ServicePage extends React.Component {
  render() {
    if (!this.props.isAutoLoginLoading && !this.props.authUser) {
      return <Redirect to="/login" />;
    }

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

const mapStateToProps = state => ({
  isAutoLoginLoading: state.auth.actions.auto_login.loading,
  authUser: state.auth.authUser
});

export default connect(mapStateToProps)(ServicePage);
