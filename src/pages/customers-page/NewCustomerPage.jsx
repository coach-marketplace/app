import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import Layout from "../../components/layout/main-page-layout/MainPageLayout";
import Header from "../../components/layout/header/Header";
import AddCustomerForm from "../../components/customer/add-customer-form/AddCustomerForm";

class NewCustomersPage extends React.Component {
  render() {
    if (!this.props.isAutoLoginLoading && !this.props.authUser) {
      return <Redirect to="/login" />;
    }

    return <Layout header={<Header />} main={<AddCustomerForm />} />;
  }
}

const mapStateToProps = (state) => ({
  isAutoLoginLoading: state.auth.actions.auto_login.loading,
  authUser: state.auth.authUser,
});

export default connect(mapStateToProps)(NewCustomersPage);
